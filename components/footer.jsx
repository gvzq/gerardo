import React from "react";
import { Footer } from "flowbite-react";
import BrandLogo from "./brand-logo";

export default function Foot() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="flex w-full justify-between sm:flex sm:items-center sm:justify-between">
          <BrandLogo />
          <Footer.LinkGroup>
            <Footer.Link href="/">Consulting</Footer.Link>
            <Footer.Link href="/ma">M&A</Footer.Link>
            <Footer.Link href="/about">About</Footer.Link>
            <Footer.Link href="/blog">Blog</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="/" by=" Gerardo Vazquez™" year={2022} />
      </div>
    </Footer>
  );
}
