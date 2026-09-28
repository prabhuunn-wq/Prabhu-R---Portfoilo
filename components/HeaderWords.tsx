"use client";

import { Fragment, useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Many sections ask for a refresh at the same time; run it only once. */
let refreshTimer: ReturnType<typeof setTimeout> | undefined;

export const scheduleRefresh = () => {
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
};

/* ==========================================
    <Words text="Things I've" />
    Splits text into words. Each word is a
    span.header-word that starts hidden (opacity-0).
========================================== */

export const Words = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, i, arr) => (
      <Fragment key={`${word}-${i}`}>
        <span className="header-word inline-block opacity-0 will-change-transform">
          {word}
        </span>
        {i < arr.length - 1 ? " " : null}
      </Fragment>
    ))}
  </>
);

/* ==========================================
    useWordsZoom(headerRef)
    Words inside headerRef zoom in from the
    background, one by one, when the header
    scrolls into view. Works on desktop + mobile.
========================================== */

export function useWordsZoom(
  ref: RefObject<HTMLElement | null>,
  start = "top 80%",
) {
  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const words = el.querySelectorAll(".header-word");

    /* Reduced motion: just show the words */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".header-word",
        {
          opacity: 0,
          scale: 0.3,
          filter: "blur(12px)",
          transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    /* One shared, debounced refresh (instead of one per section) */
    scheduleRefresh();
    document.fonts?.ready.then(scheduleRefresh);

    return () => {
      ctx.revert();
    };
  }, [ref, start]);
}