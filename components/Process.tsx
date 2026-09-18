"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Process.module.css";
import { registerGSAP, isReducedMotion } from "@/lib/gsap/gsapConfig";
import { Search, PenTool, Code, Cpu, Rocket } from "lucide-react";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "Understand the problem.",
    description:
      "Deep dive into user pain points, system constraints, business goals, and data flow modeling before writing a single line of production code.",
    details: ["Requirements gathering", "User journey mapping", "Data entity modeling", "Feasibility audit"],
    icon: <Search size={22} />,
  },
  {
    number: "02",
    title: "DESIGN",
    subtitle: "Plan the experience.",
    description:
      "Architect the design tokens, interaction choreography, component boundaries, and schema definitions with an editorial eye for detail.",
    details: ["Typography & color systems", "Component contract specs", "Database schema drafting", "API route hierarchy"],
    icon: <PenTool size={22} />,
  },
  {
    number: "03",
    title: "DEVELOP",
    subtitle: "Build frontend, backend and APIs.",
    description:
      "Construct robust Full Stack solutions using React/Next.js, Node.js, Express, and MongoDB with clean type safety and modular architectures.",
    details: ["REST API controllers", "State persistence layers", "Fluid CSS micro-interactions", "Secure auth guards"],
    icon: <Code size={22} />,
  },
  {
    number: "04",
    title: "REFINE",
    subtitle: "Test, optimize and improve.",
    description:
      "Rigorous profiling, bundle size minimization, accessibility compliance, index optimization, and lighthouse audit tuning.",
    details: ["Performance profiling", "Lighthouse 95+ tuning", "End-to-end flow checks", "Cross-device verification"],
    icon: <Cpu size={22} />,
  },
  {
    number: "05",
    title: "DEPLOY",
    subtitle: "Ship the final product.",
    description:
      "Automated CI/CD pipelines, production asset caching, server configuration, continuous monitoring, and zero-downtime rollouts.",
    details: ["Containerized builds", "CDN cache strategies", "Production telemetry", "Zero-downtime release"],
    icon: <Rocket size={22} />,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepsListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    const isReduced = isReducedMotion();
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const stepElements = stepsListRef.current?.querySelectorAll(`.${styles.stepItem}`);
      stepElements?.forEach((stepEl) => {
        gsap.fromTo(
          stepEl,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepEl,
              start: "top 75%",
              end: "top 40%",
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className={styles.processSection}>
      <div className="editorial-container">
        <div className={styles.sectionHeader}>
          <div className="section-label">04 — PROCESS</div>
          <h2 className="section-title">HOW I BUILD</h2>
          <p className={styles.sectionLead}>
            A deterministic five-stage methodology balancing creative exploration with disciplined software engineering.
          </p>
        </div>

        <div ref={stepsListRef} className={styles.stepsList}>
          {steps.map((step) => (
            <div key={step.number} className={styles.stepItem}>
              {/* Giant Number */}
              <div className={styles.numberCol}>
                <span className={styles.giantNum}>{step.number}</span>
                <span className={styles.stepIcon}>{step.icon}</span>
              </div>

              {/* Step Info */}
              <div className={styles.contentCol}>
                <div className={styles.stepHeader}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <span className={styles.stepSubtitle}>{step.subtitle}</span>
                </div>
                <p className={styles.stepDescription}>{step.description}</p>
                
                {/* Specific deliverables / details */}
                <div className={styles.detailsGrid}>
                  {step.details.map((detail, idx) => (
                    <div key={idx} className={styles.detailTag}>
                      <span className={styles.detailBullet} />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
