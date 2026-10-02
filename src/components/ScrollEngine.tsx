"use client";

import { useEffect } from "react";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const outExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const PIN_RUNWAY = 1;
const PIN_HOLD = 0.35;
const STACK_RUNWAY = 1;
const STACK_HOLD = 0.55;

/**
 * Scroll-driven choreography: nav state, progress bar, hero parallax,
 * pinned horizontal case track, stacking experience cards, custom cursor.
 */
export function ScrollEngine() {
  useEffect(() => {
    const q = <T extends Element>(s: string) => document.querySelector<T>(s);
    const qa = <T extends Element>(root: ParentNode, s: string) =>
      Array.from(root.querySelectorAll<T>(s));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const nav = q<HTMLElement>("#site-nav");
    const progress = q<HTMLElement>(".scroll-progress-fill");
    const heroWrap = q<HTMLElement>(".hero-wrap");
    const heroBg = q<HTMLElement>(".hero-bg");
    const heroInner = q<HTMLElement>(".hero-inner");
    const heroFades = qa<HTMLElement>(document, "[data-hero-fade]");
    const pinWrap = q<HTMLElement>(".pin-wrap");
    const track = q<HTMLElement>(".htrack");
    const hcards = track ? qa<HTMLElement>(track, ".hcard") : [];
    const pinDots = qa<HTMLElement>(document, ".pin-dots i");
    const pinCount = q<HTMLElement>(".pin-count");
    const pinHint = q<HTMLElement>(".pin-hint");
    const stackWrap = q<HTMLElement>(".stack-wrap");
    const stackItems = stackWrap ? qa<HTMLElement>(stackWrap, ".stack-item") : [];

    let vh = 0;
    let vw = 0;
    let stacked = false;
    let heroTop = 0;
    let pinTop = 0;
    let stackTop = 0;

    const pinRunway = (n: number) => vh * n * PIN_RUNWAY;
    const stackRunway = (n: number) => vh * ((n - 1) * STACK_RUNWAY + 0.35);

    function measure() {
      vh = Math.max(560, window.innerHeight);
      vw = window.innerWidth;
      stacked = vw <= 900;

      if (heroWrap) heroWrap.style.height = stacked ? "" : vh * 1.8 + "px";
      if (pinWrap && hcards.length) {
        pinWrap.style.height = stacked
          ? ""
          : pinRunway(hcards.length) + vh + vh * PIN_HOLD + "px";
        if (stacked && track) track.style.transform = "";
      }
      if (stackWrap && stackItems.length) {
        stackWrap.style.height = stacked
          ? ""
          : stackRunway(stackItems.length) + vh + vh * STACK_HOLD + "px";
      }
      const sy = window.scrollY;
      if (heroWrap) heroTop = heroWrap.getBoundingClientRect().top + sy;
      if (pinWrap) pinTop = pinWrap.getBoundingClientRect().top + sy;
      if (stackWrap) stackTop = stackWrap.getBoundingClientRect().top + sy;
    }

    function render() {
      const y = window.scrollY;

      nav?.classList.toggle("is-scrolled", y > 50);

      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;
      }

      if (heroWrap && !stacked && !reduceMotion) {
        const hp = clamp((y - heroTop) / vh, 0, 1);
        if (heroBg) heroBg.style.transform = `translateY(${(y - heroTop) * 0.18}px)`;
        if (heroInner) heroInner.style.transform = `translateY(${-(y - heroTop) * 0.09}px)`;
        heroFades.forEach((el) => (el.style.opacity = String(clamp(1 - hp * 3.2, 0, 1))));
      } else if (heroWrap) {
        if (heroBg) heroBg.style.transform = "";
        if (heroInner) heroInner.style.transform = "";
        heroFades.forEach((el) => (el.style.opacity = ""));
      }

      if (pinWrap && track && hcards.length) {
        if (stacked) {
          hcards.forEach((c) => c.classList.add("on"));
        } else {
          const runway = pinRunway(hcards.length);
          const into = clamp(y - pinTop, 0, runway);
          const p = runway > 0 ? into / runway : 0;
          const travel = Math.max(0, track.scrollWidth - vw);
          track.style.transform = `translateX(${-p * travel}px)`;

          const active = Math.min(hcards.length - 1, Math.round(p * (hcards.length - 1)));
          hcards.forEach((c, i) => c.classList.toggle("on", i === active));
          pinDots.forEach((d, i) => d.classList.toggle("on", i === active));
          if (pinCount) {
            pinCount.textContent =
              String(active + 1).padStart(2, "0") + " / " + String(hcards.length).padStart(2, "0");
          }
          if (pinHint) pinHint.style.opacity = p < 0.04 ? "1" : "0";
        }
      }

      if (stackWrap && stackItems.length) {
        if (stacked) {
          stackItems.forEach((it) => it.classList.add("on"));
        } else {
          const sInto = Math.max(0, y - stackTop);
          const idx = Math.min(stackItems.length - 1, Math.floor(sInto / vh));
          stackItems.forEach((item, i) => {
            const raw = (sInto - i * vh) / vh;
            const prog = clamp(raw, 0, 1);
            if (raw <= -0.02) {
              item.style.transform = "translateY(105%)";
              item.style.opacity = "0";
            } else if (prog < 0.35) {
              const e = outExpo(prog / 0.35);
              item.style.transform = `translateY(${(1 - e) * 100}%)`;
              item.style.opacity = String(clamp(prog * 4, 0, 1));
            } else {
              const behind = Math.max(0, sInto / vh - i - 0.35);
              const scale = Math.max(0.86, 1 - behind * 0.05);
              item.style.transform = `translateY(${-behind * 30}px) scale(${scale})`;
              item.style.opacity = "1";
            }
            item.classList.toggle("on", i === idx);
          });
        }
      }
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        render();
        ticking = false;
      });
    };
    const onResize = () => {
      measure();
      render();
    };

    measure();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    document.fonts?.ready.then(onResize);

    /* ---- Cursor ---- */
    let raf = 0;
    let onMove: ((e: MouseEvent) => void) | null = null;
    let onOver: ((e: MouseEvent) => void) | null = null;
    let onOut: ((e: MouseEvent) => void) | null = null;
    if (finePointer && !reduceMotion) {
      const dot = q<HTMLElement>("#cursor");
      const ring = q<HTMLElement>("#cursor-ring");
      if (dot && ring) {
        document.body.classList.add("has-cursor");
        let mx = -200,
          my = -200,
          rx = -200,
          ry = -200;
        onMove = (e) => {
          mx = e.clientX;
          my = e.clientY;
        };
        document.addEventListener("mousemove", onMove);
        const loop = () => {
          rx += (mx - rx) * 0.12;
          ry += (my - ry) * 0.12;
          dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
          ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
          raf = requestAnimationFrame(loop);
        };
        loop();
        onOver = (e) => {
          if ((e.target as Element).closest("a, button")) document.body.classList.add("cursor-hot");
        };
        onOut = (e) => {
          if ((e.target as Element).closest("a, button")) document.body.classList.remove("cursor-hot");
        };
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);
      }
    }

    /* ---- Smooth anchors accounting for the fixed nav ---- */
    const anchors = qa<HTMLAnchorElement>(document, 'a[href^="#"]');
    const onAnchor = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const id = a.getAttribute("href") ?? "";
      if (id === "#" || id.length < 2) return;
      const target = id === "#top" ? document.body : q<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      const top = id === "#top" ? 0 : target.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    };
    anchors.forEach((a) => a.addEventListener("click", onAnchor));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      cancelAnimationFrame(raf);
      if (onMove) document.removeEventListener("mousemove", onMove);
      if (onOver) document.removeEventListener("mouseover", onOver);
      if (onOut) document.removeEventListener("mouseout", onOut);
      anchors.forEach((a) => a.removeEventListener("click", onAnchor));
      document.body.classList.remove("has-cursor", "cursor-hot");
    };
  }, []);

  return null;
}
