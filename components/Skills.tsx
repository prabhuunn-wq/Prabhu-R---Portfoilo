"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Orbit code is split out of the main bundle and only loaded when needed
const SkillsOrbit = dynamic(() => import("./SkillsOrbit"), { ssr: false });

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [showOrbit, setShowOrbit] = useState(false);

  /* ==========================================
     MOUNT THE ORBIT ONLY WHEN IT'S NEAR THE VIEWPORT
     (starts loading 500px before it's visible)
  ========================================== */

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowOrbit(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* Orbit may change the page height once it mounts */
  useEffect(() => {
    if (showOrbit) ScrollTrigger.refresh();
  }, [showOrbit]);

  /* ==========================================
     ANIMATIONS (unchanged)
  ========================================== */

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          bgRef.current,
          {
            scale: 1.08,
            y: -30,
          },
          {
            scale: 1,
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );

        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          orbitRef.current,
          { opacity: 0, scale: 0.65, y: 100 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "center center",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          hintRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center 70%",
              end: "center 50%",
              scrub: 1,
            },
          },
        );
      }, sectionRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#08090d] px-6 pb-24 pt-32 md:px-20 md:py-32"
    >
      {/* ==========================================
          CINEMATIC SKILLS BACKGROUND
          next/image: optimized + lazy-loaded (was a CSS background).
          Tip: convert skills-background.png to .webp for a smaller file.
      ========================================== */}

      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      >
        {/* Background image */}
        <Image
          src="/skills-background.png"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-[#03060d]/60" />

        {/* Center blue atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.12),transparent_42%)]" />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#08090d] to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#08090d] to-transparent" />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Section title */}
      <div
        ref={titleRef}
        className="relative z-10 mx-auto max-w-5xl text-center md:text-left"
      >
        <p className="text-sm tracking-[0.35em] text-blue-400">
          02 — SKILLS
        </p>

        <h2 className="mt-4 text-5xl font-bold leading-[0.95] text-white md:text-7xl">
          My Tech
          <br />
          <span className="text-gray-500">Stack.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-gray-400 md:mx-0">
          Technologies I use to design, build, animate and deploy modern web
          applications.
        </p>
      </div>

      {/* 3D / Orbit area (space is reserved by min-h so nothing jumps) */}
      <div
        ref={orbitRef}
        className="relative z-10 mx-auto -mt-2 flex min-h-125 items-center justify-center md:-mt-8"
      >
        <div className="scale-[0.88] md:scale-[0.92]">
          {showOrbit && <SkillsOrbit />}
        </div>
      </div>

      {/* Bottom hint */}
      <div
        ref={hintRef}
        className="relative z-20 mx-auto mt-10 max-w-5xl text-center md:mt-6 md:text-left"
      >
        <p className="text-xs tracking-[0.3em] text-gray-600">
          SCROLL TO EXPLORE PROJECTS
          <span aria-hidden="true" className="ml-3 text-blue-500">
            ↓
          </span>
        </p>
      </div>
    </section>
  );
}