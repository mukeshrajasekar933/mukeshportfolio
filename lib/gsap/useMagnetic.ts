"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion } from "./gsapConfig";

interface MagneticOptions {
  strength?: number;
  ease?: string;
  duration?: number;
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T | null>(null);
  const { strength = 0.35, ease = "power2.out", duration = 0.5 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration, ease });
    const yTo = gsap.quickTo(el, "y", { duration, ease });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      xTo(distanceX);
      yTo(distanceY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      xTo(0);
      yTo(0);
    };
  }, [strength, ease, duration]);

  return ref;
}
