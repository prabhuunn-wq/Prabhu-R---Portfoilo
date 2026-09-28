"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsOrbit = dynamic(() => import("./SkillsOrbit"), {
  ssr: false,
});

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [showOrbit, setShowOrbit] = useState(false);

  /* ==========================================
     LOAD ORBIT WHEN NEAR VIEWPORT
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
      {
        rootMargin: "500px 0px",
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* ==========================================
     REFRESH SCROLLTRIGGER AFTER ORBIT LOAD
  ========================================== */

  useEffect(() => {
    if (showOrbit) {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [showOrbit]);

  /* ==========================================
     GSAP ANIMATIONS
  ========================================== */

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        /* Background */

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

        /* Title */

        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 80,
          },
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

        /* Orbit */

        gsap.fromTo(
          orbitRef.current,
          {
            opacity: 0,
            scale: 0.65,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "top top",
              scrub: 1,
            },
          },
        );

        /* Bottom hint */

        gsap.fromTo(
          hintRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              end: "top 10%",
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
      className="
        relative min-h-screen overflow-hidden
        bg-[#08090d]
        px-5 pb-16 pt-28
        sm:px-6

        md:flex md:h-screen md:min-h-205 md:flex-col
        md:px-20 md:pb-8 md:pt-28
      "
    >
      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div
        ref={bgRef}
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          will-change-transform
        "
      >
        <Image
          src="/skills-background.png"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#03060d]/60" />

        {/* Center glow */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.12),transparent_42%)]
          "
        />

        {/* Top fade */}
        <div
          className="
            absolute inset-x-0 top-0
            h-32
            bg-linear-to-b from-[#08090d] to-transparent
            md:h-40
          "
        />

        {/* Bottom fade */}
        <div
          className="
            absolute inset-x-0 bottom-0
            h-40
            bg-linear-to-t from-[#08090d] to-transparent
            md:h-48
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]
          "
        />
      </div>

      {/* ==========================================
          SECTION TITLE
      ========================================== */}

      <div
        ref={titleRef}
        className="
          relative z-10 mx-auto
          w-full
          max-w-5xl
          text-center
          md:mx-auto md:shrink-0
          md:text-left
        "
      >
        <p className="text-[11px] tracking-[0.35em] text-blue-400 sm:text-sm">
          02 — SKILLS
        </p>

        <h2
          className="
            mt-3
            text-4xl font-bold leading-[0.95]
            text-white
            sm:text-5xl
            md:mt-3 md:text-6xl
            lg:text-7xl
          "
        >
          My Tech
          <br />
          <span className="text-gray-500">Stack.</span>
        </h2>

        <p
          className="
            mx-auto mt-5
            max-w-[310px]
            text-sm leading-6
            text-gray-400
            sm:max-w-xl sm:text-base
            md:mx-0 md:mt-4
          "
        >
          Technologies I use to design, build, animate and deploy modern web
          applications.
        </p>
      </div>

      {/* ==========================================
          ORBIT
          Desktop: takes all remaining height, orbit centered in it
      ========================================== */}

      <div
        ref={orbitRef}
        className="
          relative z-10
          mx-auto
          -mt-2
          flex
          min-h-[420px]
          w-full
          items-center
          justify-center
          sm:min-h-[440px]

          md:mt-0
          md:min-h-0
          md:flex-1
        "
      >
        <div
          className="
            w-full
            scale-[0.90]
            sm:scale-[0.90]
            md:scale-[0.85]
            lg:scale-[0.92]
          "
        >
          {showOrbit && <SkillsOrbit />}
        </div>
      </div>

      {/* ==========================================
          BOTTOM HINT
      ========================================== */}

      <div
        ref={hintRef}
        className="
          relative z-20
          mx-auto
          mt-2
          w-full
          max-w-5xl
          text-center
          md:mt-0
          md:shrink-0
          md:text-left
        "
      >
        <p
          className="
            text-[9px]
            tracking-[0.25em]
            text-gray-600
            sm:text-[10px]
            md:text-xs
          "
        >
          SCROLL TO EXPLORE PROJECTS

          <span
            aria-hidden="true"
            className="ml-2 text-blue-500 sm:ml-3"
          >
            ↓
          </span>
        </p>
      </div>
    </section>
  );
}