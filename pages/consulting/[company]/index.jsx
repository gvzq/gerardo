import React from 'react';
import { useRouter } from 'next/router';
import { Accordion } from 'flowbite-react';
import Link from 'next/link';
// import Image from 'next/image';
import { FaLaptopCode } from 'react-icons/fa';
import { VscProject } from 'react-icons/vsc';
import { CgWebsite } from 'react-icons/cg';
import PropTypes from 'prop-types';
import HeroImage from '../../../components/heroImage';
// import recording from '../../../public/images/recording.webp';
// import heatmapArea from '../../../public/images/heatmap-area.png';
// import heatmapClick from '../../../public/images/heatmap-click.png';

function AccordionLink({ href, text }) {
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
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">Frequently asked questions</h2>
        <Accordion alwaysOpen flush>
          <Accordion.Panel>
            <Accordion.Title>
              Does Gerardo offer a free consultation?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Yes, we can have an initial exploratory call to access
                what areas of your business need attention.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Together we will prioritize the work that need to happen today,
                and lay out a roadmap for iterative improvements.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              What are your working terms?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                It&apos;s quite simple.
                We will be working month to month because
                we are looking to build a long lasting relationship with you.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                We have a subscription model so you will never have any billing surprises.
                This way we challenge ourselves to provide continuos value.
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
                He has a computer science bachelors of science degree and a business minor.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                He has more than 5 years of experience building websites
                and product management certifications.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {'Check out my '}
                <AccordionLink href="https://linkedin.com/in/gvzqz" text="LinkedIn" />
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
                Gerardo might start from looking at reducing costs or building custom software.
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
  const router = useRouter();
  let { company } = router.query;

  if (company) {
    company = company.replaceAll('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  }

  return (
    <div className="h-full">

      <HeroImage
        header={(
          <>
            {'The '}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">digital</span>
            {' and '}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">software</span>
            {` expert for ${company}.`}
          </>
          )}
        subheader="I will find the right solution for your needs"
      />

      {/* BLOCK */}
      {/* <div className="relative bg-gray-800">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
              Title
            </h2>
            <p className="mb-6 text-base font-thin tracking-wide text-gray-300 md:text-lg">
              Sub
            </p>
            <p className="max-w-md mb-10 text-xs font-thin tracking-wide text-gray-500 sm:text-sm sm:mx-auto md:mb-16">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
            <a
              href="/"
              aria-label="Scroll down"
              className="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-gray-400 rounded-full hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
              </svg>
            </a>
          </div>
        </div>
      </div> */}

      <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            Services
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Our team will collaborate with you to develop a  plan for success.
          </p>
        </div>
        <div className="grid gap-8 row-gap-12 lg:grid-cols-3">
          <div className="max-w-md sm:mx-auto sm:text-center border rounded shadow-sm">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
              <CgWebsite className="w-12 h-12 text-deep-purple-accent-400 sm:w-20 sm:h-20" />
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">Web Design and Development</h6>
            <p className="mb-3 text-sm text-gray-900">
              Harness the power of modern website development.
              Differentiate your company.
              Redesign your product for better performance and efficiency
              We help you plan, design, and develop, end-to-end.
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center border rounded shadow-sm">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
              <VscProject className="w-12 h-12 text-deep-purple-accent-400 sm:w-20 sm:h-20" />
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">Project Management</h6>
            <p className="mb-3 text-sm text-gray-900">
              Strengthen your market offerings.
              Innovate your offerings to enhance customer experiences.
              Build your positioning and messaging.
              Prioritize what matters most to your audience.
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center border rounded shadow-sm">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">

              <FaLaptopCode className="w-12 h-12 text-deep-purple-accent-400 sm:w-20 sm:h-20" />
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">Custom Software</h6>
            <p className="mb-3 text-sm text-gray-900">
              Analyze your software needs and create technology to help the operations.
              Collaborate to build software that solves business problems.
            </p>
          </div>
        </div>
      </section>

      {/* Click Heatmap */}
      {/* <section className="bg-slate-300">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full
        lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="max-w-xl pr-16 mx-auto mb-10">
              <h5 className="mb-6 text-3xl font-extrabold leading-none">
                Click Heatmap
              </h5>
              <p className="mb-6 text-gray-900">
                A click heatmap lets you identify
                the visitor experience, pinpoint roadblocks,
                and boost conversions to create an optimized website.
              </p>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 mr-6
                  font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                >
                  Get started
                </button>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center
                  font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  Learn more
                </a>
              </div>
            </div>
            <div className="w-full">
              <Image
                className="object-cover h-48 w-96 rounded antialiased"
                src={heatmapArea}
                alt="User recording of website"
                layout="intrinsic"
              />
               <Image
                className="object-cover h-48 w-96 rounded antialiased"
                src={heatmapClick}
                alt="User recording of website"
                layout="intrinsic"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section>
        <h1>Behavior Analytics Tools</h1>
        <p>
          See what elements customers are drawn towards,
          and the parts they completely miss.
          Learn exactly where users move, click, and scroll, and stop scrolling to leave your site.
        </p>
        <Image
          className="object-cover h-48 w-96 rounded antialiased"
          src={recording}
          alt="User recording of website"
          layout="intrinsic"
        />
      </section> */}

      <section className="h-50 py-16">
        <Questions />
      </section>
    </div>
  );
}
