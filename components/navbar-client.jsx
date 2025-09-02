"use client";

import React from "react";
import { Navbar } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { BsTelephone } from "react-icons/bs";
import { usePathname } from "next/navigation";
import BrandLogo from "./brand-logo";

export default function NavbarClient({ ghostPages }) {
  const path = usePathname();

  return (
    <Navbar
      fluid
      rounded
      className="p-3 bg-background rounded border-border dark:bg-gray-800 dark:border-gray-700"
    >
      <Navbar.Brand href="/">
        <BrandLogo />
      </Navbar.Brand>
      <div className="flex flex-1 justify-end md:order-2 px-3">
        <Button size="sm" variant="outline" asChild>
          <a href="tel:+1(512)200-3641">
            <BsTelephone className="mr-2" />
            (512) 200-3641
          </a>
        </Button>
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={path === "/" ? "active" : ""}>
          Consulting
        </Navbar.Link>
        <Navbar.Link
          href="/about"
          active={path.startsWith("/about") ? "active" : ""}
        >
          About
        </Navbar.Link>
        {/* Dynamic Ghost Pages */}
        {ghostPages.map((page) => (
          <Navbar.Link
            key={page.id}
            href={`/${page.slug}`}
            active={path === `/${page.slug}` ? "active" : ""}
          >
            {page.title}
          </Navbar.Link>
        ))}
        {/* <Navbar.Link href="#book-time">
          Projects
        </Navbar.Link>
        <Navbar.Link href="#contact">
          Contact
        </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
