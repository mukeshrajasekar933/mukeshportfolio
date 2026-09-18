"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import styles from "./ProjectItem.module.css";
import { Project } from "@/lib/projectsData";
import { registerGSAP, isReducedMotion } from "@/lib/gsap/gsapConfig";
import { useMagnetic } from "@/lib/gsap/useMagnetic";

interface ProjectItemProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export default function ProjectItem({ project, index, onOpenModal }: ProjectItemProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLDivElement | null>(null);

  const ctaRef = useMagnetic<HTMLButtonElement>({ strength: 0.3 });
  const codeRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });

  useEffect(() => {
    const { gsap } = registerGSAP();
    const isReduced = isReducedMotion();
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Scale image from 0.88 -> 1 on scroll entrance
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          {
            scale: 0.88,
            y: 40,
            opacity: 0.8,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "center 50%",
              scrub: 1,
            },
          }
        );
      }

      // Parallax on big number
      if (numberRef.current) {
        gsap.fromTo(
          numberRef.current,
          { y: 60, opacity: 0.05 },
          {
            y: -40,
            opacity: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Info text upward reveal
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Determine layout class variant based on project index
  // 0: info-left, image-right
  // 1: image-left, info-right
  // 2: panoramic wide layout
  // 3: dashboard split layout
  const layoutVariant =
    index === 0
      ? styles.layoutRight
      : index === 1
      ? styles.layoutLeft
      : index === 2
      ? styles.layoutWide
      : styles.layoutSplit;

  return (
    <article
      ref={containerRef}
      id={`project-${project.id}`}
      className={`${styles.projectShowcase} ${layoutVariant}`}
    >
      {/* Parallax Background Number */}
      <div ref={numberRef} className={styles.bgNumber} aria-hidden="true">
        {project.number}
      </div>

      <div className={styles.innerContainer}>
        {/* Project Information */}
        <div ref={infoRef} className={styles.infoCol}>
          <div className={styles.topMeta}>
            <span className={styles.projectNumber}>{project.number}</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.projectCategory}>{project.category}</span>
          </div>

          <h3 className={styles.title}>
            {project.title}
            <span className={styles.subtitle}>{project.subtitle}</span>
          </h3>

          <p className={styles.description}>{project.description}</p>

          {/* Features Highlights */}
          <ul className={styles.featuresList}>
            {project.features.slice(0, 4).map((feature, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={styles.featureDot} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Technology Badges */}
          <div className={styles.techList}>
            {project.technologies.map((tech, i) => (
              <span key={i} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className={styles.actions}>
            <button
              ref={ctaRef}
              onClick={() => onOpenModal(project)}
              className={styles.viewProjectBtn}
              aria-label={`View details of ${project.title}`}
            >
              <span>VIEW PROJECT</span>
              <ArrowUpRight size={16} />
            </button>

            <a
              ref={codeRef}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.viewCodeBtn}
              aria-label={`View source code of ${project.title}`}
            >
              <span>VIEW CODE</span>
              <Github size={15} />
            </a>
          </div>
        </div>

        {/* Project Image Mockup Area */}
        <div
          ref={imageWrapperRef}
          className={styles.imageCol}
          data-cursor="view"
          onClick={() => onOpenModal(project)}
          role="button"
          tabIndex={0}
          aria-label={`Open interactive preview for ${project.title}`}
        >
          <div className={styles.imageFrame}>
            <Image
              src={project.image}
              alt={`${project.title} - ${project.subtitle}`}
              width={1000}
              height={562}
              className={styles.projectImage}
              quality={90}
            />
            {/* Subtle gloss overlay */}
            <div className={styles.imageGloss} aria-hidden="true" />
            <div className={styles.hoverPrompt}>
              <span>CLICK TO EXPAND ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
