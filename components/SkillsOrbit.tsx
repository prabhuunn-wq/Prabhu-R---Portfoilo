"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiThreedotjs,
  SiGreensock,
  SiMongodb,
} from "react-icons/si";

const skills = [
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "#FFFFFF",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
  },
  {
    name: "Three.js",
    icon: SiThreedotjs,
    color: "#FFFFFF",
  },
  {
    name: "GSAP",
    icon: SiGreensock,
    color: "#88CE02",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
  },
];

export default function SkillsOrbit() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const orbit = orbitRef.current;

    if (!wrapper || !orbit) return;

    /* Rotation (unchanged) */
    const animation = gsap.to(orbit, {
      rotation: 360,
      duration: 28,
      repeat: -1,
      ease: "none",
    });

    /* Only spin while the orbit is on screen (saves CPU/GPU when scrolled away).
       It resumes from the same angle, so the motion looks identical. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        animation.paused(!entry.isIntersecting);
      },
      { rootMargin: "100px 0px" },
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      animation.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto h-140 w-full max-w-175 sm:h-150"
    >
      {/* =========================
          BACKGROUND GLOW (desktop only)
      ========================== */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px] md:block" />

      {/* =========================
          OUTER ORBIT RING
      ========================== */}

      <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.08)]" />

      {/* =========================
          MIDDLE ORBIT RING
      ========================== */}

      <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/10" />

      {/* =========================
          INNER ORBIT RING
      ========================== */}

      <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

      {/* =========================
          ROTATING SKILLS
      ========================== */}

      <div
        ref={orbitRef}
        className="absolute left-1/2 top-1/2 z-20 h-75 w-75 -translate-x-1/2 -translate-y-1/2 will-change-transform [--radius:130px] sm:h-100 sm:w-100 sm:[--radius:180px] md:h-125 md:w-125 md:[--radius:230px]"
      >
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          const angle = (360 / skills.length) * index;

          return (
            <div
              key={skill.name}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(calc(var(--radius) * -1)) rotate(-${angle}deg)`,
              }}
            >
              {/* Skill Logo */}
              <div className="group flex flex-col items-center">
                {/* No backdrop-blur here: blur on 9 constantly rotating
                    layers is very expensive. A more opaque bg looks the same. */}
                <div className="flex h-13 w-13 items-center justify-center rounded-full border border-blue-500/30 bg-[#0b101b]/95 shadow-[0_0_30px_rgba(59,130,246,0.12)] transition-[border-color,box-shadow] duration-300 group-hover:border-blue-400/70 group-hover:shadow-[0_0_35px_rgba(59,130,246,0.35)] sm:h-15 sm:w-15 md:h-18 md:w-18">
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9"
                    style={{ color: skill.color }}
                  />
                </div>

                <span className="mt-2 whitespace-nowrap text-xs font-medium text-gray-400">
                  {skill.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CENTER CHARACTER */}
      <div className="absolute left-1/2 top-1/2 z-20 h-52 w-36 -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-48 md:h-96 md:w-60">
        {/* Character glow (desktop only) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[50px] sm:h-56 sm:w-56 md:block md:h-64 md:w-64" />

        <Image
          src="/character.webp"
          alt="Prabhu R"
          width={1024}
          height={1536}
          sizes="(max-width: 640px) 144px, (max-width: 768px) 190px, 240px"
          className="relative z-10 h-full w-full object-contain object-center drop-shadow-[0_0_30px_rgba(59,130,246,0.18)]"
        />
      </div>

      {/* =========================
          CENTER LABEL
      ========================== */}

      <div className="absolute -bottom-13.5 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue-500/30 bg-[#08090d]/90 px-6 py-2.5 font-mono text-[10px] tracking-[0.3em] text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.1)] backdrop-blur-md">
        FULL-STACK DEVELOPER
      </div>
    </div>
  );
}