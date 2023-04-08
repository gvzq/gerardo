import React from 'react';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { BsWordpress, BsFillLightningChargeFill } from 'react-icons/bs';
import {
  FaServer, FaAws, FaReact, FaAngular, FaNodeJs, FaGithub, FaElementor, FaSlack,
} from 'react-icons/fa';
import {
  SiGooglecloud, SiMicrosoftazure, SiVercel,
  SiGatsby, SiHubspot, SiJira, SiMicrosoftteams,
} from 'react-icons/si';
import { DiScrum, DiJavascript, DiGoogleAnalytics } from 'react-icons/di';
import { TbBrandNextjs } from 'react-icons/tb';
import HeroImage from '../components/heroImage';
import innovation from '../public/images/innovation-pipeline.jpeg';

function CallToAction() {
  return (
    <Link href="https://zcal.co/gerardo/consulting">
      <span>
        <Button size="xl" pill>
          Schedule a Meeting
        </Button>
      </span>
    </Link>
  );
}

function Header() {
  return (
    <div className="bg-gray-200 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
          Gerardo Vazquez
        </p>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          I&apos;m here to help you
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          I design effective websites, develop the best solution, and I measure the impact.
        </p>
        <div className="grid place-items-center my-4">
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
function Quote() {
  return (
    <section className="bg-gray-200 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
        <figure className="max-w-screen-md mx-auto">
          <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
          </svg>
          <blockquote>
            <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">&quot;First, solve the problem. Then write the code.&quot;</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            {/* <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" /> */}
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">John Johnson</div>
              {/* <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
              CEO at Google
              </div> */}
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function Features() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <DiJavascript className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16" />
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">JavaScript</h6>
          <p className="mb-3 text-sm text-gray-900">
            JavaScript is a programming language used in 98% on the client side in websites,
            and could be used in servers as well.
            Gerardo has experience with React, Gatsby, Next, Node, and Angular.
          </p>
          <p className="flex space-x-2 items-center justify-center">
            <TbBrandNextjs />
            <FaAngular />
            <FaReact />
            <FaNodeJs />
            <SiGatsby />
          </p>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <FaServer className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16" />
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">Cloud</h6>
          <p className="mb-3 text-sm text-gray-900">
            Cloud computing is the on-demand delivery with pay-as-you-go pricing.
            Gerardo has experience in AWS, GCP, Vercel, and Azure.
          </p>
          <p className="flex space-x-2 items-center justify-center">
            <FaAws />
            <SiGooglecloud />
            <SiVercel />
            <SiMicrosoftazure />
          </p>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <BsWordpress className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16" />
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">Wordpress</h6>
          <p className="mb-3 text-sm text-gray-900">
            WordPress is a content management system and
            powers over 43.3% of all the websites on the Internet.
            Gerardo has experience with Elementor, Hubspot,
            Search Engine Optimization (SEO), Accelerated Mobile Pages (AMP),
            Page Analytics, and Cache Plugins.
          </p>
          <p className="flex space-x-2 items-center justify-center">
            <FaElementor />
            <SiHubspot />
            <BsFillLightningChargeFill />
            <DiGoogleAnalytics />
          </p>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <DiScrum className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16" />
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">
            Agile Product Management
          </h6>
          <p className="mb-3 text-sm text-gray-900">
            Agile is an iterative project management approach that
            delivers value faster and with fewer errors.
            Gerardo utilizes tools including but not limiting to
            Git, Jira, Github, Microsoft Teams, or Slack to respond to change quickly.
          </p>
          <p className="flex space-x-2 items-center justify-center">
            <FaGithub />
            <SiJira />
            <SiMicrosoftteams />
            <FaSlack />
          </p>
        </div>
      </div>
    </div>
  );
}
function Process() {
  return (
    <div
      className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      id="services"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight  text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">How can I help?</h2>
        <p className="text-base text-gray-700 md:text-lg">
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
                People always describe who they want to be rather than who they are.
                Let&apos;s get into specifics.
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
              <p className="mb-2 text-lg font-bold">Step 2: Define Value Propositions</p>
              <p className="text-gray-700">
                What are the things you really care and want?
                Let&apos;s narrow the definition of your customer profile.
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
              <p className="mb-2 text-lg font-bold">Step 3: Measure Accurately</p>
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
            className="max-w-fit inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
            src={innovation}
            alt="Innovation Pipeline"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeroImage
        subheader="I'm a software engineer. Thank you for visiting my page"
      />
      <Features />
      <Quote />
      <Process />
      <Header />
    </div>
  );
}
