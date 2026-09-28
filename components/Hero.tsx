"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleRefresh } from "./HeaderWords";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
      },
      (context) => {
        const { desktop, mobile } = context.conditions!;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: desktop ? "bottom top" : "+=100%",
            scrub: 0.6,
            snap: {
              snapTo: [0, 1],
              duration: {
                min: 0.2,
                max: 0.6,
              },
              delay: 0.05,
              ease: "power2.out",
            },
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /* =========================
           DESKTOP
        ========================= */

        if (desktop) {
          // Character movement
          tl.to(
            charRef.current,
            {
              x: -220,
              y: 40,
              scale: 0.72,
              rotate: -4,
              ease: "none",
            },
            0,
          );

          // Hero text exit
          tl.to(
            heroTextRef.current,
            {
              opacity: 0,
              x: -120,
              ease: "none",
            },
            0,
          );

          // Scroll hint fade out
          tl.to(
            scrollHintRef.current,
            {
              opacity: 0,
              ease: "none",
            },
            0,
          );

          // About enters
          tl.fromTo(
            aboutRef.current,
            {
              opacity: 0,
              x: 150,
              y: 40,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              ease: "none",
            },
            0.35,
          );
        }

        /* =========================
           MOBILE
        ========================= */

        if (mobile) {
          // Character
          tl.to(
            charRef.current,
            {
              x: 0,
              y: 35,
              scale: 0.6,
              rotate: -2,
              ease: "none",
            },
            0,
          );

          // Hero text
          tl.to(
            heroTextRef.current,
            {
              opacity: 0,
              y: -90,
              ease: "none",
            },
            0,
          );

          // Scroll hint fade out
          tl.to(
            scrollHintRef.current,
            {
              opacity: 0,
              ease: "none",
            },
            0,
          );

          // About
          tl.fromTo(
            aboutRef.current,
            {
              opacity: 0,
              x: 35,
              y: 80,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              ease: "none",
            },
            0.45,
          );
        }
      },
      sectionRef,
    );

    // One shared, debounced refresh (instead of one per section)
    document.fonts?.ready.then(scheduleRefresh);
    window.addEventListener("load", scheduleRefresh);

    return () => {
      window.removeEventListener("load", scheduleRefresh);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#08090d]"
    >
      {/* ==========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Background image */}
        <Image
          src="/hero-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Blue atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(37,99,235,0.12),transparent_38%)]" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#03060d] to-transparent" />
      </div>

      {/* ==========================================================
          HERO TEXT
          Outer wrapper = position only (no GSAP)
          Inner div     = animated by GSAP (no Tailwind translate)
          Mobile: wrapper spans top 0 → 62%, content centered => center at 31%
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-0
          z-10
          flex
          h-[62%]
          flex-col
          justify-center

          sm:left-8
          sm:h-[64%]

          md:left-20
          md:h-full
        "
      >
        <div ref={heroTextRef} className="pointer-events-auto">
          {/* Small intro */}
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gray-400 sm:text-sm">
            Hi, I&apos;m
          </p>

          {/* Name */}
          <h1
            className="
              text-5xl
              font-bold
              tracking-tight
              text-white

              sm:text-6xl

              md:text-7xl
              lg:text-7xl
            "
          >
            PRABHU <span className="text-blue-500">R</span>
          </h1>

          {/* Role */}
          <p
            className="
              mt-3
              text-lg
              text-gray-300

              sm:text-xl

              md:mt-4
              md:text-2xl
            "
          >
            Full-Stack Developer
          </p>

          {/* Resume */}
          <a
            href="/Prabhu_R_Resume.pdf"
            download
            className="
              mt-7
              inline-flex
              w-fit
              items-center
              gap-3
              rounded-full
              border
              border-blue-500/40
              bg-blue-500/10
              px-6
              py-3
              text-sm
              font-medium
              text-blue-400
              transition-[background-color,border-color,color,box-shadow]
              duration-300
              hover:border-blue-400
              hover:bg-blue-500/20
              hover:text-blue-300
              hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]
            "
          >
            <span>Download Resume</span>

            <span aria-hidden="true" className="text-lg">
              ↓
            </span>
          </a>

          {/* Description */}
          <p
            className="
              mt-4
              max-w-77.5
              text-sm
              leading-6
              text-gray-400

              sm:max-w-md
              sm:text-base

              md:mt-5
              md:leading-relaxed
            "
          >
            I build scalable web applications from UI to backend and database.
          </p>
        </div>
      </div>

      {/* ==========================================================
          CHARACTER
          Outer wrapper = position only (no GSAP)
          Inner div     = animated by GSAP
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-20
          flex
          justify-center

          md:inset-x-auto
          md:right-[15%]
          md:block
          md:w-96

          lg:w-105
        "
      >
        <div
          ref={charRef}
          className="
            w-64

            sm:w-72

            md:w-full
          "
        >
          <Image
            src="/character.webp"
            alt="Prabhu R"
            width={1024}
            height={1536}
            preload
            fetchPriority="high"
            sizes="(max-width: 640px) 260px,(max-width: 1024px) 384px,450px"
            className="
              h-auto
              w-full
              object-contain
              drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]
            "
          />
        </div>
      </div>

      {/* ==========================================================
          ABOUT CONTENT
          Desktop: full-height flex column, content centered
          (no Tailwind translate, GSAP owns the transform)
      ========================================================== */}

      <div
        ref={aboutRef}
        className="
          absolute
          left-4
          top-[18%]
          z-10
          w-[calc(100%-2rem)]
          opacity-0

          sm:left-6
          sm:top-[20%]
          sm:w-[calc(100%-3rem)]

          md:left-auto
          md:right-20
          md:top-0
          md:flex
          md:h-full
          md:w-107.5
          md:flex-col
          md:justify-center
        "
      >
        {/* Label */}
        <p
          className="
            mb-3
            text-[10px]
            tracking-[0.3em]
            text-blue-400

            sm:mb-4
            sm:text-xs
          "
        >
          01 — ABOUT ME
        </p>

        {/* Heading */}
        <h2
          className="
            text-[32px]
            font-bold
            leading-[1.08]
            tracking-tight
            text-white

            sm:text-4xl

            md:text-5xl
          "
        >
          From ideas
          <br />
          to digital
          <br />
          solutions.
        </h2>

        {/* Description */}
        <p
          className="
            mt-4
            max-w-[320px]
            text-[13px]
            leading-5
            text-gray-400

            sm:mt-5
            sm:max-w-82.5
            sm:text-sm
            sm:leading-6

            md:max-w-82.5
            md:text-base
            md:leading-7
          "
        >
          I&apos;m a Full-Stack Developer focused on building real-world web
          applications with modern technologies.
        </p>

        {/* Tech stack */}
        <div
          className="
            mt-5
            flex
            max-w-82.5
            flex-wrap
            gap-2

            sm:mt-6
            sm:gap-2.5
          "
        >
          {[
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "PostgreSQL",
          ].map((skill) => (
            <span
              key={skill}
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-3
                py-1.5
                text-[10px]
                text-gray-300

                sm:px-4
                sm:py-2
                sm:text-xs

                md:text-sm
              "
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Scroll hint */}
        <p
          className="
            mt-5
            text-[9px]
            tracking-[0.25em]
            text-gray-600

            sm:mt-7
            sm:text-[10px]

            md:text-xs
          "
        >
          SCROLL TO CONTINUE
        </p>
      </div>

      {/* ==========================================================
          SCROLL INDICATOR
          Wrapper is static; inner div is faded by GSAP
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-6
          z-30
          flex
          justify-center

          md:bottom-8
        "
      >
        <div
          ref={scrollHintRef}
          className="flex flex-col items-center gap-1.5 text-gray-500"
        >
          <span className="text-[10px] tracking-[0.3em] sm:text-xs">
            SCROLL
          </span>

          <span
            aria-hidden="true"
            className="animate-bounce text-lg sm:text-xl"
          >
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}