"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FaBuildingColumns,
  FaRocket,
  FaShieldHalved,
  FaLightbulb,
  FaHandshake,
  FaChartLine,
  FaCode,
  FaMobile,
  FaCloud,
  FaCircleCheck,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";
import { Faq } from "@/components/faq";
import SecureEmail from "@/components/SecureEmail";
import { FaCheckCircle } from "react-icons/fa";
import MANavbar from "@/components/ma-navbar";
import { submitMAForm } from "@/lib/actions/ma-form";
import PhoneInput from "@/components/phone-input";

// Lead Capture Form Component
function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessType: "",
    revenue: "",
    yearFounded: "",
    employees: "",
    reason: "",
    timeline: "",
    additionalInfo: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Validate business email
    const personalEmailDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
      'live.com',
      'msn.com',
      'ymail.com',
      'protonmail.com',
      'mail.com'
    ];

    const emailDomain = formData.email.toLowerCase().split('@')[1];
    if (personalEmailDomains.includes(emailDomain)) {
      setStatus("error");
      setMessage("Please use a business or corporate email address. Personal email addresses (Gmail, Yahoo, Hotmail, Outlook, etc.) are not accepted.");
      return;
    }

    try {
      // Submit to Twenty CRM via server action
      const result = await submitMAForm(formData);

      if (result.success) {
        setStatus("success");
        setMessage(result.message);

        // Reset form on success
        setFormData({
          companyName: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          businessType: "",
          revenue: "",
          yearFounded: "",
          employees: "",
          reason: "",
          timeline: "",
          additionalInfo: "",
        });
      } else {
        setStatus("error");
        setMessage(result.message);
        console.error("Form submission error:", result.error);
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        "Something went wrong. Please try again or contact us directly."
      );
      console.error("Form submission error:", error);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <FaCircleCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Thank You!
        </h3>
        <p className="text-green-700">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Company Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Company Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label
              htmlFor="businessType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Type *
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select business type
              </option>
              <option value="saas">SaaS Platform</option>
              <option value="mobile-app">Mobile App</option>
              <option value="web-app">Web Application</option>
              <option value="ecommerce">E-commerce</option>
              <option value="fintech">FinTech</option>
              <option value="healthtech">HealthTech</option>
              <option value="edtech">EdTech</option>
              <option value="ai-ml">AI/ML Company</option>
              <option value="developer-tools">Developer Tools</option>
              <option value="other">Other Tech Business</option>
            </select>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="First name"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number (US)
            </label>
            <PhoneInput
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(804) 372-7365"
            />
          </div>
        </div>
      </div>

      {/* Business Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Business Details
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="revenue"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Annual Revenue *
            </label>
            <select
              id="revenue"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select revenue range
              </option>
              <option value="under-100k">Under $100K</option>
              <option value="100k-500k">$100K - $500K</option>
              <option value="500k-1m">$500K - $1M</option>
              <option value="1m-5m">$1M - $5M</option>
              <option value="5m-10m">$5M - $10M</option>
              <option value="over-10m">Over $10M</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="employees"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Number of Employees
            </label>
            <select
              id="employees"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select team size
              </option>
              <option value="OPT0_1">1 employee</option>
              <option value="OPT2_10">2-10 employees</option>
              <option value="OPT11_50">11-50 employees</option>
              <option value="OPT51_200">51-200 employees</option>
              <option value="OPT201_500">201-500 employees</option>
              <option value="OPT501_1000">501-1000 employees</option>
              <option value="OPT1001_5000">1001-5000 employees</option>
              <option value="OPT5001_10000">5001-10000 employees</option>
              <option value="OPT10001">10001+ employees</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="yearFounded"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Year Founded
            </label>
            <input
              type="number"
              id="yearFounded"
              name="yearFounded"
              value={formData.yearFounded}
              onChange={handleChange}
              min="1600"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2020"
            />
          </div>
        </div>
      </div>

      {/* M&A Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Acquisition Interest
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Why are you considering selling?
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select primary reason
              </option>
              <option value="retirement">Ready to retire</option>
              <option value="new-venture">Starting new venture</option>
              <option value="growth-capital">Need growth capital</option>
              <option value="strategic-partner">Want strategic partner</option>
              <option value="market-timing">Good market timing</option>
              <option value="burnout">Founder burnout</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="timeline"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ideal Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select timeline
              </option>
              <option value="immediate">Immediately</option>
              <option value="3-months">Within 3 months</option>
              <option value="6-months">Within 6 months</option>
              <option value="1-year">Within 1 year</option>
              <option value="exploring">Just exploring</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Additional Information
        </h3>
        <div>
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tell us more about your business
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Key metrics, unique advantages, growth trajectory, or anything else you'd like us to know..."
          />
        </div>
      </div>

      <div className="text-center">
        <Button
          type="submit"
          disabled={status === "loading"}
          size="lg"
          className="px-8 py-3 text-lg font-semibold"
        >
          {status === "loading" ? "Submitting..." : "Get Your Business Valued"}
        </Button>

        {status === "error" && <p className="text-red-600 mt-4">{message}</p>}

        <p className="text-sm text-gray-600 mt-4">
          Confidential consultation • No obligation • Fast response
        </p>
      </div>
    </form>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground pt-20 pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <FaBuildingColumns className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Tech M&A Specialists</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Sell Your Tech Business to
              <span className="text-accent"> Strategic Buyers</span>
            </h1>

            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              We acquire and operate profitable SaaS, mobile apps, and tech
              businesses. Get a confidential valuation and explore your exit
              options with experienced operators who understand your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="#valuation">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold !bg-white !text-gray-900 hover:!bg-gray-100 shadow-lg"
                >
                  Get Free Valuation
                  <FaRocket className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="#process">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold !border-2 !border-white !text-white !bg-transparent hover:!bg-white/10"
                >
                  How It Works
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center">
                <FaCircleCheck className="w-4 h-4 text-green-400 mr-2" />
                <span>Confidential Process</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span>30-Day Close Possible</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span>No Broker Fees</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
              <h3 className="text-2xl font-bold mb-4">
                We&apos;re Looking For:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaCode className="w-5 h-5 text-accent mr-3" />
                  <span>SaaS platforms with recurring revenue</span>
                </li>
                <li className="flex items-center">
                  <FaMobile className="w-5 h-5 text-accent mr-3" />
                  <span>Mobile apps with strong user base</span>
                </li>
                <li className="flex items-center">
                  <FaCloud className="w-5 h-5 text-accent mr-3" />
                  <span>Cloud-based solutions & APIs</span>
                </li>
                <li className="flex items-center">
                  <FaChartLine className="w-5 h-5 text-accent mr-3" />
                  <span>$100K+ annual revenue</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: <FaShieldHalved className="w-8 h-8" />,
      title: "Strategic Acquisition",
      description:
        "We buy tech businesses to operate and grow them long-term, not flip them. Your legacy continues with experienced operators.",
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Business Valuation",
      description:
        "Get a comprehensive valuation based on revenue multiples, growth metrics, and market positioning from industry experts.",
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "Smooth Transition",
      description:
        "Structured handover process ensures business continuity, team retention, and customer satisfaction throughout the transition.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4">
            Why Choose Our Acquisition Approach
          </h2>
          <p className="text-lg lg:text-xl text-secondary-foreground/70 max-w-3xl mx-auto">
            Unlike traditional buyers, we&apos;re operators who understand the
            technical and business challenges you&apos;ve overcome.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description:
        "Confidential discussion about your business, goals, and timeline. We'll provide an initial valuation range.",
    },
    {
      number: "02",
      title: "Due Diligence",
      description:
        "Technical and financial review of your business. We move quickly while being thorough.",
    },
    {
      number: "03",
      title: "Term Sheet",
      description:
        "Fair offer based on revenue multiples and growth potential. Transparent pricing with no hidden fees.",
    },
    {
      number: "04",
      title: "Closing & Transition",
      description:
        "Legal documentation and structured handover. We ensure smooth transition for you and your team.",
    },
  ];

  return (
    <section id="process" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Acquisition Process
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            From initial conversation to closing, we&apos;ve streamlined the
            process to be efficient and founder-friendly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-foreground mb-6">
            <strong>Timeline:</strong> 30-90 days from initial conversation to
            closing
          </p>
          <Link href="#valuation">
            <Button size="lg" className="px-8 py-3 text-lg">
              Start the Process Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Valuation Section with Lead Form
function ValuationSection() {
  return (
    <section id="valuation" className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4">
            Get Your Business Valued
          </h2>
          <p className="text-lg lg:text-xl text-secondary-foreground/70 max-w-3xl mx-auto">
            Tell us about your tech business and we&apos;ll provide a
            confidential valuation within 48 hours.
          </p>
        </div>

        <div className="bg-background rounded-2xl shadow-xl p-8 lg:p-12">
          <LeadCaptureForm />
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FaqSection() {
  const faqItems = [
    {
      id: "faq-1",
      question: "What types of tech businesses do you acquire?",
      answer:
        "We focus on profitable SaaS platforms, mobile applications, web applications, and tech-enabled services with recurring revenue models. We're particularly interested in businesses with $100K+ annual revenue, strong user engagement, and growth potential.",
    },
    {
      id: "faq-2",
      question: "How do you determine valuation?",
      answer:
        "Valuations are based on revenue multiples (typically 2-6x annual revenue), profitability, growth rate, customer retention, market position, and technical architecture. We provide transparent valuations based on current market conditions and comparable transactions.",
    },
    {
      id: "faq-3",
      question: "Do you require seller financing?",
      answer:
        "We offer flexible payment plans tailored to each deal, including seller financing options. While we don't typically offer all-cash transactions, we work with you to structure a deal that works for both parties, including earnouts, consulting arrangements, or other creative financing solutions.",
    },
    {
      id: "faq-4",
      question: "What happens to my team after acquisition?",
      answer:
        "We typically retain key team members and often provide growth opportunities. We believe great teams are essential to business success and work to maintain company culture while providing new resources for growth.",
    },
    {
      id: "faq-5",
      question: "How long does the process take?",
      answer:
        "From initial conversation to closing typically takes 30-90 days, depending on business complexity and due diligence requirements. We move quickly while being thorough to ensure a smooth transaction.",
    },
    {
      id: "faq-6",
      question: "Do you sign NDAs?",
      answer:
        "Absolutely. All discussions are confidential and we're happy to sign mutual NDAs before any detailed business information is shared. Discretion is critical in M&A transactions.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <Faq heading="Frequently Asked Questions" items={faqItems} />
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
          Ready to Explore Your Options?
        </h2>
        <p className="text-lg lg:text-xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Get a confidential valuation and learn about your exit opportunities.
          No obligation, just honest advice from experienced operators.
        </p>

        <div className="flex flex-col items-center gap-8 mb-12">
          <Link href="#valuation">
            <Button
              size="lg"
              variant="secondary"
              className="px-10 py-5 text-xl font-semibold"
            >
              Get Business Valuation
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <a
              href="tel:+1(804)372-7365"
              className="flex flex-col items-center hover:text-primary-foreground/80 transition-colors"
            >
              <div className="flex items-center mb-1">
                <FaPhone className="w-5 h-5 mr-2" />
                <span className="text-2xl font-semibold">80-GERARDO-5</span>
              </div>
              <span className="text-base text-primary-foreground/70">
                (804) 372-7365
              </span>
            </a>
            <div className="flex items-center text-lg hover:text-primary-foreground/80 transition-colors">
              <FaEnvelope className="w-5 h-5 mr-2" />
              <SecureEmail />
            </div>
          </div>
        </div>

        <p className="text-base text-primary-foreground/70">
          All communications are strictly confidential • Response within 24
          hours
        </p>
      </div>
    </section>
  );
}

// Main Page Component
export default function MAPage() {
  return (
    <div className="relative -mt-20">
      {/* -mt-20 cancels out the main layout's pt-20 */}
      <MANavbar />
      <div>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <ValuationSection />
        <FaqSection />
        <ContactSection />
      </div>
    </div>
  );
}
