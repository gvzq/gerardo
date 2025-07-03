import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import "tailwindcss/tailwind.css";
import Script from "next/script";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Gerardo Vazquez",
  description: "fCTO and Product",
};
const clarityMicrosoft =
  '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "dui4jwiwac");';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="apple-touch-icon" sizes="180x180" href="https://gerardo.js.org/manifest/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://gerardo.js.org/manifest/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://gerardo.js.org/manifest/favicon-16x16.png" />
        <link rel="manifest" href="https://gerardo.js.org/manifest/site.webmanifest" />
      </head> */}
      <body className={`${inter.variable} flex flex-col min-h-screen`}>
        <nav>
          <Nav />
        </nav>
        <main className="flex-grow">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
      <Script
        id="clarityMicrosoft"
        dangerouslySetInnerHTML={{ __html: clarityMicrosoft }}
      />
      <Analytics />
    </html>
  );
}
