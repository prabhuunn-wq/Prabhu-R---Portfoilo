"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleRefresh } from "./HeaderWords";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "TaskFlow",
    subtitle: "Project Management App",
    description:
      "A Jira/Trello-style project management application with Kanban workflow, drag & drop and secure authentication.",
    explanation:
      "I built TaskFlow to manage projects with Kanban boards, drag & drop and secure JWT authentication.",
    stack: [
      "React",
      "Redux Toolkit",
      "MUI",
      "dnd-kit",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],
    liveUrl: "https://taskflow-app-zeta-seven.vercel.app/",
    githubUrl: "https://github.com/prabhuunn-wq/taskflow",
  },

  {
    number: "02",
    title: "Uzhavan-Harvest",
    subtitle: "Agricultural Delivery Platform",
    description:
      "A multi-portal agricultural delivery platform connecting customers, administrators and delivery partners.",
    explanation:
      "Uzhavan-Harvest connects customers, admins and delivery partners through a complete agricultural delivery workflow.",
    stack: [
      "React",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Cloudinary",
      "Inngest",
    ],
    liveUrl: "https://uzhavan-harvest1.vercel.app/",
    githubUrl: "https://github.com/prabhuunn-wq/Uzhavan-Harvest1",
  },

  {
    number: "03",
    title: "InsightForge",
    subtitle: "Survey Builder & Analytics",
    description:
      "A Typeform-style survey builder with live analytics, multiple question types, sharing, QR support and export functionality.",
    explanation:
      "InsightForge lets users create surveys, collect responses and understand results through live analytics.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],
    liveUrl: "https://insight-forge-h3x2.vercel.app/",
    githubUrl: "https://github.com/prabhuunn-wq/InsightForge",
  },

  {
    number: "04",
    title: "SnapCart",
    subtitle: "E-Commerce Application",
    description:
      "A full-stack e-commerce application with authentication, cart, wishlist, product catalog and Razorpay payments.",
    explanation:
      "SnapCart is a full-stack e-commerce experience with authentication, cart, wishlist and online payments.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Razorpay",
    ],
    liveUrl: "https://snapkart-ecommerce.vercel.app/",
    githubUrl: "https://github.com/prabhuunn-wq/snapkart-ecommerce",
  },
];

/* ==========================================
    SPLIT TEXT INTO WORDS
    Each word gets the "header-word" class so
    GSAP can zoom them in one by one.
========================================== */

