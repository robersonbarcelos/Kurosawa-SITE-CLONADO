"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="nav" id="site-nav">
      <a href="#top" className="nav-logo" aria-label="Home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mark" src="/images/logo-mark.svg" alt="" />
        <span>Studio</span>
      </a>
      <ul className={`nav-links${open ? " is-open" : ""}`} id="nav-links">
        {navLinks.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={l.active ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Let&apos;s talk →
          </a>
        </li>
      </ul>
      <button
        className="nav-toggle"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
