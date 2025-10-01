"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { Faq } from "@/components/faq";
import {
  FaAws,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaGithub,
  FaSlack,
  FaLaptopCode,
} from "react-icons/fa";
import { VscAzure, VscProject } from "react-icons/vsc";
import { TbBrandTeams, TbServerCog } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { SiGooglecloud, SiVercel, SiGatsby, SiJira } from "react-icons/si";
import { DiScrum, DiJavascript } from "react-icons/di";
import { TbBrandNextjs } from "react-icons/tb";
import innovation from "@/public/innovation-pipeline.jpeg";
import ImageCard from "@/components/imageCard";
import Technologies from "@/components/technologies";
import SecureEmail from "@/components/SecureEmail";

function Quote() {
  return (
    <section className="bg-accent py-16 lg:py-24">
      <div className="max-w-screen-xl px-6 mx-auto text-center">
        <div className="max-w-screen-md mx-auto">
          <h3 className="text-2xl font-bold text-accent-foreground mb-8">
            Why Choose Fractional Over Full-Time
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-accent-foreground">
                    Immediate Impact
                  </h4>
                  <p className="text-accent-foreground/70">
                    Start solving technical challenges this week, not after
                    months of recruiting
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-accent-foreground">
                    60-80% Cost Savings
                  </h4>
                  <p className="text-accent-foreground/70">
                    Get executive-level expertise without full-time salary and
                    equity dilution
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-accent-foreground">
                    Startup Experience
                  </h4>
                  <p className="text-accent-foreground/70">
                    Technical foundations that scale with startup experience
                    across multiple growth stages
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-accent-foreground">
                    Flexible Engagement
                  </h4>
                  <p className="text-accent-foreground/70">
                    From 10 hours/week strategic guidance to intensive project
                    sprints based on your needs
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-accent-foreground/10 rounded-lg">
            <blockquote>
              <p className="text-lg font-medium text-accent-foreground italic">
                &quot;First, solve the problem. Then write the code.&quot;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
function Features() {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="px-6 mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-secondary-foreground lg:mb-8 lg:text-3xl">
            Technical Skills & Expertise
          </h2>
          <p className="text-base text-secondary-foreground/70 md:text-lg">
            Core technologies and methodologies I use to deliver exceptional
            results
          </p>
        </div>
        <div className="grid gap-8 row-gap-10 lg:grid-cols-3">
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="text-secondary p-3 w-16 h-16 shadow-lg rounded-full bg-secondary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <TbServerCog className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold leading-5">Cloud</h6>
            <p className="mt-2 mb-4 text-sm text-gray-900">
              Cloud computing is the on-demand delivery with pay-as-you-go
              pricing. Gerardo has experience in AWS, GCP, Vercel, and Azure.
            </p>
            <p className="flex space-x-2 items-center justify-center">
              <FaAws />
              <SiGooglecloud />
              <SiVercel />
              <VscAzure />
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="text-secondary p-3 w-16 h-16 shadow-lg rounded-full bg-secondary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <DiScrum className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold leading-5">
              Agile Product Management
            </h6>
            <p className="mt-2 mb-4 text-sm text-gray-900">
              Agile is an iterative project management approach that delivers
              value faster and with fewer errors. Gerardo utilizes tools
              including but not limiting to Git, Jira, Github, Microsoft Teams,
              or Slack to respond to change quickly.
            </p>
            <p className="flex space-x-2 items-center justify-center">
              <FaGithub />
              <SiJira />
              <TbBrandTeams />
              <FaSlack />
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="text-secondary p-3 w-16 h-16 shadow-lg rounded-full bg-secondary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <DiJavascript className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold leading-5">
              JavaScript/TypeScript
            </h6>
            <p className="mt-2 mb-4 text-sm text-gray-900">
              JavaScript is a programming language used in 98% on the client
              side in websites, and could be used in servers as well. Gerardo
              has experience with React, Gatsby, Next, Node, and Angular.
            </p>
            <p className="flex space-x-2 items-center justify-center">
              <TbBrandNextjs />
              <FaAngular />
              <FaReact />
              <FaNodeJs />
              <SiGatsby />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Process() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="px-6 mx-auto max-w-screen-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground lg:mb-8 lg:text-3xl">
            How can I help?
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            I&apos;m ready to contribute and accelerate your efforts.
          </p>
        </div>

        <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
          <div className="lg:py-6 lg:pr-16">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-4 text-gray-600"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>

              <div className="pt-1 pb-8">
                <p className="mb-2 text-lg font-bold">Step 1: Ask Questions</p>
                <p className="text-gray-700">
                  People always describe who they want to be rather than who
                  they are. Let&apos;s get into specifics.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-4 text-gray-600"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-lg font-bold">
                  Step 2: Define Value Propositions
                </p>
                <p className="text-gray-700">
                  What are the things you really care and want? Let&apos;s
                  narrow the definition of your customer profile.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-4 text-gray-600"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-lg font-bold">
                  Step 3: Measure Accurately
                </p>
                <p className="text-gray-700">
                  It&apos;s essential for developing a truly useful and
                  enjoyable product with an excellent user experience.
                  Let&apos;s create a strategy.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-6 text-gray-600"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polyline
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        points="6,12 10,16 18,8"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <p className="mb-2 text-lg font-bold">Launch and Scale</p>
                <p className="text-gray-700">
                  Go slow to go fast. Let&apos;s partner to reach success!
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              className="max-w-fit aspect-auto inset-0 object-contain object-center w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
              src={innovation}
              alt="Innovation Pipeline"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="grid max-w-screen-xl px-6 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Turn Ideas into{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Fundable
            </span>
            {" Products"}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Transform your startup vision into investor-ready technology
            solutions without the full-time CTO commitment. I partner with
            non-technical founders to navigate critical technology decisions and
            prepare for venture capital due diligence.
          </p>
          <div className="mb-6">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
              ✓ 60-80% Cost Savings vs Full-Time CTO
            </p>
          </div>
          <Link href="https://zcal.co/gerardo/consulting">
            <span className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get Started This Week
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </Link>
          <Link href="#services">
            <span className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              See How It Works
            </span>
          </Link>
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex">
          <ImageCard />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-primary py-16 lg:py-24" id="services">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap text-center justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold text-primary-foreground">
              What I Do
            </h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-primary-foreground/80">
              Fractional CTO helping pre-seed startups and bootstrap businesses
              turn ideas into fundable products
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mt-12 justify-center">
          <div className="w-full lg:w-3/12 px-4 text-center mb-8">
            <div className="text-primary p-3 w-16 h-16 shadow-lg rounded-full bg-primary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <VscProject className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold text-primary-foreground">
              AI Strategy & Implementation
            </h6>
            <p className="mt-2 mb-4 text-primary-foreground/80 leading-relaxed">
              Leverage practical AI solutions for competitive advantage without
              burning budget on custom development. Build
              <span className="text-accent font-medium">
                {" "}
                product-market fit
              </span>{" "}
              with technology that scales efficiently.
            </p>
          </div>
          <div className="w-full lg:w-3/12 px-4 text-center mb-8">
            <div className="text-primary p-3 w-16 h-16 shadow-lg rounded-full bg-primary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <FaLaptopCode className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold text-primary-foreground">
              Investor Readiness
            </h6>
            <p className="mt-2 mb-4 text-primary-foreground/80 leading-relaxed">
              Prepare technical materials and architecture documentation that
              impress VCs during due diligence. Align technology roadmaps with
              <span className="text-accent font-medium">
                {" "}
                funding objectives
              </span>{" "}
              and business milestones.
            </p>
          </div>
          <div className="w-full lg:w-3/12 px-4 text-center mb-8">
            <div className="text-primary p-3 w-16 h-16 shadow-lg rounded-full bg-primary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <CgWebsite className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold text-primary-foreground">
              Technology Stack Selection
            </h6>
            <p className="mt-2 mb-4 text-primary-foreground/80 leading-relaxed">
              Make foundational decisions that support long-term growth without
              over-engineering for current stage. Bridge the gap between vision
              and
              <span className="text-accent font-medium"> execution</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  const faqItems = [
    {
      id: "faq-1",
      question: "How does your retainer model work?",
      answer:
        "I work on a flexible retainer basis where we agree on minimum hours and rates together based on your needs. Typical engagement: 5-10 hours weekly for pre-seed startups at $150-200/hour, providing strategic expertise without the $177-293K annual commitment of a full-time CTO. Work is done remotely with opportunities to meet in person when needed. You can adjust or stop services at any time.",
    },
    {
      id: "faq-2",
      question: "What makes you different from a traditional CTO?",
      answer:
        "Unlike traditional CTOs focused primarily on code, I lead with business strategy first. My approach aligns technology roadmap with funding milestones, ensuring every technical decision drives toward product-market fit and investor readiness. I function as an integrated team member, managing resources and making strategic decisions alongside operators and founders. My background spans innovation in tech, software engineering, co-founding startups, and venture capital.",
    },
    {
      id: "faq-3",
      question: "What types of startups do you work with?",
      answer:
        "I specialize in helping pre-seed startups that face technical leadership gaps while needing strategic expertise: Pre-seed startups with limited runway seeking 60-80% cost savings vs full-time CTO, companies preparing for Series A fundraising and investor due diligence, startups building MVPs and validating product-market fit efficiently, teams struggling with outsourced development and needing strategic oversight, and non-technical founders who need to navigate critical technology decisions.",
    },
    {
      id: "faq-4",
      question: "Do you offer a free consultation?",
      answer:
        "Yes, I offer an initial exploratory call to assess your technical leadership needs and determine if we're a good fit. During this call, we'll prioritize the work that needs to happen immediately and lay out a strategic roadmap that aligns with your funding objectives and business milestones.",
    },
    {
      id: "faq-5",
      question: "What's your background and experience?",
      answer:
        "I'm a Texas A&M alumni with a Computer Science degree and business minor. My career spans multiple domains: Software Engineering with S&P 500 experience at Charles Schwab in innovation, co-founder experience building Swoovy and Managerly from the ground up, Venture Capital Fellow at Palm Venture Studios understanding investor perspectives, and 5+ years of technical leadership helping startups scale technology and teams. Check out my LinkedIn at linkedin.com/in/gvzqz for a complete view of my experience bridging technology and business strategy.",
    },
    {
      id: "faq-6",
      question: "What results can I expect working with you?",
      answer:
        "I focus on driving measurable business outcomes through strategic technology decisions: Investor readiness with technical documentation and architecture that impresses VCs during due diligence, cost optimization with right-sized technology solutions that scale without over-engineering, product-market fit acceleration with technology roadmaps aligned with business milestones, and team efficiency through strategic oversight of development resources and outsourced teams. My clients have achieved significant growth by focusing on the right technical problems at the right time, with technology decisions that drive toward funding objectives rather than just code quality.",
    },
  ];

  return (
    <div className="bg-secondary">
      <Faq heading="Frequently asked questions" items={faqItems} />
    </div>
  );
}

function ContactCTA() {
  return (
    <section className="bg-primary py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-primary-foreground mb-6">
          Let&apos;s Build Together
        </h2>

        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="text-lg text-primary-foreground">
            <SecureEmail />
          </div>

          <a
            href="tel:+1(804)372-7365"
            className="flex flex-col items-center hover:text-primary-foreground/80 transition-colors"
          >
            <span className="text-xl font-semibold text-primary-foreground">80-GERARDO-5</span>
            <span className="text-sm text-primary-foreground/70">(804) 372-7365</span>
          </a>
        </div>

        <div className="flex justify-center">
          <Link href="https://zcal.co/gerardo/consulting">
            <span className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary bg-primary-foreground rounded-lg hover:bg-primary-foreground/90 transition-colors duration-200">
              Schedule a Call
              <svg
                className="w-4 h-4 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <Features />
      <Quote />
      <Process />
      <Technologies />
      <ContactCTA />
      <Questions />
    </div>
  );
}
