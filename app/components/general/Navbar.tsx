"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathDebounce = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const initialHash = window.location.hash;
    if (initialHash) {
      const el = document.querySelector(initialHash);
      if (el) el.scrollIntoView();
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = [
        { id: "experience", path: "/#experience" },
        { id: "education", path: "/#education" },
        { id: "tech-stack", path: "/#tech-stack" },
      ];

      let current = { id: "home", path: "/" };
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - 30) {
          current = section;
        }
      }

      setIsDark(darkSections.has(current.id));
      if (pathDebounce.current) clearTimeout(pathDebounce.current);
      pathDebounce.current = setTimeout(() => {
        router.replace(current.path, { scroll: false });
      }, 150);
    };
    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (pathDebounce.current) clearTimeout(pathDebounce.current);
    };
  }, [router]);

  // close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (contactsRef.current && !contactsRef.current.contains(e.target as Node)) {
        setContactsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside, { passive: true });
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setContactsOpen(false);
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
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
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

        {/* Contact dropdown (desktop) */}
        <div ref={contactsRef} className="relative">
          <button
            onClick={() => setContactsOpen((v) => !v)}
            className="text-sm tracking-widest uppercase transition-colors duration-300 cursor-pointer text-zinc-400 hover:text-zinc-600"
          >
            Contacts
          </button>
          {contactsOpen && (
            <div className="absolute right-0 mt-3 text-right flex flex-col gap-1 py-2 min-w-[130px]">
              {contacts.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={() => setContactsOpen(false)}
                  className="text-sm tracking-widest uppercase py-1 transition-colors duration-200 text-zinc-400 hover:text-zinc-600"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile hamburger */}
      <div ref={menuRef} className="md:hidden relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`text-xl transition-colors duration-300 ${textClass}`}
        >
          ☰
        </button>
        {menuOpen && (
          <div
            className={`absolute right-0 mt-3 flex flex-col gap-1 py-3 px-5 rounded-lg shadow-lg min-w-[160px] text-right ${isDark ? "bg-zinc-800 border border-white/10" : "bg-white border border-zinc-100"}`}
          >
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`text-sm tracking-widest uppercase py-1 transition-colors duration-200 ${textClass}`}
              >
                {label}
              </Link>
            ))}
            <div className="my-1 border-t border-zinc-200" />
            {contacts.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase py-1 transition-colors duration-200 text-zinc-400 hover:text-zinc-600"
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
