"use client";

import { useEffect, useRef, useState } from "react";
import { experiences } from "../data/WorkExperienceData";

export default function WorkExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ghostY, setGhostY] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const active = refs.current[activeIndex];
    const section = sectionRef.current;
    if (!active || !section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const cardTop = active.getBoundingClientRect().top + window.scrollY;
    const cardCenter = cardTop + active.offsetHeight / 2;
    setGhostY(cardCenter - sectionTop);
  }, [activeIndex]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.7 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 w-full bg-zinc-800 overflow-hidden">
      {/* Background ghost year — tracks active card position */}
      <span
        className="pointer-events-none select-none absolute text-[14rem] font-bold leading-none text-white/[0.06] transition-all duration-700 -translate-y-1/2"
        style={{
          top: ghostY,
          left: activeIndex % 2 === 0 ? "52%" : "2%",
        }}
      >
        {Object.values(experiences)[activeIndex].date.match(/\d{4}/)?.[0]}
      </span>

      <p className="text-4xl font-light tracking-[0.3em] text-white/80 px-20 pb-10">
        WORK EXPERIENCE
      </p>

      {/* Central Line */}
      <div className="absolute left-1/2 top-40 h-350 w-[1px] bg-white/10 transform -translate-x-1/2" />

      <div className="mt-20 space-y-32 px-20">
        {Object.values(experiences).map((exp, index) => {
          const isLeft = index % 2 === 0;
          const isActive = index === activeIndex;
          const year = exp.date.match(/\d{4}/)?.[0];

          return (
            <div
              key={index}
              ref={(el) => {
                refs.current[index] = el;
              }}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Dot */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10 border transition-all duration-300
                  ${isActive ? "bg-white border-white scale-125" : "bg-transparent border-white/30"}`}
              />

              {/* Year beside dot */}
              <span
                className={`absolute left-1/2 -translate-x-1/2 mt-7 text-xs tracking-widest transition-all duration-300
                  ${isActive ? "text-white/60" : "text-white/20"}`}
                style={{ top: "100%", marginTop: "0.5rem" }}
              >
                {year}
              </span>

              {/* Card */}
              <div
                className={`w-[45%] p-6 rounded-xl border transition-all duration-500
                  ${isLeft ? "mr-auto text-right" : "ml-auto text-left"}
                  ${
                    isActive
                      ? "bg-white/8 border-white/20 opacity-100 scale-100"
                      : "bg-transparent border-white/5 opacity-40 scale-95"
                  }`}
              >
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <p className="italic text-white/50 text-sm mt-1">{exp.company}</p>
                <p className="text-xs text-white/30 mt-1 tracking-wide">{exp.date}</p>
                <p className="mt-3 text-[1rem] text-white/60 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
