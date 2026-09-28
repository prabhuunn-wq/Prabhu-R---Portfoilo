"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const bankingRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  /* ==========================================
     ANIMATIONS (unchanged)
  ========================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      !backgroundRef.current ||
      !characterRef.current ||
      !bubbleRef.current ||
      !bankingRef.current ||
      !transitionRef.current ||
      !techRef.current
    ) {
      return;
    }

    let ctx: gsap.Context | undefined;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const background = backgroundRef.current;
        const character = characterRef.current;
        const bubble = bubbleRef.current;
        const banking = bankingRef.current;
        const transition = transitionRef.current;
        const tech = techRef.current;

        if (
          !background ||
          !character ||
          !bubble ||
          !banking ||
          !transition ||
          !tech
        ) {
          return;
        }

        const mm = gsap.matchMedia();

        mm.add(
          {
            isDesktop: "(min-width: 1024px)",
            isMobile: "(max-width: 1023px)",
          },
          (context) => {
            const { isDesktop } = context.conditions as {
              isDesktop: boolean;
              isMobile: boolean;
            };

            /* ==========================================
               BACKGROUND CINEMATIC MOTION
            ========================================== */

            gsap.set(background, {
              scale: 1.08,
              yPercent: 0,
            });

            gsap.to(background, {
              yPercent: -8,
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            });

            /* ==========================================
               DESKTOP STORYTELLING
            ========================================== */

            if (isDesktop) {
              gsap.set(character, {
                x: -180,
                opacity: 0,
                scale: 0.8,
              });

              gsap.set(bubble, {
                opacity: 0,
                y: -20,
                scale: 0.9,
              });

              gsap.set(banking, {
                opacity: 0,
                x: 100,
              });

              gsap.set(transition, {
                opacity: 0,
                x: 120,
              });

              gsap.set(tech, {
                opacity: 0,
                y: 40,
              });

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: "+=2200",
                  scrub: 1,
                  pin: true,
                  anticipatePin: 1,
                },
              });

              /* Character enters FIRST, fully */

              tl.to(character, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
              });

              /* Speech bubble appears ONLY after character has fully entered */

              tl.to(bubble, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "back.out(1.4)",
              });

              /* Banking experience appears */

              tl.to(
                banking,
                {
                  opacity: 1,
                  x: 0,
                  duration: 1,
                  ease: "power3.out",
                },
                "-=0.2",
              );

              /* Character moves */

              tl.to(character, {
                x: -80,
                scale: 0.9,
                duration: 1,
                ease: "power2.inOut",
              });

              /* Bubble fades out along with the character move so it doesn't
                 linger awkwardly over the shrinking character */

              tl.to(
                bubble,
                {
                  opacity: 0,
                  y: -10,
                  scale: 0.9,
                  duration: 0.6,
                  ease: "power2.inOut",
                },
                "<",
              );

              /* Banking fades */

              tl.to(
                banking,
                {
                  opacity: 0.25,
                  x: -80,
                  duration: 0.8,
                  ease: "power2.inOut",
                },
                "<",
              );

              /* Transition appears */

              tl.to(
                transition,
                {
                  opacity: 1,
                  x: 0,
                  duration: 1,
                  ease: "power3.out",
                },
                "-=0.4",
              );

              /* Character returns */

              tl.to(
                character,
                {
                  x: 0,
                  scale: 0.95,
                  duration: 1,
                  ease: "power2.inOut",
                },
                "-=0.7",
              );

              /* Technology stack appears */

              tl.to(
                tech,
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "power3.out",
                },
                "-=0.3",
              );
            }

            /* ==========================================
               MOBILE
            ========================================== */

            else {
              gsap.set([character, bubble, banking, transition, tech], {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                clearProps: "all",
              });

              gsap.from(character, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: character,
                  start: "top 85%",
                  once: true,
                },
              });

              gsap.from(bubble, {
                opacity: 0,
                y: 20,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: bubble,
                  start: "top 85%",
                  once: true,
                },
              });

              gsap.from(banking, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: banking,
                  start: "top 85%",
                  once: true,
                },
              });

              gsap.from(transition, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: transition,
                  start: "top 85%",
                  once: true,
                },
              });

              gsap.from(tech, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: tech,
                  start: "top 90%",
                  once: true,
                },
              });
            }
          },
        );

        /* Fonts/images can shift layout; recalc trigger positions */
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      }, section);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#05070b] px-6 py-20 md:px-12 lg:px-20"
    >
      {/* ==========================================
          CINEMATIC BACKGROUND
          next/image: optimized + lazy-loaded.
          Tip: convert experience-bg.png to .webp for a much smaller file.
      ========================================== */}

      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-5%] z-0 will-change-transform"
      >
        <Image
          src="/experience-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />
      </div>

      {/* DARK CINEMATIC OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-black/60" />

      {/* BLUE ATMOSPHERIC GLOW */}
      <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.18),transparent_55%)]" />

      {/* CINEMATIC VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />

      {/* EXTRA BLUE GLOWS (desktop only: big blurs are costly on mobile GPUs) */}
      <div className="pointer-events-none absolute left-[10%] top-[20%] z-3 hidden h-125 w-125 rounded-full bg-blue-500/6 blur-[120px] md:block" />

      <div className="pointer-events-none absolute bottom-[10%] right-[10%] z-3 hidden h-100 w-100 rounded-full bg-cyan-500/4 blur-[120px] md:block" />

      {/* SECTION NUMBER */}
      <div
        aria-hidden="true"
        className="absolute right-6 top-8 z-10 font-mono text-xs tracking-[0.3em] text-white/20 md:right-12"
      >
        04
      </div>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* HEADING */}

        <div className="mb-12 md:mb-16">
          <p className="text-xs tracking-[0.35em] text-blue-400 md:text-sm">
            04 — EXPERIENCE
          </p>

          <h2 className="mt-4 text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
            My
            <br />
            <span className="text-gray-500">Journey.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
            A journey from banking operations to building modern full-stack
            applications.
          </p>
        </div>

        {/* STORYTELLING AREA */}

        <div className="grid min-h-162.5 grid-cols-1 gap-10 lg:grid-cols-[38%_62%] lg:gap-16">
          {/* CHARACTER SIDE */}

          <div className="relative flex flex-col-reverse items-center justify-center gap-6 lg:block lg:min-h-0 lg:pt-20">
            {/* Character */}

            <div
              ref={characterRef}
              className="relative z-20 h-72 w-44 sm:h-96 sm:w-56 md:h-107.5 md:w-62.5 lg:h-125 lg:w-72.5"
            >
              <Image
                src="/character.webp"
                alt="Prabhu R"
                fill
                sizes="(max-width: 640px) 176px, (max-width: 768px) 250px, 290px"
                className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Speech Bubble: sits above the character's head */}

            <div
              ref={bubbleRef}
              className="relative z-30 w-[85%] max-w-62.5 lg:absolute lg:left-1/2 lg:-top-17.5 lg:right-auto lg:w-75 lg:max-w-none lg:-translate-x-1/2"
            >
              <div className="relative rounded-2xl border border-blue-400/20 bg-[#10131b]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] md:bg-[#10131b]/90 md:backdrop-blur-xl">
                {/* Bubble pointer */}
                <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-blue-400/20 bg-[#10131b]" />

                <p className="font-mono text-[10px] tracking-[0.25em] text-blue-400">
                  PRABHU R
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  I started my professional journey in banking, working with
                  customers and handling day-to-day banking operations.
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT SIDE */}

          <div className="relative flex flex-col justify-center">
            {/* BANKING EXPERIENCE */}

            <div
              ref={bankingRef}
              className="rounded-3xl border border-white/10 bg-black/40 p-7 md:bg-black/30 md:p-10 md:backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs tracking-[0.25em] text-blue-400">
                    PROFESSIONAL EXPERIENCE
                  </p>

                  <h3 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                    Assistant Manager
                  </h3>

                  <p className="mt-2 text-lg text-gray-400">
                    Kotak Mahindra Bank
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="font-mono text-4xl font-bold text-white/10 md:text-6xl"
                >
                  01
                </span>
              </div>

              <div className="mt-8 h-px bg-white/10" />

              <p className="mt-7 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                Worked in customer relationship management and banking
                operations, handling customer requirements and day-to-day
                banking processes.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  "Customer Relationship Management",
                  "Banking Operations",
                  "Customer Service",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* TRANSITION */}

            <div
              ref={transitionRef}
              className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7 md:p-10 md:backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs tracking-[0.25em] text-blue-400">
                    THE TRANSITION
                  </p>

                  <h3 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                    From Banking
                    <br />
                    <span className="text-gray-500">to Technology.</span>
                  </h3>
                </div>

                <span
                  aria-hidden="true"
                  className="font-mono text-4xl font-bold text-blue-400/10 md:text-6xl"
                >
                  02
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                Developed my skills in modern web technologies and moved
                towards full-stack development, building real-world
                applications across frontend, backend and databases.
              </p>

              {/* TECHNOLOGY STACK */}

              <div ref={techRef} className="mt-8">
                <p className="mb-4 font-mono text-[10px] tracking-[0.25em] text-gray-500">
                  CURRENT TECHNOLOGY STACK
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    "React",
                    "TypeScript",
                    "Next.js",
                    "Node.js",
                    "MongoDB",
                    "PostgreSQL",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs text-blue-300 transition-[background-color,border-color] duration-300 hover:border-blue-400/50 hover:bg-blue-500/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM HINT */}

        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-white/10" />

          <p className="font-mono text-[10px] tracking-[0.25em] text-gray-500">
            KEEP SCROLLING
          </p>

          <div className="h-px w-12 bg-white/10" />
        </div>
      </div>
    </section>
  );
}