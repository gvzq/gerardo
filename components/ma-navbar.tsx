"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaBuildingColumns, FaPhone, FaChartLine } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function MANavbar() {
  const path = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["process", "valuation", "faq", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is near bottom (within 100px)
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 100;

      // If near bottom, activate contact section
      if (isNearBottom) {
        const contactElement = document.getElementById("contact");
        if (contactElement) {
          setActiveSection("contact");
          return;
        }
      }

      // Otherwise, check which section is most visible
      let maxVisibility = 0;
      let mostVisibleSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;
          const elementHeight = rect.height;

          // Calculate how much of the section is visible in viewport
          const visibleTop = Math.max(0, Math.min(windowHeight, elementBottom) - Math.max(0, elementTop));
          const visibilityRatio = visibleTop / elementHeight;

          // Prioritize sections that are in the upper portion of viewport
          const positionBonus = elementTop < windowHeight * 0.3 ? 0.3 : 0;
          const totalScore = visibilityRatio + positionBonus;

          if (totalScore > maxVisibility && visibilityRatio > 0.2) {
            maxVisibility = totalScore;
            mostVisibleSection = section;
          }
        }
      }

      setActiveSection(mostVisibleSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm h-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Section */}
          <Link href="/ma" className="flex items-center space-x-3 group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FaBuildingColumns className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  fCTO Labs
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Capital
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/ma"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "" && path === "/ma"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              Acquisitions
            </Link>
            <Link
              href="/ma#process"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "process"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              Process
            </Link>
            <Link
              href="/ma#valuation"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "valuation"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              Get Valuation
            </Link>
            <Link
              href="/ma#faq"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "faq"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/ma#contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "contact"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Section */}
          <div className="flex items-center space-x-4">
            {/* Phone Number - Desktop */}
            <a
              href="tel:+1(804)372-7365"
              className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <FaPhone className="w-3 h-3" />
              <span>(804) 372-7365</span>
            </a>

            {/* Primary CTA */}
            <Link href="/ma#valuation">
              <Button size="sm">
                <span className="hidden sm:inline">Get Valuation</span>
                <span className="sm:hidden">Valuation</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Hidden by default, would need state management for toggle */}
        <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
          <Link
            href="/ma"
            className="block px-3 py-2 text-sm font-medium text-primary bg-primary/5 rounded-md"
          >
            Acquisitions
          </Link>
          <Link
            href="/ma#process"
            className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            Our Process
          </Link>
          <Link
            href="/ma#valuation"
            className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            Get Business Valuation
          </Link>
          <a
            href="tel:+1(804)372-7365"
            className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            📞 (804) 372-7365
          </a>
        </div>
      </div>
    </nav>
  );
}
