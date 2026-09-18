"use client";

import React, { useEffect, useRef } from "react";
import styles from "./About.module.css";
import { registerGSAP, isReducedMotion } from "@/lib/gsap/gsapConfig";
import { Terminal, Layers, Sparkles, Cpu, CheckCircle2, GraduationCap, Box, Globe } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const codeRef = useRef<HTMLSpanElement | null>(null);
  const designRef = useRef<HTMLSpanElement | null>(null);
  const buildRef = useRef<HTMLSpanElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    const isReduced = isReducedMotion();

    const ctx = gsap.context(() => {
      if (!isReduced) {
        // Animate each word of "CODE. DESIGN. BUILD." on scroll
        const words = [codeRef.current, designRef.current, buildRef.current];
        
        words.forEach((word) => {
          if (!word) return;
          gsap.fromTo(
            word,
            {
              y: 70,
              opacity: 0.1,
              rotateX: 25,
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: word,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.8,
              },
            }
          );
        });

        // Stagger reveal metadata cards
        const metaCards = cardsRef.current?.querySelectorAll(`.${styles.metaCard}`);
        if (metaCards && metaCards.length > 0) {
          gsap.fromTo(
            metaCards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.aboutSection}>
      <div className="editorial-container">
        {/* Section Label & Heading */}
        <div className={styles.headerBlock}>
          <div className="section-label">01 — ABOUT</div>
          <h2 className="section-title">WHO I AM</h2>
          <p className={styles.leadNarrative}>
            Full Stack Developer with hands-on experience in developing modern web applications, management systems, and business websites. Strong foundation in frontend and backend development, database design, API integration, and responsive UI/UX. Passionate about building scalable digital solutions with clean architecture and exceptional user experiences.
          </p>
        </div>

        {/* Big Editorial Statement: CODE. DESIGN. BUILD. */}
        <div className={styles.statementWrapper} aria-label="Code. Design. Build.">
          <div className={styles.wordRow}>
            <span ref={codeRef} className={styles.giantWord}>
              CODE.
            </span>
            <span className={styles.wordSub}>Clean architecture &amp; scalable backend APIs</span>
          </div>
          <div className={styles.wordRow}>
            <span ref={designRef} className={styles.giantWord}>
              DESIGN.
            </span>
            <span className={styles.wordSub}>Responsive UI/UX &amp; tactile digital experiences</span>
          </div>
          <div className={styles.wordRow}>
            <span ref={buildRef} className={styles.giantWord}>
              BUILD.
            </span>
            <span className={styles.wordSub}>Web applications &amp; immersive 3D environments</span>
          </div>
        </div>

        {/* Supporting Information Grid - 4 Columns */}
        <div ref={cardsRef} className={styles.metaGrid}>
          {/* ROLE */}
          <div className={styles.metaCard}>
            <div className={styles.cardHeader}>
              <Terminal size={18} className={styles.cardIcon} />
              <span className={styles.cardCategory}>ROLE</span>
            </div>
            <h3 className={styles.cardTitle}>Full Stack Developer</h3>
            <p className={styles.cardDescription}>
              Specializing in scalable digital solutions, RESTful API architecture, state management, and modern MERN / Next.js web applications.
            </p>
          </div>

          {/* EDUCATION */}
          <div className={styles.metaCard}>
            <div className={styles.cardHeader}>
              <GraduationCap size={18} className={styles.cardIcon} />
              <span className={styles.cardCategory}>EDUCATION</span>
            </div>
            <h3 className={styles.cardTitle}>B.E. Computer Science</h3>
            <p className={styles.cardDescription}>
              Anna University <br />
              <span className={styles.cardSubText}>Expected Graduation: 2028</span>
            </p>
          </div>

          {/* AR/VR & 3D */}
          <div className={styles.metaCard}>
            <div className={styles.cardHeader}>
              <Box size={18} className={styles.cardIcon} />
              <span className={styles.cardCategory}>CREATIVE</span>
            </div>
            <h3 className={styles.cardTitle}>AR/VR &amp; 3D Artist</h3>
            <p className={styles.cardDescription}>
              Hands-on 3D modeling, texturing, lighting, animation, and rendering in Blender, with interactive spatial environments in Unity.
            </p>
          </div>

          {/* STACK & DATABASES */}
          <div className={styles.metaCard}>
            <div className={styles.cardHeader}>
              <Cpu size={18} className={styles.cardIcon} />
              <span className={styles.cardCategory}>TECH STACK</span>
            </div>
            <h3 className={styles.cardTitle}>MERN / Next.js / SQL</h3>
            <p className={styles.cardDescription}>
              React, Next.js, Node, Express, MongoDB, MySQL, PostgreSQL, Firebase, Supabase, and REST APIs.
            </p>
          </div>
        </div>

        {/* Core Strengths & Languages Bar */}
        <div className={styles.strengthsGrid}>
          {/* Core Strengths Box */}
          <div className={styles.philosophyBox}>
            <div className={styles.philosophyHeader}>
              <Sparkles size={16} />
              <span>CORE STRENGTHS</span>
            </div>
            <div className={styles.principlesList}>
              {[
                "Full Stack Development",
                "Responsive Web Design",
                "Database Management",
                "API Development",
                "Problem Solving",
                "Team Collaboration",
                "Blender 3D",
                "Unity",
              ].map((strength, idx) => (
                <div key={idx} className={styles.principleItem}>
                  <CheckCircle2 size={15} className={styles.checkIcon} />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className={styles.languagesBox}>
            <div className={styles.philosophyHeader}>
              <Globe size={16} />
              <span>LANGUAGES</span>
            </div>
            <div className={styles.languagesList}>
              <span className={styles.languageBadge}>English &bull; Professional</span>
              <span className={styles.languageBadge}>Tamil &bull; Native</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
