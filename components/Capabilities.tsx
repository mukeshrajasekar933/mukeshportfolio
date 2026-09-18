"use client";

import React, { useState } from "react";
import styles from "./Capabilities.module.css";
import { Check, Plus, Minus } from "lucide-react";

interface Capability {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techs: string[];
}

const capabilities: Capability[] = [
  {
    id: "full-stack",
    number: "01",
    title: "FULL STACK WEB DEVELOPMENT",
    tagline: "End-to-end web applications with coherent architecture.",
    description:
      "Developing modern web applications, management systems, and business websites with hands-on experience across the entire lifecycle. Strong foundation in frontend and backend development, database design, API integration, and responsive UI/UX.",
    deliverables: [
      "Modular full-stack MERN & Next.js architectures",
      "Stateless session & token-based auth pipelines",
      "Transactional and document database modeling",
      "Clean architecture with exceptional user experiences",
    ],
    techs: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript"],
  },
  {
    id: "ar-vr-3d",
    number: "02",
    title: "AR/VR & 3D ENVIRONMENT CREATION",
    tagline: "Realistic 3D assets and immersive digital experiences.",
    description:
      "Hands-on experience in 3D modeling, texturing, lighting, animation, and rendering using Blender. Creating realistic and optimized 3D assets and immersive digital experiences for AR/VR applications in Unity.",
    deliverables: [
      "3D modeling, texturing, and realistic lighting in Blender",
      "Asset optimization for real-time engines and AR/VR headsets",
      "Interactive 3D environments and physics in Unity",
      "AR Foundation integration and spatial experience design",
    ],
    techs: ["Blender", "Unity", "AR Foundation", "VR Development", "3D Animation", "Lighting"],
  },
  {
    id: "database-engineering",
    number: "03",
    title: "DATABASE MANAGEMENT & APIS",
    tagline: "Structured data pipelines, schema modeling, and RESTful APIs.",
    description:
      "Designing and managing both document NoSQL and relational SQL databases with high integrity. Creating well-documented REST APIs with secure data contracts, indexing, and validation.",
    deliverables: [
      "NoSQL schema modeling and indexing with MongoDB",
      "Relational data architecture in MySQL and PostgreSQL",
      "Cloud backend integration with Firebase and Supabase",
      "RESTful API design, controller abstraction, and Postman testing",
    ],
    techs: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase", "REST APIs"],
  },
  {
    id: "frontend-ui",
    number: "04",
    title: "RESPONSIVE UI/UX & FRONTEND",
    tagline: "Pixel-perfect web interfaces across every device screen.",
    description:
      "Constructing fluid, responsive interfaces using modern React and Next.js techniques. Combining modern CSS layout engines with tactile micro-interactions and high-performance asset delivery.",
    deliverables: [
      "Fluid clamp() responsive typographic systems",
      "Tailwind CSS & bespoke CSS modular styling",
      "Cross-device mobile-friendly interface design",
      "Accessible navigation and semantic markup",
    ],
    techs: ["React.js", "Next.js", "Tailwind CSS", "Modern CSS", "GSAP", "HTML5"],
  },
];

export default function Capabilities() {
  const [expandedId, setExpandedId] = useState<string | null>("full-stack");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="capabilities" className={styles.capabilitiesSection}>
      <div className="editorial-container">
        <div className={styles.sectionHeader}>
          <div className="section-label">05 — CAPABILITIES</div>
          <h2 className="section-title">WHAT I DO</h2>
          <p className={styles.sectionLead}>
            Full-spectrum software engineering and creative 3D visualization combining scalable web architecture with immersive interactive experiences.
          </p>
        </div>

        <div className={styles.rowsList}>
          {capabilities.map((cap) => {
            const isExpanded = expandedId === cap.id;
            return (
              <div
                key={cap.id}
                className={`${styles.capabilityRow} ${isExpanded ? styles.expanded : ""}`}
                onClick={() => toggleExpand(cap.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpand(cap.id);
                  }
                }}
              >
                <div className={styles.rowMain}>
                  <div className={styles.titleWrapper}>
                    <span className={styles.rowNumber}>{cap.number}</span>
                    <h3 className={styles.rowTitle}>{cap.title}</h3>
                  </div>

                  <span className={styles.rowTagline}>{cap.tagline}</span>

                  <div className={styles.toggleIcon}>
                    {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                {/* Expanded Drawer */}
                <div className={styles.drawer}>
                  <div className={styles.drawerInner}>
                    <div className={styles.drawerGrid}>
                      <div className={styles.drawerLeft}>
                        <p className={styles.drawerDescription}>{cap.description}</p>
                        <div className={styles.techPills}>
                          {cap.techs.map((t, i) => (
                            <span key={i} className={styles.techPill}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.drawerRight}>
                        <h4 className={styles.deliverablesTitle}>DELIVERABLES &amp; SPECIALIZATION</h4>
                        <ul className={styles.deliverablesList}>
                          {cap.deliverables.map((item, i) => (
                            <li key={i} className={styles.deliverableItem}>
                              <Check size={14} className={styles.checkIcon} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
