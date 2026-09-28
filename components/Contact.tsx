"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Words, useWordsZoom, scheduleRefresh } from "./HeaderWords";

gsap.registerPlugin(ScrollTrigger);

/* ==========================================
   EDIT THESE
========================================== */

const EMAIL = "prabhurajagopal.dev@gmail.com";
const GITHUB_URL = "https://github.com/prabhuunn-wq";
const LINKEDIN_URL = "https://linkedin.com/in/prabhu-r-548309162";

/* ==========================================
   SHARED CLASSES
   (transition only colors/shadow, NOT opacity/transform,
   so GSAP scrub animations don't lag)
========================================== */

const hoverTransition =
  "transition-[background-color,border-color,color,box-shadow] duration-300";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 md:bg-black/30 md:backdrop-blur-md lg:py-2.5 " +
  hoverTransition +
  " focus:border-blue-500/50 focus:bg-blue-500/[0.05] focus:ring-1 focus:ring-blue-500/20";

const labelClass =
  "mb-2 block text-xs tracking-wider text-gray-500 lg:mb-1.5";

const primaryLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-6 py-3 text-sm font-medium text-blue-400 opacity-0 " +
  hoverTransition +
  " hover:border-blue-400 hover:bg-blue-500/20 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]";

const secondaryLinkClass =
  "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-300 opacity-0 " +
  hoverTransition +
  " hover:border-white/20 hover:bg-white/10 hover:text-white";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const characterWrapRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Honeypot: real users never see or fill this. Bots often do.
  const [website, setWebsite] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  /* Heading words zoom in from the background, one by one */
  useWordsZoom(headerRef, "top 75%");

  /* ==========================================
     FIT CONTENT TO SCREEN HEIGHT (DESKTOP)
     Scales the content down (never up) so the whole
     contact section fits in one screen.
     GSAP never touches fitRef.
  ========================================== */

  useEffect(() => {
    const el = fitRef.current;

    if (!el) return;

    const TOP_PADDING = 112; // fixed navbar space
    const BOTTOM_PADDING = 24;

    const update = () => {
      if (window.innerWidth < 1024) {
        el.style.removeProperty("--fit");
        return;
      }

      const available = window.innerHeight - TOP_PADDING - BOTTOM_PADDING;
      const natural = el.offsetHeight;

      if (!natural) return;

      const scale = Math.min(1, Math.max(0.6, available / natural));

      el.style.setProperty("--fit", scale.toFixed(3));
    };

    update();

    window.addEventListener("resize", update);
    document.fonts?.ready.then(update);

    /* Form success/error messages change the height */
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  /* ==========================================
     CONTACT ANIMATIONS
  ========================================== */

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;
    const characterWrap = characterWrapRef.current;
    const character = characterRef.current;
    const bubble = bubbleRef.current;
    const buttons = buttonsRef.current;

    if (
      !section ||
      !background ||
      !content ||
      !characterWrap ||
      !character ||
      !bubble ||
      !buttons
    ) {
      return;
    }

    let ctx: gsap.Context | undefined;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            desktop:
              "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
            mobile:
              "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
            reduce: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const { desktop, reduce } = context.conditions as {
              desktop: boolean;
              mobile: boolean;
              reduce: boolean;
            };

            const buttonItems = Array.from(buttons.children);

            /* Reduced motion: show everything, no animation */
            if (reduce) {
              gsap.set([content, character, bubble, ...buttonItems], {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              });
              return;
            }

            /* ==========================================
               BACKGROUND PARALLAX (desktop only)
               Mobile skips it to save GPU work.
            ========================================== */

            if (desktop) {
              gsap.set(background, { scale: 1.08, yPercent: 0 });

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
            }

            /* ==========================================
               INITIAL STATES
               (opacity 0 is already set by the
               "opacity-0" class, so there is no flash
               before hydration)
            ========================================== */

            gsap.set(content, { y: desktop ? 90 : 50 });

            gsap.set(character, {
              x: desktop ? 180 : 0,
              y: desktop ? 20 : 70,
              scale: desktop ? 0.78 : 0.88,
            });

            gsap.set(bubble, { y: -30, scale: 0.85 });

            gsap.set(buttonItems, { y: 25 });

            /* ==========================================
               MAIN CONTENT REVEAL
            ========================================== */

            gsap.to(content, {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                end: "top 42%",
                scrub: 1,
              },
            });

            /* ==========================================
               CHARACTER + BUBBLE
               Trigger is the wrapper (not the character
               itself) so its own transform doesn't shift
               the trigger position.
            ========================================== */

            gsap.to(character, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              ease: "power3.out",
              scrollTrigger: desktop
                ? {
                    trigger: section,
                    start: "top 78%",
                    end: "top 35%",
                    scrub: 1,
                  }
                : {
                    trigger: characterWrap,
                    start: "top 92%",
                    end: "top 58%",
                    scrub: 1,
                  },
            });

            gsap.to(bubble, {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: desktop ? "back.out(1.5)" : "back.out(1.4)",
              scrollTrigger: desktop
                ? {
                    trigger: section,
                    start: "top 58%",
                    end: "top 30%",
                    scrub: 1,
                  }
                : {
                    trigger: characterWrap,
                    start: "top 75%",
                    end: "top 48%",
                    scrub: 1,
                  },
            });

            /* ==========================================
               SOCIAL BUTTONS
            ========================================== */

            gsap.to(buttonItems, {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: buttons,
                start: "top 88%",
                end: "top 58%",
                scrub: 1,
              },
            });
          },
        );

        /* Fonts/images can shift layout; recalc trigger positions */
        document.fonts?.ready.then(scheduleRefresh);
      }, section);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  /* Clear the success timeout on unmount */
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  /* ==========================================
     INPUT HANDLER
  ========================================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ==========================================
     FORM SUBMIT
  ========================================== */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, website }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Contact form error:", err);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Message not sent. Check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#05070b] px-6 py-24 md:px-12 md:py-32 lg:h-screen lg:min-h-0 lg:px-20 lg:pb-6 lg:pt-28"
    >
      {/* ==========================================
          CINEMATIC BACKGROUND
          next/image: optimized, lazy-loaded.
          Tip: convert contact-bg.png to .webp for a much smaller file.
      ========================================== */}

      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-5%] z-0 will-change-transform"
      >
        <Image
          src="/contact-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-black/65" />

      {/* BLUE ATMOSPHERIC GLOW */}
      <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_65%_45%,rgba(37,99,235,0.18),transparent_55%)]" />

      {/* VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.7)_100%)]" />

      {/* LEFT GLOW (desktop only: big blurs are expensive on mobile GPUs) */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] z-3 hidden h-125 w-125 rounded-full bg-blue-500/6 blur-[120px] md:block" />

      {/* RIGHT GLOW (desktop only) */}
      <div className="pointer-events-none absolute bottom-[5%] right-[5%] z-3 hidden h-100 w-100 rounded-full bg-cyan-500/5 blur-[120px] md:block" />

      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 z-4 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-size-[60px_60px] opacity-[0.025]" />

      {/* SECTION NUMBER */}
      <div
        aria-hidden="true"
        className="absolute right-6 top-8 z-10 font-mono text-xs tracking-[0.3em] text-white/20 md:right-12"
      >
        05
      </div>

      {/* ==========================================
          MAIN CONTENT
          contentRef: animated by GSAP (opacity / y)
          fitRef:     scaled to fit screen (CSS only)
      ========================================== */}

      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl opacity-0">
        <div ref={fitRef} className="lg:origin-top lg:scale-[var(--fit,1)]">
          <div className="grid min-h-175 grid-cols-1 items-center gap-16 lg:min-h-0 lg:grid-cols-[55%_45%] lg:gap-8">
            {/* ==========================================
                LEFT SIDE
            ========================================== */}

            <div>
              {/* HEADING: every word zooms in from the background */}

              <div ref={headerRef}>
                <p className="text-xs tracking-[0.35em] text-blue-400 md:text-sm">
                  <Words text="05 — CONTACT" />
                </p>

                <h2 className="mt-5 text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:mt-3 lg:text-6xl">
                  <Words text="Let's" />
                  <br />
                  <span className="text-gray-500">
                    <Words text="Build." />
                  </span>
                </h2>

                <p className="mt-8 max-w-xl text-base leading-7 text-gray-300 md:text-lg lg:mt-4 lg:text-base">
                  <Words text="Have an idea, project or opportunity? Let's connect and build something meaningful with modern technology." />
                </p>
              </div>

              {/* SOCIAL BUTTONS */}

              <div
                ref={buttonsRef}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:mt-6 lg:gap-3"
              >
                <a href={`mailto:${EMAIL}`} className={primaryLinkClass}>
                  Get In Touch
                  <span aria-hidden="true">→</span>
                </a>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryLinkClass}
                >
                  GitHub
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryLinkClass}
                >
                  LinkedIn
                </a>
              </div>

              {/* ==========================================
                  FORM
              ========================================== */}

              <div className="mt-14 lg:mt-8">
                <div className="mb-6 lg:mb-4">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-blue-400">
                    START A CONVERSATION
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-white lg:mt-1 lg:text-xl">
                    Tell me about your project.
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-3">
                  {/* HONEYPOT (hidden from real users) */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  {/* NAME + EMAIL (side by side on desktop) */}
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-3">
                    {/* NAME */}
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        NAME
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className={inputClass}
                      />
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        EMAIL
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      MESSAGE
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me what you're building..."
                      rows={5}
                      required
                      className={inputClass + " resize-none lg:h-24"}
                    />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={sending}
                    className={
                      "group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-blue-500/40 bg-blue-500/10 px-6 py-3.5 text-sm font-medium text-blue-400 lg:py-3 " +
                      hoverTransition +
                      " hover:border-blue-400 hover:bg-blue-500/20 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                  >
                    {sending ? "Sending..." : "Send Message"}

                    {!sending && (
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    )}
                  </button>

                  {/* SUCCESS */}
                  {submitted && (
                    <div
                      role="status"
                      className="rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-sm text-green-400"
                    >
                      Message sent successfully! I&apos;ll get back to you soon.
                    </div>
                  )}

                  {/* ERROR */}
                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
                    >
                      {error}
                    </div>
                  )}
                </form>
              </div>

              {/* EMAIL */}

              <div className="mt-12 lg:mt-5">
                <p className="font-mono text-[10px] tracking-[0.3em] text-gray-600">
                  EMAIL
                </p>

                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-2 inline-block text-sm text-gray-400 transition-colors hover:text-blue-400 lg:mt-1"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            {/* ==========================================
                RIGHT / CHARACTER SIDE
            ========================================== */}

            <div
              ref={characterWrapRef}
              className="relative flex min-h-120 items-center justify-center lg:min-h-0"
            >
              {/* CHARACTER GLOW (desktop only) */}
              <div className="pointer-events-none absolute bottom-[15%] hidden h-70 w-70 rounded-full bg-blue-500/10 blur-[80px] md:block" />

              {/* SPEECH BUBBLE */}

              <div
                ref={bubbleRef}
                className="absolute right-[5%] top-[4%] z-30 w-60 rounded-2xl border border-blue-400/20 bg-[#10131b]/95 p-5 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:right-0 md:w-70 md:bg-[#10131b]/90 md:backdrop-blur-xl lg:top-0 lg:w-64 lg:p-4"
              >
                <p className="font-mono text-[10px] tracking-[0.25em] text-blue-400">
                  PRABHU R
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-300 lg:mt-2 lg:text-[13px]">
                  Ready to turn ideas into real-world applications.
                </p>

                <div className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 border-b border-r border-blue-400/20 bg-[#10131b]" />
              </div>

              {/* CHARACTER */}

              <div
                ref={characterRef}
                className="relative z-20 mt-24 h-120 w-70 opacity-0 sm:h-125 sm:w-72 md:h-137.5 md:w-[320px] lg:mt-20 lg:h-105 lg:w-60"
              >
                <Image
                  src="/character.webp"
                  alt="Prabhu R"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 300px, 240px"
                  className="object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)]"
                />
              </div>
            </div>
          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between lg:mt-6 lg:pt-4">
            <p className="font-mono text-[10px] tracking-[0.2em] text-gray-600">
              PRABHU R — FULL-STACK DEVELOPER
            </p>

            <p className="font-mono text-[10px] tracking-[0.2em] text-gray-700">
              © 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}