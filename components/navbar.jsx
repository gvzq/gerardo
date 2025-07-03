"use client";

import React from "react";
import { Navbar, Button } from "flowbite-react";
import { BsTelephone } from "react-icons/bs";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();

  return (
    <Navbar
      fluid
      rounded
      className="p-3 bg-slate rounded border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-extrabold dark:text-white">
          GERA.
        </span>
      </Navbar.Brand>
      <div className="flex flex-1 justify-end md:order-2 px-3">
        <Button href="tel:+1(512)200-3641">
          <BsTelephone className="mr-2" />
          (512) 200-3641
        </Button>
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={path === "/" ? "active" : ""}>
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/about"
          active={path.startsWith("/about") ? "active" : ""}
        >
          About
        </Navbar.Link>
        <Navbar.Link href="/consulting">Consulting</Navbar.Link>
        <Navbar.Link
          href="/blog"
          active={path.startsWith("/blog") ? "active" : ""}
        >
          Blog
        </Navbar.Link>
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
