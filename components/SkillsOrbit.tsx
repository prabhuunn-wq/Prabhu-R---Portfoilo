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

    /* ==========================================
       ORBIT ROTATION
    ========================================== */

    const animation = gsap.to(orbit, {
      rotation: 360,
      duration: 28,
      repeat: -1,
      ease: "none",
    });

    /* ==========================================
       PAUSE WHEN OFF SCREEN
    ========================================== */

    const observer = new IntersectionObserver(
      ([entry]) => {
        animation.paused(!entry.isIntersecting);
      },
      {
        rootMargin: "100px 0px",
      },
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
      className="
        relative mx-auto
        h-[390px] w-full
        max-w-[430px]
        sm:h-[430px]
        sm:max-w-[520px]
        md:h-[560px]
        md:max-w-[700px]
      "
    >
      {/* ==========================================
          CENTER BLUE GLOW
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-56 w-56
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-[55px]
          sm:h-72 sm:w-72
          md:block md:h-100 md:w-100 md:blur-[80px]
        "
      />

      {/* ==========================================
          OUTER ORBIT RING
      ========================================== */}

      <div
        className="
          absolute left-1/2 top-1/2
          h-[310px] w-[310px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          border border-blue-500/20
          shadow-[0_0_40px_rgba(59,130,246,0.08)]
          sm:h-[360px] sm:w-[360px]
          md:h-[500px] md:w-[500px]
        "
      />

      {/* ==========================================
          MIDDLE ORBIT RING
      ========================================== */}

      <div
        className="
          absolute left-1/2 top-1/2
          h-[260px] w-[260px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          border border-blue-400/10
          sm:h-[310px] sm:w-[310px]
          md:h-[420px] md:w-[420px]
        "
      />

      {/* ==========================================
          INNER ORBIT RING
      ========================================== */}

      <div
        className="
          absolute left-1/2 top-1/2
          h-[190px] w-[190px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          border border-white/5
          sm:h-[230px] sm:w-[230px]
          md:h-[300px] md:w-[300px]
        "
      />

      {/* ==========================================
          ROTATING SKILLS
      ========================================== */}

      <div
        ref={orbitRef}
        className="
          absolute left-1/2 top-1/2
          z-20
          h-[310px] w-[310px]
          -translate-x-1/2 -translate-y-1/2
          will-change-transform

          [--radius:150px]

          sm:h-[360px] sm:w-[360px]
          sm:[--radius:175px]

          md:h-[500px] md:w-[500px]
          md:[--radius:225px]
        "
      >
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          const angle = (360 / skills.length) * index;

          return (
            <div
              key={skill.name}
              className="
                absolute left-1/2 top-1/2
                -translate-x-1/2
                -translate-y-1/2
              "
              style={{
                transform: `
                  rotate(${angle}deg)
                  translateY(calc(var(--radius) * -1))
                  rotate(-${angle}deg)
                `,
              }}
            >
              <div className="group flex flex-col items-center">
                {/* Skill icon */}

                <div
                  className="
                    flex
                    h-11 w-11
                    items-center justify-center
                    rounded-full
                    border border-blue-500/30
                    bg-[#0b101b]/95
                    shadow-[0_0_22px_rgba(59,130,246,0.12)]
                    transition-[border-color,box-shadow]
                    duration-300

                    sm:h-13 sm:w-13

                    md:h-18 md:w-18
                    md:shadow-[0_0_30px_rgba(59,130,246,0.12)]

                    group-hover:border-blue-400/70
                    group-hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="
                      h-5 w-5
                      sm:h-6 sm:w-6
                      md:h-9 md:w-9
                    "
                    style={{
                      color: skill.color,
                    }}
                  />
                </div>

                {/* Skill name */}

                <span
                  className="
                    mt-1.5
                    whitespace-nowrap
                    text-[9px]
                    font-medium
                    text-gray-400

                    sm:mt-2
                    sm:text-[10px]

                    md:text-xs
                  "
                >
                  {skill.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==========================================
          CENTER CHARACTER
      ========================================== */}

      <div
        className="
          absolute left-1/2 top-1/2
          z-20
          h-[210px] w-[145px]
          -translate-x-1/2 -translate-y-1/2

          sm:h-[260px] sm:w-[175px]

          md:h-96 md:w-60
        "
      >
        {/* Character glow */}

        <div
          className="
            pointer-events-none
            absolute left-1/2 top-1/2
            h-40 w-40
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-blue-500/10
            blur-[45px]

            sm:h-48 sm:w-48

            md:h-64 md:w-64
            md:blur-[50px]
          "
        />

        <Image
          src="/character.webp"
          alt="Prabhu R"
          width={1024}
          height={1536}
          sizes="
            (max-width: 640px) 145px,
            (max-width: 768px) 175px,
            240px
          "
          className="
            relative z-10
            h-full w-full
            object-contain object-center
            drop-shadow-[0_0_25px_rgba(59,130,246,0.18)]
          "
        />
      </div>

      {/* ==========================================
          CENTER LABEL
      ========================================== */}

      <div
        className="
          absolute
          left-1/2
          bottom-[-8px]
          z-30
          -translate-x-1/2
          whitespace-nowrap
          rounded-full
          border border-blue-500/30
          bg-[#08090d]/90
          px-4 py-2
          font-mono
          text-[8px]
          tracking-[0.25em]
          text-blue-400
          shadow-[0_0_20px_rgba(59,130,246,0.1)]

          sm:bottom-[-10px]
          sm:px-5
          sm:py-2.5
          sm:text-[9px]

          md:bottom-[-13.5px]
          md:px-6
          md:py-2.5
          md:text-[10px]
          md:tracking-[0.3em]
        "
      >
        FULL-STACK DEVELOPER
      </div>
    </div>
  );
}