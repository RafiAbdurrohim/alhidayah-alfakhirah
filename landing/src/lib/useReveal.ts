"use client";

import { useEffect } from "react";

/**
 * Attaches IntersectionObserver to all `.reveal` elements
 * and adds `.visible` class when they enter the viewport.
 *
 * Usage: call useReveal() once in a layout or page component.
 */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Unobserve after reveal so it doesn't re-trigger
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
