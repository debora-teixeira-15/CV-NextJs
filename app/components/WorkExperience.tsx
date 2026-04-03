"use client";

import { useEffect, useRef, useState } from "react";
import { experiences } from "../data/WorkExperienceData";

export default function WorkExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          threshold: 0.7,
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section className="relative py-20 w-full bg-white">
      <p className="text-lg tracking-[0.3em] text-gray-500 px-20">WORK EXPERIENCE</p>

      {/* Central Line */}
      <div className=" absolute left-1/2 top-30 h-350 w-[2px] bg-gray-300 transform -translate-x-1/2" />
      <div className="mt-20 space-y-32 px-20">
        {Object.values(experiences).map((exp, index) => {
          const isLeft = index % 2 === 0;
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              ref={(el) => {
                refs.current[index] = el;
              }}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Ball */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10
                ${isActive ? "bg-black scale-125" : "bg-gray-400"}
                transition-all duration-200`}
              />

              {/* Card */}
              <div
                className={`w-[45%] p-6 rounded-xl shadow-md bg-white transition-all duration-500
                ${isLeft ? "mr-auto text-right" : "ml-auto text-left"}
                ${isActive ? "opacity-100 scale-100" : "opacity-50 scale-90"}`}
              >
                <h3 className="text-2xl font-semibold text-gray-900">{exp.title}</h3>
                <p className="italic text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-400">{exp.date}</p>
                <p className="mt-2 text-md font-sans text-gray-700">{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
