"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/gsap/gsapConfig";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHoveredProject, setIsHoveredProject] = useState(false);
  const [isHoveredInteractive, setIsHoveredInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast quickTo instances for GPU-accelerated cursor following
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Global listener for data-cursor or interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest("[data-cursor='view']");
      if (projectTarget) {
        setIsHoveredProject(true);
        setCursorText("VIEW");
        return;
      }

      const interactive = target.closest("a, button, [role='button'], input, textarea, .interactive-magnetic");
      if (interactive) {
        setIsHoveredInteractive(true);
        setIsHoveredProject(false);
        setCursorText("");
      } else {
        setIsHoveredInteractive(false);
        setIsHoveredProject(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  return (
    <>
      {/* Central exact cursor dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHoveredProject ? "0px" : "6px",
          height: isHoveredProject ? "0px" : "6px",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease, width 0.2s ease, height 0.2s ease",
        }}
      />

      {/* Trailing context-aware cursor ring / badge */}
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHoveredProject ? "88px" : isHoveredInteractive ? "48px" : "28px",
          height: isHoveredProject ? "88px" : isHoveredInteractive ? "48px" : "28px",
          borderRadius: "50%",
          backgroundColor: isHoveredProject ? "rgba(255, 255, 255, 0.95)" : "transparent",
          border: isHoveredProject ? "none" : "1px solid rgba(255, 255, 255, 0.4)",
          backdropFilter: isHoveredInteractive ? "invert(10%)" : "none",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: isHoveredProject ? "difference" : "normal",
          transition:
            "opacity 0.25s ease, width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease",
        }}
      >
        {isHoveredProject && (
          <span
            ref={textRef}
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#000000",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            {cursorText}
          </span>
        )}
      </div>

      <style jsx>{`
        @media (pointer: coarse) {
          .custom-cursor-dot,
          .custom-cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
