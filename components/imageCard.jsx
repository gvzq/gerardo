import React from "react";
import PropTypes from "prop-types";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

export default function ImageCard({ enableName = false }) {
  return (
    <>
      <div className="flex justify-center px-4 py-2 container mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-10 lg:px-8 lg:py-8">
        <div className="max-w-sm max-w-1/16 center">
          <Image
            className="object-cover rounded-full antialiased"
            src="/gerardo.jpg"
            alt="Gerardo Vazquez"
            width={400}
            height={400}
            priority={false}
          />
        </div>
      </div>
      {enableName && (
        <div className="flex flex-col text-center">
          <p className="text-lg font-bold">Gerardo Vazquez</p>
          <p className="mb-5 text-xs text-gray-800">
            Software Engineer & Product Manager
          </p>
          <div className="flex items-center space-x-3 justify-center">
            <Link
              href="https://www.linkedin.com/in/gvzqz"
              className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <BsLinkedin />
            </Link>
            <Link
              href="https://github.com/gvzq"
              className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <BsGithub />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
ImageCard.propTypes = {
  enableName: PropTypes.bool,
};
