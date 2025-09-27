"use server";

import { revalidatePath } from "next/cache";

// Types based on Twenty CRM schema
interface CompanyData {
  name: string;
  annualRecurringRevenue?: {
    amountMicros: number;
    currencyCode: string;
  };
  employees?: number;
  companySize?: "OPT0_1" | "OPT2_10" | "OPT11_50" | "OPT51_200" | "OPT201_500" | "OPT501_1000" | "OPT1001_5000" | "OPT5001_10000" | "OPT10001" | "NA";
  founded?: string;
  industry?: string;
  description?: string;
  domainName?: string;
  createdBy?: string;
  accountOwnerId?: string;
  idealCustomerProfile?: boolean;
  tagline?: string;
}

interface PersonData {
  name: {
    firstName: string;
    lastName: string;
  };
  companyId: string;
  emails?: {
    primaryEmail: string;
    additionalEmails: any[];
  };
  phones?: {
    primaryPhoneNumber: string;
    primaryPhoneCountryCode: string;
    primaryPhoneCallingCode: string;
    additionalPhones: any[];
  };
  jobTitle?: string;
  createdBy?: string;
  city?: string;
  position?: number;
  avatarUrl?: string;
  linkedinLink?: {
    primaryLinkUrl: string;
    primaryLinkLabel: string;
    secondaryLinks: any[];
  };
  xLink?: {
    primaryLinkUrl: string;
    primaryLinkLabel: string;
    secondaryLinks: any[];
  };
}

interface OpportunityData {
  name: string;
  companyId: string;
  pointOfContactId?: string;
  amount?: {
    amountMicros: number;
    currencyCode: string;
  };
  stage?: "NEW" | "SCREENING" | "MEETING" | "PROPOSAL" | "CUSTOMER";
  closeDate?: string;
  createdBy?: string;
  position?: number;
}

interface NoteData {
  title: string;
  bodyV2: string;
  createdBy?: string;
  position?: number;
}

interface FormData {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessType: string;
  revenue: string;
  yearFounded?: string;
  employees?: string;
  reason?: string;
  timeline?: string;
  additionalInfo?: string;
}

// Environment variables validation
const TWENTY_API_URL = process.env.TWENTY_API_URL;
const TWENTY_API_TOKEN = process.env.TWENTY_API_TOKEN;
const GERARDO_OWNER_ID = "6e1aa864-ac62-43cb-8755-76f84d2c66e2"; // Valid workspace member ID

if (!TWENTY_API_URL || !TWENTY_API_TOKEN) {
  console.warn("Twenty CRM environment variables not configured");
}

// Helper function to map revenue range to number
function mapRevenueToMicros(revenue: string): number {
  const revenueMap: Record<string, number> = {
    "under-100k": 50000 * 1000000, // 50k average in micros
    "100k-500k": 300000 * 1000000, // 300k average
    "500k-1m": 750000 * 1000000, // 750k average
    "1m-5m": 3000000 * 1000000, // 3M average
    "5m-10m": 7500000 * 1000000, // 7.5M average
    "over-10m": 15000000 * 1000000, // 15M estimate
  };
  return revenueMap[revenue] || 0;
}

// Helper function to map business type to industry
function mapBusinessTypeToIndustry(businessType: string): string {
  const industryMap: Record<string, string> = {
    saas: "Software",
    "mobile-app": "Mobile Technology",
    "web-app": "Web Technology",
    ecommerce: "E-commerce",
    fintech: "Financial Technology",
    healthtech: "Healthcare Technology",
    edtech: "Education Technology",
    "ai-ml": "Artificial Intelligence",
    "developer-tools": "Developer Tools",
    other: "Technology",
  };
  return industryMap[businessType] || "Technology";
}

// Helper function to map timeline to close date
function mapTimelineToCloseDate(timeline: string): string {
  const now = new Date();
  const closeDateMap: Record<string, number> = {
    immediate: 30, // 30 days
    "3-months": 90,
    "6-months": 180,
    "1-year": 365,
    exploring: 180, // Default to 6 months for exploratory
  };

  const daysToAdd = closeDateMap[timeline] || 90;
  const closeDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return closeDate.toISOString().split("T")[0]; // Return YYYY-MM-DD format
}

