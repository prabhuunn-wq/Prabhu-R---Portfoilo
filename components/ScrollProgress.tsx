"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const ratio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

      // Transform only: no React re-render, no layout work
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    // Page height changes on resize and when pinned sections/images load
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("load", requestUpdate);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-100 h-0.5 w-full bg-white/5"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] will-change-transform"
      />
    </div>
  );
}