const Words = ({ text }: { text: string }) => (
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

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const charactersRef = useRef<(HTMLDivElement | null)[]>([]);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);

  /* ==========================================
      CARD HOVER (unchanged)
  ========================================== */

  const handleCardMouseMove = (
    e: MouseEvent<HTMLDivElement>,
    card: HTMLDivElement,
  ) => {
    if (window.innerWidth < 768) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 8;
    const rotateX = (y / rect.height - 0.5) * -8;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.015,
      transformPerspective: 1200,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardMouseLeave = (card: HTMLDivElement) => {
    if (window.innerWidth < 768) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
  };

  /* ==========================================
      GSAP
  ========================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let ctx: gsap.Context | undefined;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        /* ======================================
            CINEMATIC BACKGROUND PARALLAX
        ====================================== */

        if (backgroundRef.current) {
          gsap.fromTo(
            backgroundRef.current,
            {
              scale: 1.05,
              y: -30,
            },
            {
              scale: 1.15,
              y: 70,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            },
          );
        }

        /* ======================================
            HEADER: words zoom in from the
            background, one by one
        ====================================== */

        if (headerRef.current) {
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
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            },
          );
        }

        /* ======================================
            PROJECT CARDS
        ====================================== */

        cardsRef.current.forEach((card, index) => {
          const character = charactersRef.current[index];
          const bubble = bubblesRef.current[index];

          if (!card || !character || !bubble) return;

          /* CARD REVEAL */

          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 120,
              scale: 0.94,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 45%",
                scrub: 1,
              },
            },
          );

          /* CHARACTER ENTRANCE: appears first, right alongside
             the card reveal, before the bubble pops in */

          gsap.fromTo(
            character,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 55%",
                scrub: 1,
              },
            },
          );

          /* SPEECH BUBBLE: appears after the character */

          gsap.fromTo(
            bubble,
            {
              opacity: 0,
              scale: 0.8,
              y: 20,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: card,
                start: "top 65%",
                end: "top 45%",
                scrub: 1,
              },
            },
          );

          /* CHARACTER SCROLL MOVEMENT */

          gsap.to(character, {
            y: -25,
            opacity: 0.8,
            scale: 0.96,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "bottom 55%",
              end: "bottom 20%",
              scrub: 1,
            },
          });
        });

        /* Fonts/images can shift layout; recalc trigger positions */
        document.fonts?.ready.then(scheduleRefresh);
      }, section);
    });

    /* Recalculate trigger positions once the page has fully loaded */
    const refresh = scheduleRefresh;

    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#05070b] px-6 py-32 md:px-20 md:py-20"
    >
      {/* ==========================================
          CINEMATIC BACKGROUND
          next/image: optimized + lazy-loaded (was a CSS background).
          Tip: convert projects-bg.png to .webp for a much smaller file.
      ========================================== */}

      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/projects-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />
      </div>

      {/* BACKGROUND DARK OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-[#05070b]/65" />

      {/* CINEMATIC GRADIENT */}
      <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_50%_45%,rgba(0,100,255,0.16),transparent_45%)]" />

      {/* TOP DARK FADE */}
      <div className="pointer-events-none absolute left-0 top-0 z-3 h-48 w-full bg-linear-to-b from-[#05070b] to-transparent" />

      {/* BOTTOM DARK FADE */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-3 h-56 w-full bg-linear-to-t from-[#05070b] to-transparent" />

      {/* BACKGROUND BLUE GLOWS (desktop only: big blurs are costly on mobile GPUs) */}
      <div className="pointer-events-none absolute left-1/2 top-[15%] z-4 hidden h-175 w-175 -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[140px] md:block" />

      <div className="pointer-events-none absolute -left-50 top-[55%] z-4 hidden h-125 w-125 rounded-full bg-blue-500/4 blur-[120px] md:block" />

      {/* ==========================================
          HEADER
          Every word is wrapped in a span.header-word
          and zooms in from the background.
      ========================================== */}

      <div ref={headerRef} className="relative z-10 mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.35em] text-blue-400">
          <Words text="03 — PROJECTS" />
        </p>

        <h2 className="mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-white md:mt-3 md:text-5xl lg:text-6xl">
          <Words text="Things I've" />
          <br />
          <span className="text-gray-500">
            <Words text="Built." />
          </span>
        </h2>

        <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 md:mt-4 md:text-sm">
          <Words text="Real-world applications built across frontend, backend, databases and third-party integrations." />
        </p>
      </div>

      {/* ==========================================
          PROJECT STORY
      ========================================== */}

      <div className="relative z-10 mx-auto mt-24 max-w-6xl space-y-32 md:mt-10 md:space-y-14">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            onMouseMove={(e) => {
              const card = cardsRef.current[index];

              if (card) {
                handleCardMouseMove(e, card);
              }
            }}
            onMouseLeave={() => {
              const card = cardsRef.current[index];

              if (card) {
                handleCardMouseLeave(card);
              }
            }}
            className="project-card group relative min-h-162.5 overflow-visible rounded-3xl border border-white/10 bg-[#0d1017]/95 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)] will-change-transform md:min-h-0 md:bg-[#0d1017]/90 md:p-8 md:backdrop-blur-sm"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* CARD GLOW (desktop only) */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[100px] transition-colors duration-700 group-hover:bg-blue-500/12 md:block" />

            {/* BIG NUMBER */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-5 text-[70px] font-bold leading-none text-white/4 sm:top-6 sm:text-[100px] md:right-6 md:top-4 md:text-[90px]"
            >
              {project.number}
            </div>

            {/* GRID */}
            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] opacity-20" />

            {/* ==========================================
                CONTENT GRID
                Character is order-1 and info is order-2 at
                every breakpoint, so the layout is identical
                on mobile and desktop.
            ========================================== */}

            <div className="relative z-10 grid min-h-160 grid-cols-1 gap-12 md:min-h-0 md:grid-cols-[36%_64%] md:items-center md:gap-6">
              {/* CHARACTER SIDE: always first */}

              <div className="relative order-1 flex min-h-125 items-end justify-center md:min-h-0">
                {/* CHARACTER STAGE: bubble stacked above the character */}

                <div className="relative flex w-full max-w-70 flex-col items-center justify-end gap-6 md:gap-3">
                  {/* SPEECH BUBBLE */}

                  <div
                    ref={(el) => {
                      bubblesRef.current[index] = el;
                    }}
                    className="relative z-30 w-65 rounded-2xl border border-blue-500/20 bg-[#10131b]/95 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.55)] sm:w-70 md:w-60 md:p-3 md:backdrop-blur-xl lg:w-64"
                  >
                    {/* Bubble header */}

                    <div className="mb-3 flex items-center gap-2 md:mb-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.9)]" />

                      <span className="text-[10px] font-medium tracking-[0.25em] text-blue-400">
                        PRABHU EXPLAINS
                      </span>
                    </div>

                    <p className="text-[10px] tracking-[0.2em] text-gray-500">
                      PROJECT {project.number}
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white md:text-sm">
                      {project.title}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-gray-300 md:mt-1.5 md:text-xs md:leading-5">
                      {project.explanation}
                    </p>

                    {/* Bubble pointer */}
                    <div className="absolute -bottom-2 left-8 h-5 w-5 rotate-45 border-b border-r border-blue-500/20 bg-[#10131b]" />
                  </div>

                  {/* CHARACTER: fixed aspect-ratio box so space is
                      reserved before the image loads (no layout jump) */}

                  <div
                    ref={(el) => {
                      charactersRef.current[index] = el;
                    }}
                    className="relative z-20 w-44 sm:w-48 md:w-28 lg:w-32"
                    style={{ aspectRatio: "1024 / 1536" }}
                  >
                    <Image
                      src="/character.webp"
                      alt={`Prabhu explaining ${project.title}`}
                      fill
                      sizes="(max-width: 640px) 176px, (max-width: 768px) 192px, 176px"
                      className="relative z-10 object-contain object-bottom opacity-100 drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
                    />

                    {/* Character glow */}
                    <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-24 w-44 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
                  </div>
                </div>
              </div>

              {/* PROJECT INFORMATION: always second */}

              <div className="order-2 flex flex-col justify-center">
                {/* Project label */}

                <p className="text-xs tracking-[0.3em] text-blue-400">
                  PROJECT {project.number}
                </p>

                {/* Title */}

                <h3 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl md:mt-2 md:text-4xl lg:text-5xl">
                  {project.title}
                </h3>

                {/* Subtitle */}

                <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-1.5 md:text-base">
                  {project.subtitle}
                </p>

                {/* Description */}

                <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base md:mt-4 md:text-sm md:leading-6">
                  {project.description}
                </p>

                {/* TECH STACK */}

                <div className="mt-8 md:mt-5">
                  <p className="mb-4 text-[10px] tracking-[0.3em] text-gray-600 md:mb-3">
                    TECHNOLOGY
                  </p>

                  <div className="flex flex-wrap gap-2.5 md:gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[11px] text-gray-400 transition-colors duration-300 group-hover:border-blue-500/30 group-hover:text-gray-200 sm:px-4 sm:py-2 sm:text-xs md:px-3 md:py-1 md:text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PROJECT LINKS */}

                <div className="mt-8 flex flex-wrap gap-3 md:mt-5 md:gap-2.5">
                  {/* Live Project */}

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-3 rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-400 transition-[background-color,border-color,color,box-shadow] duration-300 hover:border-blue-400 hover:bg-blue-500/20 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] sm:px-6 sm:py-3 md:px-4 md:py-2 md:text-[13px]"
                  >
                    <span>Live Project</span>

                    <FiExternalLink
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-1"
                    />
                  </a>

                  {/* GitHub */}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/github inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 transition-[background-color,border-color,color] duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-6 sm:py-3 md:px-4 md:py-2 md:text-[13px]"
                  >
                    <FaGithub
                      size={17}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/github:scale-110"
                    />

                    <span>GitHub</span>
                  </a>
                </div>

                {/* PROJECT INDICATOR */}

                <div className="mt-10 flex items-center gap-4 md:mt-5">
                  <span className="h-px w-12 bg-blue-500 transition-[width] duration-500 group-hover:w-20" />

                  <span className="text-xs tracking-[0.3em] text-gray-500">
                    {project.number} / 04
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-blue-500 transition-transform duration-300 group-hover:translate-x-2"
                  >
                    →
                  </span>
                </div>
              </div>
            </div>

            {/* BOTTOM BLUE LINE */}
            <div className="absolute bottom-0 left-0 h-px w-0 bg-blue-500 transition-[width] duration-700 group-hover:w-full" />
          </div>
        ))}
      </div>

      {/* ==========================================
          BOTTOM HINT
      ========================================== */}

      <div className="relative z-10 mx-auto mt-28 max-w-6xl md:mt-12">
        <p className="text-xs tracking-[0.3em] text-gray-600">
          SCROLL TO CONTINUE
          <span aria-hidden="true" className="ml-3 text-blue-500">
            ↓
          </span>
        </p>
      </div>
    </section>
  );
}