// API call helper
async function callTwentyAPI(
  endpoint: string,
  method: "GET" | "POST" | "PATCH",
  data?: any
) {
  if (!TWENTY_API_URL || !TWENTY_API_TOKEN) {
    throw new Error("Twenty CRM not configured");
  }

  const url = `${TWENTY_API_URL}/rest/${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${TWENTY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twenty CRM API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function submitMAForm(formData: FormData) {
  try {
    console.log("Processing M&A form submission:", {
      companyName: formData.companyName,
    });

    // First, check if company already exists
    let company;
    let existingCompanies;
    try {
      existingCompanies = await callTwentyAPI(
        `companies?filter=name[eq]:"${encodeURIComponent(formData.companyName)}"`,
        "GET"
      );

      if (existingCompanies.data && existingCompanies.data.length > 0) {
        company = existingCompanies.data[0];
        console.log("Found existing company:", {
          id: company.id,
          name: company.name,
        });
      }
    } catch (searchError) {
      console.log(
        "Could not search for existing company, proceeding with creation"
      );
    }

    // Create company only if it doesn't exist
    if (!company) {
      // Prepare company data
      const companyData: CompanyData = {
        name: formData.companyName,
        industry: mapBusinessTypeToIndustry(formData.businessType),
        description:
          formData.additionalInfo ||
          `${formData.businessType} business founded by ${formData.firstName} ${formData.lastName}`,
        createdBy: GERARDO_OWNER_ID,
        accountOwnerId: GERARDO_OWNER_ID, // Set account owner
        idealCustomerProfile: true, // Mark as ICP since they're interested in selling
        tagline: `${mapBusinessTypeToIndustry(formData.businessType)} company`, // Generate basic tagline
      };

      // Add revenue if provided
      if (formData.revenue) {
        const revenueAmount = mapRevenueToMicros(formData.revenue);
        if (revenueAmount > 0) {
          companyData.annualRecurringRevenue = {
            amountMicros: revenueAmount,
            currencyCode: "USD",
          };
        }
      }

      // Add company size if provided (using Twenty CRM enum values directly)
      if (formData.employees) {
        const employeeCountMap: Record<NonNullable<CompanyData["companySize"]>, number> = {
          "OPT0_1": 1,
          "OPT2_10": 6,      // Average of 2-10
          "OPT11_50": 30,    // Average of 11-50
          "OPT51_200": 125,  // Average of 51-200
          "OPT201_500": 350, // Average of 201-500
          "OPT501_1000": 750,    // Average of 501-1000
          "OPT1001_5000": 3000,  // Average of 1001-5000
          "OPT5001_10000": 7500, // Average of 5001-10000
          "OPT10001": 15000,     // Estimated for 10001+
          "NA": 1,
        };

        const selectedSize = formData.employees as CompanyData["companySize"];
        // Use the enum value directly as companySize
        if (selectedSize && selectedSize in employeeCountMap) {
          companyData.companySize = selectedSize;
          companyData.employees = employeeCountMap[selectedSize];
        }
      }

      // Add founded year if provided (convert to date format)
      if (formData.yearFounded) {
        companyData.founded = `${formData.yearFounded}-01-01`;
      }

      // Create company in Twenty CRM
      console.log("Creating company in Twenty CRM with data:", companyData);
      const companyResponse = await callTwentyAPI("companies", "POST", companyData);
      console.log("Raw company response:", companyResponse);

      // Handle GraphQL mutation response structure
      company = companyResponse.data?.createCompany || companyResponse.data || companyResponse;
      console.log("Company created:", { id: company?.id, name: company?.name });

      // Validate company creation
      if (!company?.id) {
        throw new Error("Failed to create company - no ID returned from API");
      }
    }

    // Check for existing person first
    let person;
    let existingPeople;
    try {
      console.log("Searching for existing person...");
      existingPeople = await callTwentyAPI(
        `people?filter=companyId[eq]:"${company.id}",name.firstName[eq]:"${encodeURIComponent(formData.firstName)}",name.lastName[eq]:"${encodeURIComponent(formData.lastName)}"`,
        "GET"
      );

      if (existingPeople.data && existingPeople.data.length > 0) {
        person = existingPeople.data[0];
        console.log("Found existing person:", {
          id: person.id,
          name: person.name,
        });
      }
    } catch (searchError) {
      console.log(
        "Could not search for existing person, proceeding with creation"
      );
    }

    // Create person (contact) for the company only if doesn't exist
    if (!person) {
      console.log("Creating contact person...");
      const personData: PersonData = {
        name: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        companyId: company.id,
        jobTitle: "Founder", // Default title, could be made dynamic
        createdBy: GERARDO_OWNER_ID,
        position: 0, // Set default position for sorting
      };

      // Add email if provided
      if (formData.email) {
        personData.emails = {
          primaryEmail: formData.email,
          additionalEmails: [],
        };
      }

      // Add phone if provided
      if (formData.phone) {
        // Parse the phone number - assume US format for now
        let phoneNumber = formData.phone.replace(/\D/g, ''); // Remove non-digits

        // If phone starts with 1, it includes country code
        if (phoneNumber.startsWith('1') && phoneNumber.length === 11) {
          phoneNumber = phoneNumber.substring(1); // Remove the '1' prefix
        }

        personData.phones = {
          primaryPhoneNumber: phoneNumber,
          primaryPhoneCountryCode: "US", // Country code (ISO 3166-1 alpha-2)
          primaryPhoneCallingCode: "1", // Calling code without +
          additionalPhones: [],
        };
      }

      console.log("Creating person with data:", personData);
      const personResponse = await callTwentyAPI("people", "POST", personData);
      console.log("Raw person response:", personResponse);

      person = personResponse.data?.createPerson || personResponse.data || personResponse;
      console.log("Person created:", { id: person?.id, name: person?.name });

      // Validate person creation
      if (!person?.id) {
        console.warn("Failed to create person - continuing without contact");
      }
    }

    // Validate company has ID before proceeding
    if (!company?.id) {
      throw new Error("Company ID is missing - cannot proceed with opportunity creation");
    }

    // Check for existing M&A opportunities for this company
    let existingOpportunity;
    try {
      console.log("Searching for existing opportunities for company ID:", company.id);
      const existingOpportunities = await callTwentyAPI(
        `opportunities?filter=companyId[eq]:"${company.id}",name[ilike]:"%M&A%"`,
        "GET"
      );
      console.log("Existing opportunities search result:", existingOpportunities);

      if (existingOpportunities.data && existingOpportunities.data.length > 0) {
        existingOpportunity = existingOpportunities.data[0];
        console.log("Found existing M&A opportunity:", {
          id: existingOpportunity.id,
          name: existingOpportunity.name,
          stage: existingOpportunity.stage,
        });
      }
    } catch (searchError) {
      console.log(
        "Could not search for existing opportunities, proceeding with creation"
      );
    }

    let opportunity;

    if (existingOpportunity) {
      // Update existing opportunity with new information
      const updateData: Partial<OpportunityData> = {
        stage: "SCREENING", // Refresh stage in case it was closed
      };

      // Add timeline-based close date if provided
      if (formData.timeline) {
        updateData.closeDate = mapTimelineToCloseDate(formData.timeline);
      }

      console.log("Updating existing M&A opportunity with data:", updateData);
      const updateResponse = await callTwentyAPI(
        `opportunities/${existingOpportunity.id}`,
        "PATCH",
        updateData
      );
      console.log("Raw opportunity update response:", updateResponse);

      // Handle GraphQL mutation response structure
      opportunity = updateResponse.data?.updateOpportunity || updateResponse.data || updateResponse;
      console.log("Opportunity updated:", {
        id: opportunity?.id,
        name: opportunity?.name,
      });
    } else {
      // Prepare new opportunity data
      const opportunityData: OpportunityData = {
        name: `M&A Opportunity - ${formData.companyName}`,
        companyId: company.id,
        stage: "SCREENING", // Default stage
        createdBy: GERARDO_OWNER_ID,
        position: 0, // Set default position for sorting
      };

      // Add point of contact if person was created
      if (person?.id) {
        opportunityData.pointOfContactId = person.id;
      }

      // Add estimated deal value (could be based on revenue multiples)
      if (formData.revenue) {
        const revenueAmount = mapRevenueToMicros(formData.revenue);
        if (revenueAmount > 0) {
          // Estimate deal value at 3x revenue multiple
          opportunityData.amount = {
            amountMicros: revenueAmount * 3,
            currencyCode: "USD",
          };
        }
      }

      // Add close date based on timeline
      if (formData.timeline) {
        opportunityData.closeDate = mapTimelineToCloseDate(formData.timeline);
      }

      // Create opportunity in Twenty CRM
      console.log("Creating opportunity in Twenty CRM with data:", opportunityData);
      const opportunityResponse = await callTwentyAPI(
        "opportunities",
        "POST",
        opportunityData
      );
      console.log("Raw opportunity response:", opportunityResponse);

      // Handle GraphQL mutation response structure
      opportunity = opportunityResponse.data?.createOpportunity || opportunityResponse.data || opportunityResponse;
      console.log("Opportunity created:", {
        id: opportunity?.id,
        name: opportunity?.name,
      });
    }

    // Create comprehensive note with all form details
    if (opportunity?.id) {
      console.log("Creating comprehensive note with form details...");

      // Build comprehensive note content
      const noteContent = `
# M&A Inquiry Details

## Company Information
- **Company Name**: ${formData.companyName}
- **Business Type**: ${formData.businessType}
- **Annual Revenue**: ${formData.revenue}
- **Year Founded**: ${formData.yearFounded || 'Not specified'}
- **Number of Employees**: ${formData.employees || 'Not specified'}

## Contact Information
- **Founder/Contact**: ${formData.firstName} ${formData.lastName}
- **Email**: ${formData.email}
- **Phone**: ${formData.phone || 'Not provided'}

## M&A Details
- **Reason for Selling**: ${formData.reason || 'Not specified'}
- **Ideal Timeline**: ${formData.timeline || 'Not specified'}

## Additional Information
${formData.additionalInfo || 'No additional information provided'}

---
*Form submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}*
      `.trim();

      const noteData: NoteData = {
        title: `M&A Form Submission - ${formData.companyName}`,
        bodyV2: noteContent,
        createdBy: GERARDO_OWNER_ID,
        position: 0, // Set default position for sorting
      };

      try {
        console.log("Creating note with data:", noteData);
        const noteResponse = await callTwentyAPI("notes", "POST", noteData);
        console.log("Raw note response:", noteResponse);

        const note = noteResponse.data?.createNote || noteResponse.data || noteResponse;
        console.log("Note created:", { id: note?.id, title: note?.title });
      } catch (noteError) {
        console.warn("Failed to create note:", noteError);
        // Don't throw error for note creation failure
      }
    }

    // Revalidate the page to show success state
    revalidatePath("/ma");

    // Log final IDs for debugging
    console.log("Final response data:", {
      companyId: company?.id,
      personId: person?.id,
      opportunityId: opportunity?.id,
      isExistingCompany: existingCompanies?.data?.length > 0,
      isExistingOpportunity: !!existingOpportunity,
    });

    return {
      success: true,
      message: existingOpportunity
        ? "Thank you! We've updated your existing opportunity and will be in touch within 24 hours."
        : "Thank you! We'll be in touch within 24 hours to discuss your business.",
      companyId: company?.id,
      opportunityId: opportunity?.id,
      isExistingCompany: existingCompanies?.data?.length > 0,
      isExistingOpportunity: !!existingOpportunity,
    };
  } catch (error) {
    console.error("Error submitting M&A form:", error);

    // Return user-friendly error message
    return {
      success: false,
      message: "Something went wrong. Please try again or contact us directly.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
