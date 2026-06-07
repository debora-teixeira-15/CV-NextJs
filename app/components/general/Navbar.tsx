"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contacts } from "@/app/data/ContactsData";

const links = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Tech Stack", href: "#tech-stack" },
];

const darkSections = new Set(["experience", "tech-stack"]);

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialHash = window.location.hash;
    if (initialHash) {
      const el = document.querySelector(initialHash);
      if (el) el.scrollIntoView();
    }

    const handleScroll = () => {
      const navY = 20;
      const sectionIds = ["home", "experience", "education", "tech-stack"];
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= navY) {
          current = id;
        }
      }
      setIsDark(darkSections.has(current));
      const el = document.getElementById(current);
      const path = current === "home" ? "/" : (el?.getAttribute("data-path") ?? "/");
      window.history.replaceState(null, "", path);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside, { passive: true });
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textClass = isDark ? "text-white/70 hover:text-white" : "text-zinc-800 hover:text-zinc-900";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center gap-10 px-5 py-4">
      {links.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          onClick={(e) => handleClick(e, href)}
          className={`text-sm tracking-widest uppercase transition-colors duration-300 ${textClass}`}
        >
          {label}
        </Link>
      ))}

      {/* Contact dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className={`text-sm tracking-widest uppercase transition-colors duration-300 cursor-pointer text-zinc-400 hover:text-zinc-600`}
        >
          Contacts
        </button>
        {dropdownOpen && (
          <div
            className={`absolute right-0 mt-3 text-right flex flex-col gap-1 py-2 min-w-[130px]`}
          >
            {contacts.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => setDropdownOpen(false)}
                className={`text-sm tracking-widest uppercase py-1 transition-colors duration-200 text-zinc-400 hover:text-zinc-600`}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
