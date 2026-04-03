"use client";

import { useEffect, useState } from "react";
import Counter from "./Counter";
import SEO from "./SEO";

export default function Header() {
  const metadata = {
    title: "Débora Teixeira – Software Developer",
    description:
      "I'm Débora Teixeira, a software developer with a passion for frontend. I have a masters degree in Computer Science and 5 years of work experience.",
  };

  const [opacity, setOpacity] = useState(1);
  const [colorBlend, setColorBlend] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeEnd = 600;

      const newOpacity = 1 - scrollY / fadeEnd;
      setOpacity(Math.max(newOpacity, 0));

      const newColorBlend = Math.min(scrollY / fadeEnd, 1);
      setColorBlend(newColorBlend);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SEO title={metadata.title} description={metadata.description} />
      <div
        style={{
          opacity,
          transform: `scale(${0.99 + opacity * 0.01})`,
          backgroundColor: `rgba(255, 255, 255, ${1 - colorBlend * 0.3})`,
        }}
        className="relative isolate overflow-hidden py-24 sm:py-20 shadow-lg transition-opacity duration-100"
      >
        <div className="mx-auto max-w-7xl px-3 lg:px-8">
          <div className="mx-auto max-w-3xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Débora Teixeira
            </h2>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              My name is Débora Teixeira and I'm a software developer with a passion for frontend.
              This is my curriculum vitae, where you can find more about my experience and skills.
              If you want to know more about me, feel free to reach out!
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-25 lg:grid-cols-3">
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-600">Years of work experience</dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-800">
                  <Counter number={5} />
                </dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-600">Degree of education</dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-800">Masters</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-600">Field of study</dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-800">
                  Computer Science
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
