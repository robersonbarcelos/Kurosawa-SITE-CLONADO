"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Wrap each word in a masked span without destroying nested markup. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const inners: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        const text = child.nodeValue ?? "";
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (part === "") return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const mask = document.createElement("span");
          mask.className = "reveal-line";
          const inner = document.createElement("span");
          inner.textContent = part;
          mask.appendChild(inner);
          frag.appendChild(mask);
          inners.push(inner);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        const e = child as HTMLElement;
        if (e.tagName === "BR" || e.classList.contains("reveal-line")) return;
        walk(e);
      }
    });
  };
  walk(el);
  return inners;
}

export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>(".fade-up").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      document.body.classList.add("is-loaded");
    };
    if (reduce) {
      revealAll();
      return;
    }

    const ctx = gsap.context(() => {
      document.body.classList.add("is-loaded");

      /* Hero load-in */
      const kicker = document.querySelector(".hero-kicker");
      const name = document.querySelector(".hero-name");
      if (kicker && name) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        gsap.set(kicker, { yPercent: 110, opacity: 0 });
        gsap.set(name, { yPercent: 110, opacity: 0 });
        tl.to(kicker, { yPercent: 0, opacity: 1, duration: 0.8 }, 0.15);
        tl.to(name, { yPercent: 0, opacity: 1, duration: 1 }, 0.3);
        tl.from(".hero-tag, .hero-blurb, .hero-actions", { opacity: 0, y: 22, duration: 0.8, stagger: 0.08 }, 0.7);
        tl.from(".hero-status, .hero-place, .hero-scroll", { opacity: 0, duration: 0.7, stagger: 0.08 }, 1.1);
      }

      /* Split-word heading reveals */
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const spans = splitWords(el);
        if (!spans.length) return;
        gsap.set(spans, { yPercent: 120 });
        gsap.to(spans, {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      /* Fade-ups */
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      /* Counters */
      gsap.utils.toArray<HTMLElement>("[data-value]").forEach((el) => {
        const target = parseFloat(el.dataset.value ?? "");
        if (Number.isNaN(target)) return;
        const suffix = el.dataset.suffix ?? "";
        const c = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(c, {
              v: target,
              duration: 1,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.floor(c.v) + suffix;
              },
            }),
        });
      });

      /* Magnetic buttons */
      if (fine) {
        document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
          const mx = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
          const my = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
          btn.addEventListener("mousemove", (e) => {
            const r = btn.getBoundingClientRect();
            mx((e.clientX - r.left - r.width / 2) * 0.28);
            my((e.clientY - r.top - r.height / 2) * 0.28);
          });
          btn.addEventListener("mouseleave", () => {
            mx(0);
            my(0);
          });
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
