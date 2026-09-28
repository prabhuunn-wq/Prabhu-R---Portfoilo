"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Don't recalculate everything when the mobile address bar shows/hides
ScrollTrigger.config({ ignoreMobileResize: true });

export default function ScrollTriggerRefresh() {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    // Debounced so several triggers (load + fonts) cause only one refresh
    const refresh = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    if (document.readyState === "complete") refresh();

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}