"use client";

import React from "react";
import { Accordion } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
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

function AccordionLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href}>
      <span className="text-blue-600 hover:underline dark:text-blue-500">
        {text}
      </span>
    </Link>
  );
}
AccordionLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

function Quote() {
  return (
    <section className="bg-accent py-16 lg:py-24">
      <div className="max-w-screen-xl px-6 mx-auto text-center">
        <figure className="max-w-screen-md mx-auto">
          <svg
            className="h-12 mx-auto mb-3 text-accent-foreground/60"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-xl font-medium text-accent-foreground md:text-2xl">
              &quot;First, solve the problem. Then write the code.&quot;
            </p>
          </blockquote>
          {/* <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">John Johnson</div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
              CEO at Google
              </div>
            </div>
          </figcaption> */}
        </figure>
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
            {"Your "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              fCTO
            </span>
            {" & "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              product
            </span>
            {" expert"}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            I design effective websites, develop the best solution, measure the
            impact, and find the right digital solution for your business needs
          </p>
          <Link href="https://zcal.co/gerardo/consulting">
            <span className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Schedule a Meeting
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
              Learn More
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
              Services
            </h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-primary-foreground/80">
              I will collaborate with you to develop a plan for success.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mt-12 justify-center">
          <div className="w-full lg:w-3/12 px-4 text-center mb-8">
            <div className="text-primary p-3 w-16 h-16 shadow-lg rounded-full bg-primary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <CgWebsite className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold text-primary-foreground">
              Web Design and Development
            </h6>
            <p className="mt-2 mb-4 text-primary-foreground/80 leading-relaxed">
              Harness the power of modern website development. Differentiate
              your company. Redesign your
              <span className="text-accent font-medium"> product</span> for
              better performance and efficiency. I help you plan, design, and
              develop, end-to-end.
            </p>
          </div>
          <div className="w-full lg:w-3/12 px-4 text-center mb-8">
            <div className="text-primary p-3 w-16 h-16 shadow-lg rounded-full bg-primary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <VscProject className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold text-primary-foreground">
              fCTO & Product Management
            </h6>
            <p className="mt-2 mb-4 text-primary-foreground/80 leading-relaxed">
              Strengthen your market offerings as your fractional CTO. Innovate
              your offerings to enhance customer experiences. Build your
              positioning and messaging. Prioritize what matters most to your
              <span className="text-accent font-medium"> product</span>{" "}
              audience.
            </p>
          </div>
          <div className="w-full lg:w-3/12 px-4 text-center mb-8">
            <div className="text-primary p-3 w-16 h-16 shadow-lg rounded-full bg-primary-foreground inline-flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <FaLaptopCode className="w-10 h-10" />
            </div>
            <h6 className="text-xl mt-5 font-bold text-primary-foreground">
              Custom Software
            </h6>
            <p className="mt-2 mb-4 text-primary-foreground/80 leading-relaxed">
              Analyze your software needs and create technology to help your
              operations. Collaborate to build software that solves business
              problems and enhances your
              <span className="text-accent font-medium"> product</span>{" "}
              capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="max-w-screen-xl px-6 mx-auto">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-secondary-foreground lg:mb-8 lg:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title>
              Does Gerardo offer a free consultation?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Yes, we can have an initial exploratory call to assess what
                areas of your business need attention.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Together we will prioritize the work that needs to happen today,
                and lay out a roadmap for iterative improvements.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>What are your working terms?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                It&apos;s quite simple. We will be working month to month
                because we are looking to build a long lasting relationship with
                you.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                We have a subscription model so you will never have any billing
                surprises. This way we challenge ourselves to provide continuous
                value.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                You can stop our services at any time.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              What kind of background and experience does Gerardo have?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Gerardo is a Texas A&M alumni and a S&P 500 software engineer.
                He has a computer science bachelor&apos;s of science degree and
                a business minor. He used to work in innovation and
                <span className="text-blue-600 font-medium"> product</span>{" "}
                management.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                He has more than 5 years of experience building websites and
                <span className="text-blue-600 font-medium"> product</span>{" "}
                management certifications.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {"Check out my "}
                <AccordionLink
                  href="https://linkedin.com/in/gvzqz"
                  text="LinkedIn"
                />
                {" for a quick glance of my professional experience."}
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              What results can I expect from working with Gerardo?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Gerardo focuses on the work that is most meaningful to you.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                He may start by identifying ways to reduce costs or by
                developing custom software solutions tailored to your business
                needs.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Learn more about some of the technologies Gerardo uses:
              </p>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="https://nextjs.org/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Next.js
                  </a>
                </li>
                <li>
                  <a
                    href="https://vercel.com/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Vercel
                  </a>
                </li>
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
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
      <Questions />
    </div>
  );
}
