"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = ["UI", "API", "DATABASE", "DEPLOYMENT"];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".about-text", {
          autoAlpha: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });

        gsap.from(".about-step", {
          autoAlpha: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-steps",
            start: "top 75%",
            once: true,
          },
        });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-black px-8 py-20 text-white md:flex-row md:px-24"
    >
      <div className="about-text flex-1">
        <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">
          01 / About
        </p>
        <h2 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          From banking operations to building full-stack applications.
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-gray-400">
          I&apos;m Prabhu R, a Full-Stack Developer who enjoys turning ideas
          into scalable, real-world web applications — from UI design to
          backend architecture and database management.
        </p>
      </div>

      <div className="about-steps flex flex-1 items-center justify-center">
        <div className="flex flex-col gap-6 text-center md:text-left">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className="about-step rounded-xl border border-gray-700 px-6 py-4 text-lg tracking-wide"
            >
              {i + 1}. {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}