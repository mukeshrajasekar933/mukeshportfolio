"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, CheckCircle, Layers, Cpu, Database } from "lucide-react";
import styles from "./ProjectModal.module.css";
import { Project } from "@/lib/projectsData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close project view">
          <X size={20} />
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.metaRow}>
            <span className={styles.number}>{project.number}</span>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.year}>{project.year}</span>
          </div>
          <h2 className={styles.title}>
            {project.title} <span className={styles.subtitle}>{project.subtitle}</span>
          </h2>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>

        {/* Big Preview Image */}
        <div className={styles.imageContainer}>
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className={styles.modalImage}
          />
        </div>

        {/* Details Body */}
        <div className={styles.bodyGrid}>
          {/* Left: Overview & Architecture */}
          <div className={styles.leftCol}>
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionHeading}>OVERVIEW</h3>
              <p className={styles.overviewText}>{project.overview || project.description}</p>
            </div>

            {project.architecture && (
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionHeading}>SYSTEM ARCHITECTURE</h3>
                <ul className={styles.archList}>
                  {project.architecture.map((item, i) => (
                    <li key={i} className={styles.archItem}>
                      <span className={styles.bullet}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Metrics & Performance */}
            {project.stats && (
              <div className={styles.statsGrid}>
                {project.stats.map((stat, i) => (
                  <div key={i} className={styles.statBox}>
                    <span className={styles.statVal}>{stat.value}</span>
                    <span className={styles.statLbl}>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Features & Tech Stack */}
          <div className={styles.rightCol}>
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionHeading}>KEY CAPABILITIES</h3>
              <div className={styles.featuresList}>
                {project.features.map((feat, i) => (
                  <div key={i} className={styles.featurePill}>
                    <CheckCircle size={14} className={styles.checkIcon} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionHeading}>TECHNOLOGY STACK</h3>
              <div className={styles.techTags}>
                {project.technologies.map((t, i) => (
                  <span key={i} className={styles.techTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className={styles.actionLinks}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.primaryLink}
              >
                <span>VISIT LIVE DEMO</span>
                <ExternalLink size={16} />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryLink}
              >
                <span>VIEW SOURCE CODE</span>
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
