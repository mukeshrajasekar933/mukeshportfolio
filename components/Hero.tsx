"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, Code2, Sparkles, GraduationCap, Box, Terminal } from "lucide-react";
import styles from "./Hero.module.css";
import { registerGSAP, isReducedMotion } from "@/lib/gsap/gsapConfig";
import Navbar from "./Navbar";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const fullStackRef = useRef<HTMLHeadingElement | null>(null);
  const developerRef = useRef<HTMLHeadingElement | null>(null);
  const statementRef = useRef<HTMLDivElement | null>(null);
  const badgesRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    const isReduced = isReducedMotion();

    const ctx = gsap.context(() => {
      // 1. Setup initial states for cinematic reveal
      if (!isReduced) {
        const fullStackWords = fullStackRef.current?.querySelectorAll(`.${styles.word}`) || [];
        gsap.set(fullStackWords, {
          y: "120%",
          opacity: 0,
          rotateX: 45,
        });

        gsap.set(developerRef.current, {
          x: 100,
          opacity: 0,
          letterSpacing: "0.08em",
        });

        gsap.set([statementRef.current, badgesRef.current, telemetryRef.current], {
          y: 30,
          opacity: 0,
        });

        gsap.set(scrollIndicatorRef.current, {
          y: 20,
          opacity: 0,
        });

        // 2. Main Choreographed Load Timeline
        const tl = gsap.timeline({
          delay: 0.15,
          defaults: { ease: "power3.out" },
        });

        // Top nav appears
        tl.fromTo(
          "#site-header",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
        )
          // Telemetry line appears
          .to(
            telemetryRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.4"
          )
          // "FULL STACK" reveals word-by-word with 3D rotation
          .to(
            fullStackWords,
            {
              y: "0%",
              opacity: 1,
              rotateX: 0,
              stagger: 0.12,
              duration: 1.1,
              ease: "power4.out",
            },
            "-=0.4"
          )
          // "DEVELOPER" slides into position
          .to(
            developerRef.current,
            {
              x: 0,
              opacity: 1,
              letterSpacing: "-0.04em",
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.7"
          )
          // Supporting text & credentials fade in
          .to(
            [statementRef.current, badgesRef.current],
            {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.5"
          )
          // Scroll indicator appears
          .to(
            scrollIndicatorRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.3"
          );
      }

      // Mouse Parallax on Oversized Typography
      if (!isReduced && window.matchMedia("(pointer: fine)").matches) {
        const hero = heroRef.current;
        const fullStack = fullStackRef.current;
        const dev = developerRef.current;

        if (hero && fullStack && dev) {
          const textBgX = gsap.quickTo(fullStack, "x", { duration: 0.9, ease: "power2.out" });
          const textBgY = gsap.quickTo(fullStack, "y", { duration: 0.9, ease: "power2.out" });

          const textFgX = gsap.quickTo(dev, "x", { duration: 0.6, ease: "power2.out" });
          const textFgY = gsap.quickTo(dev, "y", { duration: 0.6, ease: "power2.out" });

          const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const xPercent = (e.clientX / innerWidth - 0.5) * 2;
            const yPercent = (e.clientY / innerHeight - 0.5) * 2;

            textBgX(xPercent * -24);
            textBgY(yPercent * -14);

            textFgX(xPercent * 28);
            textFgY(yPercent * 18);
          };

          hero.addEventListener("mousemove", handleMouseMove);

          return () => {
            hero.removeEventListener("mousemove", handleMouseMove);
          };
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className={styles.heroSection}>
      <Navbar />

      {/* Subtle architectural grid lines in background */}
      <div className={styles.heroGridLines} aria-hidden="true" />

      {/* Centerpiece Typography Stack */}
      <div className={styles.typographyCenterpiece}>
        {/* Editorial Sub-Header / Telemetry */}
        <div ref={telemetryRef} className={styles.telemetryBar}>
          <span className={styles.telemetryTag}>
            <Terminal size={12} />
            MERN STACK &bull; NEXT.JS &bull; 3D / AR/VR
          </span>
          <span className={styles.telemetryDivider}>|</span>
          <span className={styles.telemetryEdu}>
            <GraduationCap size={13} />
            ANNA UNIVERSITY &bull; B.E. CSE &apos;28
          </span>
        </div>

        {/* Giant Primary Heading: FULL STACK */}
        <h1 ref={fullStackRef} className={styles.titlePrimary}>
          <span className={styles.wordWrapper}>
            <span className={styles.word}>FULL</span>
          </span>{" "}
          <span className={styles.wordWrapper}>
            <span className={styles.word}>STACK</span>
          </span>
        </h1>

        {/* Giant Secondary Heading: DEVELOPER */}
        <h2 ref={developerRef} className={styles.titleSecondary}>
          DEVELOPER
        </h2>
      </div>

      {/* Supporting Editorial Meta & Statement Blocks */}
      <div className={styles.supportingContent}>
        {/* Left column: Supporting statement from resume */}
        <div ref={statementRef} className={styles.heroStatementBlock}>
          <p className={styles.heroStatement}>
            &ldquo;Building scalable digital solutions with clean architecture and exceptional user experiences.&rdquo;
          </p>
          <p className={styles.heroDescription}>
            Full Stack Developer &amp; AR/VR 3D Artist specializing in modern web applications, management systems, and immersive digital experiences.
          </p>
          <div ref={badgesRef} className={styles.heroChips}>
            <span className={styles.chip}>
              <Code2 size={13} />
              Full Stack Developer
            </span>
            <span className={styles.chip}>
              <Box size={13} />
              AR/VR &amp; 3D Artist
            </span>
            <span className={styles.chip}>
              <Sparkles size={13} />
              Creative Builder
            </span>
          </div>
        </div>

        {/* Right column: Scroll down prompt */}
        <div className={styles.bottomActions}>
          <a
            ref={scrollIndicatorRef}
            href="#about"
            className={styles.scrollIndicator}
            aria-label="Scroll to explore"
          >
            <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
            <div className={styles.arrowBounce}>
              <ArrowDown size={14} />
            </div>
          </a>
        </div>
      </div>

      {/* Subtle bottom gradient fade into About section */}
      <div className={styles.bottomTransitionFade} aria-hidden="true" />
    </section>
  );
}
