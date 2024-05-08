import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ImageCard from './imageCard';

export default function HeroImage({ header = 'Hey,\n\nI\'m Gerardo', subheader = '' }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            {header}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {subheader}
          </p>
          <Link href="https://zcal.co/gerardo/consulting">
            <span className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Schedule a Meeting
            </span>
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <ImageCard />
        </div>
      </div>
    </section>
  );
}
HeroImage.propTypes = {
  header: PropTypes.node,
  subheader: PropTypes.string,
};
HeroImage.defaultProps = {
  header: 'Hey,\n\nI\'m Gerardo',
  subheader: '',
};
