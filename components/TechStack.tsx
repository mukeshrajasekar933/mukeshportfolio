"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./TechStack.module.css";
import { techStack, Technology } from "@/lib/techData";
import { registerGSAP, isReducedMotion } from "@/lib/gsap/gsapConfig";
import { Layers, Terminal, Sparkles, Database, Wrench } from "lucide-react";

export default function TechStack() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeInnerRef1 = useRef<HTMLDivElement | null>(null);
  const marqueeInnerRef2 = useRef<HTMLDivElement | null>(null);
  const [activeTech, setActiveTech] = useState<Technology | null>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const isReduced = isReducedMotion();

    const ctx = gsap.context(() => {
      if (isReduced) return;

      // Duplicate content creates infinite seamless loop
      const row1 = marqueeInnerRef1.current;
      const row2 = marqueeInnerRef2.current;
      if (!row1 || !row2) return;

      // Base marquee animations
      const tween1 = gsap.to(row1, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: "none",
      });

      const tween2 = gsap.to(row2, {
        xPercent: 50,
        repeat: -1,
        duration: 32,
        ease: "none",
      });

      // Scroll velocity-based speed boost!
      let velocityTracker = 0;
      let lastScrollY = window.scrollY;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const delta = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        velocityTracker = Math.min(delta * 0.08, 3.5);

        // Accelerate tweens smoothly on scroll
        gsap.to(tween1, { timeScale: 1 + velocityTracker, duration: 0.3 });
        gsap.to(tween2, { timeScale: -(1 + velocityTracker), duration: 0.3 });

        // Decay back to base speed
        gsap.to(tween1, { timeScale: 1, duration: 0.8, delay: 0.1 });
        gsap.to(tween2, { timeScale: -1, duration: 0.8, delay: 0.1 });
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      // Pause/resume when hovering an item
      const handleItemEnter = () => {
        gsap.to([tween1, tween2], { timeScale: 0.15, duration: 0.4 });
      };

      const handleItemLeave = () => {
        gsap.to([tween1, tween2], { timeScale: 1, duration: 0.6 });
      };

      const items = sectionRef.current?.querySelectorAll(`.${styles.techPill}`);
      items?.forEach((item) => {
        item.addEventListener("mouseenter", handleItemEnter);
        item.addEventListener("mouseleave", handleItemLeave);
      });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        items?.forEach((item) => {
          item.removeEventListener("mouseenter", handleItemEnter);
          item.removeEventListener("mouseleave", handleItemLeave);
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split items into 2 rows for dense editorial marquee
  const row1Items = [...techStack, ...techStack];
  const row2Items = [...techStack.slice().reverse(), ...techStack.slice().reverse()];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Layers size={13} />;
      case "Backend":
        return <Terminal size={13} />;
      case "Database":
        return <Database size={13} />;
      case "Animation":
        return <Sparkles size={13} />;
      default:
        return <Wrench size={13} />;
    }
  };

  return (
    <section ref={sectionRef} id="skills" className={styles.techSection}>
      <div className="editorial-container">
        <div className={styles.sectionHeader}>
          <div className="section-label">02 — COMPETENCY</div>
          <h2 className="section-title">TOOLS I BUILD WITH</h2>
          <p className={styles.sectionLead}>
            A battle-tested production toolkit combining modern runtime engines, scalable databases, and expressive styling languages.
          </p>
        </div>
      </div>

      {/* Row 1 Marquee (Leftward) */}
      <div className={styles.marqueeTrack}>
        <div ref={marqueeInnerRef1} className={styles.marqueeInner}>
          {row1Items.map((tech, idx) => (
            <div
              key={`row1-${tech.name}-${idx}`}
              className={styles.techPill}
              onMouseEnter={() => setActiveTech(tech)}
              onMouseLeave={() => setActiveTech(null)}
              tabIndex={0}
              role="button"
              aria-label={`${tech.name}: ${tech.description}`}
            >
              <span className={styles.pillIcon}>{getCategoryIcon(tech.category)}</span>
              <span className={styles.pillName}>{tech.name}</span>
              <span className={styles.pillLevel}>{tech.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee (Rightward) */}
      <div className={styles.marqueeTrack}>
        <div ref={marqueeInnerRef2} className={`${styles.marqueeInner} ${styles.reverse}`}>
          {row2Items.map((tech, idx) => (
            <div
              key={`row2-${tech.name}-${idx}`}
              className={styles.techPill}
              onMouseEnter={() => setActiveTech(tech)}
              onMouseLeave={() => setActiveTech(null)}
              tabIndex={0}
              role="button"
              aria-label={`${tech.name}: ${tech.description}`}
            >
              <span className={styles.pillIcon}>{getCategoryIcon(tech.category)}</span>
              <span className={styles.pillName}>{tech.name}</span>
              <span className={styles.pillLevel}>{tech.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Tooltip / Inspector Drawer */}
      <div className="editorial-container">
        <div className={styles.inspectorBar}>
          <div className={styles.inspectorInfo}>
            <span className={styles.inspectorLabel}>LIVE TOOL INSPECTOR:</span>
            {activeTech ? (
              <div className={styles.inspectorDetails}>
                <strong className={styles.inspectorTechName}>{activeTech.name}</strong>
                <span className={styles.inspectorCategory}>[{activeTech.category}]</span>
                <span className={styles.inspectorDesc}>{activeTech.description}</span>
              </div>
            ) : (
              <span className={styles.inspectorPlaceholder}>
                Hover any technology node above to inspect architecture role & specialization details.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
