"use client";

import React from "react";
import Image from "next/image";
import ImageCard from "@/components/imageCard";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";

export default function About() {
  const clients = [
    {
      name: "Athlete Constellation",
      logo: "/clients/athleteconstellation-square.jpg",
      alt: "Athlete Constellation Logo",
      website: "https://www.athleteconstellation.com/",
    },
    {
      name: "Brand Besties",
      logo: "/clients/brandbesties-square.webp",
      alt: "Brand Besties Logo",
      website: "https://brandbesties.com",
    },
    {
      name: "Gramercy",
      logo: "/clients/gramercy-square.jpg",
      alt: "Gramercy Logo",
      website: "https://mygramercycounseling.com/",
    },
    {
      name: "Jale",
      logo: "/clients/jale-square.webp",
      alt: "Jale Logo",
      website: "https://www.work4workers.com/",
    },
    {
      name: "Palm Venture Studios",
      logo: "/clients/palm-venture-studios-square.jpeg",
      alt: "Palm Venture Studios Logo",
      website: "https://palmventurestudios.com",
    },
    {
      name: "Swoovy",
      logo: "/clients/swoovy-square.jpeg",
      alt: "Swoovy Logo",
      website: "https://swoovy.com",
    },
    {
      name: "Tap",
      logo: "/clients/tap-square.svg",
      alt: "Tap Logo",
      website: "https://www.tapintegration.com/",
    },
  ];

  const addUtmParams = (url: string, clientName: string) => {
    const utmParams = new URLSearchParams({
      utm_source: "fctolabs.com",
      utm_medium: "referral",
      utm_campaign: "client-showcase",
      utm_content: clientName.toLowerCase().replace(/\s+/g, "-"),
    });

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${utmParams.toString()}`;
  };

  return (
    <div className="h-full">
      <ImageCard enableName />

      {/* Gerardo's Story */}
      <div className="container mx-auto px-4 py-12 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-10 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            From Hacker to Venture Operator
          </h2>

          <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              I learned to code in my bedroom during high school, fueled by pure
              curiosity and the thrill of building something from nothing. That
              hacker mindset never left me; I&apos;m still obsessed with
              understanding systems quickly and grinding through complex
              problems to ship products that matter.
            </p>

            <p className="text-lg leading-relaxed">
              My journey took me from Charles Schwab, where I joined for the
              innovation culture, to co-founding Swoovy and building Managerly
              from the ground up. But the real game-changer was stepping into
              venture capital as a Venture Fellow at Palm Venture Studios.
              There, I learned the brutal truth:{" "}
              <strong>
                business model and traction come first, platform and tech
                second.
              </strong>
            </p>

            <p className="text-lg leading-relaxed">
              I&apos;ve seen too many brilliant technical teams build amazing
              products that never find market fit. That&apos;s why I now work as
              a fractional CTO. I&apos;m helping companies operate with the same
              strategic mindset that VCs use to evaluate investments. I
              translate complex technical decisions into clear business value,
              because I know that understanding when to pivot (or when to run)
              can be the difference between a unicorn and a write-off.
            </p>

            <p className="text-lg leading-relaxed">
              My approach? Strategic guidance with hands-on coding. I get in the
              trenches with your team while keeping one eye on the bigger
              picture. I&apos;ve helped clients achieve 5x growth in just a
              couple of years by focusing on the right problems at the right
              time.
            </p>

            <p className="text-lg leading-relaxed font-semibold text-gray-900">
              The lesson I&apos;ve learned: Never stop learning, but always
              start with the business fundamentals. Technology is a powerful
              enabler, but it&apos;s the market opportunity and execution that
              drive real growth.
            </p>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="container mx-auto px-4 py-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-10 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Clients</h2>
          <p className="text-gray-600">Trusted by innovative companies</p>
        </div>

        <Marquee className="py-4">
          <MarqueeContent
            speed={25}
            pauseOnHover={true}
            autoFill={false}
            gradient={false}
          >
            {clients.map((client, index) => (
              <MarqueeItem
                key={index}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mx-12"
              >
                <a
                  href={addUtmParams(client.website, client.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={100}
                    height={100}
                    className="object-contain w-20 h-20 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    priority={false}
                  />
                </a>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </div>
  );
}
