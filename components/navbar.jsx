import React from "react";
import { Navbar, Button } from "flowbite-react";
import { BsTelephone } from "react-icons/bs";
import BrandLogo from "./brand-logo";
import { getNonConflictingPages } from "@/lib/ghost";
import NavbarClient from "./navbar-client";

export default async function Nav() {
  // Fetch Ghost pages at build time/server-side
  const ghostPages = await getNonConflictingPages();

  return <NavbarClient ghostPages={ghostPages} />;
}
