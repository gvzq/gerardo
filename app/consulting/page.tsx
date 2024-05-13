'use client';

import React from 'react';
import Link from 'next/link';
import { FaLaptopCode } from 'react-icons/fa';
import { VscProject } from 'react-icons/vsc';
import { CgWebsite } from 'react-icons/cg';
import PropTypes from 'prop-types';
import ImageCard from '@/components/imageCard';
import {
  Accordion,
} from 'flowbite-react';

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
function Questions() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8">
      <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
          Frequently asked questions
        </h2>
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title>
              Does Gerardo offer a free consultation?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Yes, we can have an initial exploratory call to access what
                areas of your business need attention.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Together we will prioritize the work that need to happen today,
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
                surprises. This way we challenge ourselves to provide continuos
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
                He has a computer science bachelors of science degree and a
                business minor.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                He has more than 5 years of experience building websites and
                product management certifications.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {'Check out my '}
                <AccordionLink
                  href="https://linkedin.com/in/gvzqz"
                  text="LinkedIn"
                />
                {' for a quick glance of my professional experience.'}
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              What results can I expect from working with Gerardo?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                We focus in the work the is most meaningful to you.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Gerardo might start from looking at reducing costs or building
                custom software.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Learn more about these technologies:
              </p>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="https://flowbite.com/pro/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Flowbite Pro
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindui.com/"
                    rel="nofollow"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Tailwind UI
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
export default function Consulting() {
  return (
    <div className="h-full">
      <div className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {'The '}
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                digital
              </span>
              {' and '}
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                software
              </span>
              {' expert for you.'}
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              I will find the right solution for your needs
            </p>
            <Link href="https://zcal.co/gerardo/consulting">
              <span className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Schedule a Meeting
              </span>
            </Link>
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex">
            <ImageCard />
          </div>
        </div>
      </div>
      <section className="pb-20 relative block bg-gray-900">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: '80px' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">Services</h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                Our team will collaborate with you to develop a plan for
                success.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mt-12 justify-center">
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-gray-900 p-3 w-16 h-16 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <CgWebsite className="w-12 h-12 text-xl" />
              </div>
              <h6 className="text-xl mt-5 font-semibold text-white">
                Web Design and Development
              </h6>
              <p className="mt-2 mb-4 text-gray-500">
                Harness the power of modern website development. Differentiate
                your company. Redesign your product for better performance and
                efficiency We help you plan, design, and develop, end-to-end.
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-gray-900 p-3 w-16 h-16  shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <VscProject className="w-12 h-12 text-xl" />
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">
                Project Management
              </h5>
              <p className="mt-2 mb-4 text-gray-500">
                Strengthen your market offerings. Innovate your offerings to
                enhance customer experiences. Build your positioning and
                messaging. Prioritize what matters most to your audience.
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-gray-900 p-3 w-16 h-16 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <FaLaptopCode className="w-12 h-12 text-xl" />
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">
                Custom Software
              </h5>
              <p className="mt-2 mb-4 text-gray-500">
                Analyze your software needs and create technology to help the
                operations. Collaborate to build software that solves business
                problems.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-20 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-gray-600 p-3 text-center
              inline-flex items-center justify-center w-16 h-16
               mb-6 shadow-lg rounded-full bg-gray-100"
              >
                <i className="fas fa-user-friends text-xl" />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Click Heatmap
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                A click heatmap lets you identify
                the visitor experience, pinpoint roadblocks,
                and boost conversions to create an optimized website.
              </p>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div
                className="relative flex flex-col
                 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg"
              >
                <Image
                  className="w-full align-middle rounded-t-lg"
                  src={heatmapClick}
                  alt="User recording of website"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div
                className="relative flex flex-col
                min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg"
              >
                <Image
                  className="max-w-full rounded-lg shadow-lg"
                  src={heatmapArea}
                  alt="User recording of website"
                />
              </div>
            </div>
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-gray-600 p-3 text-center
               inline-flex items-center justify-center
                w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100"
              >
                <i className="fas fa-user-friends text-xl" />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Area Heatmap
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                A click heatmap lets you identify
                the visitor experience, pinpoint roadblocks,
                and boost conversions to create an optimized website.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="pb-20 block bg-gray-900">
        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">
                Behavior Analytics Tools
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                See what elements customers are drawn towards,
                and the parts they completely miss.
                Learn exactly where users move, click, scroll, and stop to leave your site.
              </p>

            </div>
            <Image
              className="w-full rounded antialiased"
              src={recording}
              alt="User recording of website"
            />
          </div>
        </div>
      </section> */}
      <section className="h-50 py-16">
        <Questions />
      </section>
    </div>
  );
}
