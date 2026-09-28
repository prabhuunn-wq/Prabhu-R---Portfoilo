"use client";

import { useEffect, useState } from "react";

const navItems = [
  { name: "Hero", id: "hero" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  /* ==========================================
     ACTIVE SECTION
  ========================================== */

  useEffect(() => {
    const updateActiveSection = () => {
      const triggerPoint = window.innerHeight * 0.35;

      let currentSection = "hero";

      for (const item of navItems) {
        const section = document.getElementById(item.id);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= triggerPoint) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  /* ==========================================
     NAVIGATION
     Desktop = unchanged
     Mobile = small offset for fixed navbar
  ========================================== */

  const handleNavigation = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    setMenuOpen(false);

    requestAnimationFrame(() => {
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY;

      /*
        MOBILE ONLY:
        Keep section slightly below fixed navbar.

        Desktop remains exactly the same.
      */
      const mobileOffset = window.innerWidth < 768 ? 80 : 0;

      window.scrollTo({
        top: Math.max(0, sectionTop - mobileOffset),
        behavior: "smooth",
      });
    });
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-3 py-3 md:px-8 md:py-4">
      <div
        className="
          mx-auto flex max-w-7xl items-center justify-between
          rounded-2xl border border-white/10
          bg-black/60
          px-4 py-3
          shadow-2xl
          backdrop-blur-xl
          md:px-5 md:py-3
        "
      >
        {/* ==========================================
            LOGO
        ========================================== */}

        <button
          type="button"
          onClick={() => handleNavigation("hero")}
          className="group flex items-center gap-2"
        >
          <span
            className="
              text-base font-bold tracking-[0.2em] text-white
              transition-colors duration-300
              group-hover:text-blue-400
              md:text-lg
            "
          >
            PRABHU
          </span>

          <span className="text-base font-bold tracking-[0.2em] text-blue-500 md:text-lg">
            R
          </span>

          <span className="ml-1 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)] md:h-2 md:w-2" />
        </button>

        {/* ==========================================
            DESKTOP NAVIGATION
            md and above = same design
        ========================================== */}

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-400"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.name}

                {isActive && (
                  <span
                    className="
                      absolute bottom-1 left-1/2
                      h-0.5 w-5
                      -translate-x-1/2
                      rounded-full
                      bg-blue-500
                      shadow-[0_0_8px_rgba(59,130,246,0.9)]
                    "
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ==========================================
            MOBILE MENU BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            relative flex h-9 w-9
            items-center justify-center
            rounded-xl border border-white/10
            bg-white/5
            md:hidden
          "
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* ==========================================
          MOBILE NAVIGATION
      ========================================== */}

      <div
        className={`
          mx-3 mt-2
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-black/95
          backdrop-blur-xl
          transition-all duration-300
          md:hidden
          ${
            menuOpen
              ? "max-h-96 translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }
        `}
      >
        <div className="flex flex-col p-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`
                  flex items-center justify-between
                  rounded-xl
                  px-4 py-3
                  text-left text-sm
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <span>{item.name}</span>

                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}