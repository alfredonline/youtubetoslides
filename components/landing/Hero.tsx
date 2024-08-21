import React from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { FaYoutube, FaArrowRight } from "react-icons/fa";
import { RiSlideshowLine } from "react-icons/ri";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Hero = () => {
  const user = false;

  return (
    <section className="relative overflow-hidden pt-6">
      <div className="container relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b83f656] to-[#3b83f69d] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem] animate-pulse duration-3000"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center">
        <div className="w-full px-4">
          <div className="mx-auto max-w-[900px] text-left md:text-center">
            <h3 className="font-bold text-center flex gap-4 flex-1 md:justify-center mb-10 mt-20">
              <FaYoutube className="h-6 w-6 inline-block" />
              <FaArrowRight className="h-6 w-6 inline-block" />
              <RiSlideshowLine className="h-6 w-6 inline-block" />
            </h3>
            <h1 className="mb-6 text-2xl font-bold leading-snug text-gray-900 sm:text-4xl lg:text-6xl lg:leading-[1.2]">
              Generate educational Powerpoints from YouTube videos
            </h1>
            <p className="mx-auto mb-9 max-w-[800px] text-base font-medium text-gray-600 sm:text-2xl sm:leading-[1.44]">
              An online tool for teachers that allows you to convert educational
              YouTube videos into educational presentations.
            </p>
            <div className="flex items-center flex-1 md:justify-center gap-4">
              {user ? (
                <>
                  <Input
                    type="text"
                    placeholder="Enter a YouTube URL"
                    className="w-full p-8 text-gray-400 bg-white rounded-lg focus:outline-none"
                  />
                  <Link
                    href="/generate"
                    className={buttonVariants({
                      variant: "default",
                      className: "h-16 w-48",
                    })}
                  >
                    Generate
                  </Link>
                </>
              ) : (
                <RegisterLink
                  className={buttonVariants({
                    variant: "default",
                  })}
                >
                  Get started
                </RegisterLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
