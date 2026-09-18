"use client";

import React, { useState } from "react";
import styles from "./Projects.module.css";
import { projectsData, Project } from "@/lib/projectsData";
import ProjectItem from "./ProjectItem";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="work" className={styles.projectsSection}>
      <div className="editorial-container">
        <div className={styles.sectionHeader}>
          <div className="section-label">03 — SELECTED WORK</div>
          <h2 className="section-title">THINGS I&apos;VE BUILT.</h2>
          <p className={styles.sectionLead}>
            A curated selection of full-stack systems, modern e-commerce engines, and high-performance digital platforms.
          </p>
        </div>
      </div>

      {/* Projects Stack */}
      <div className={styles.projectsList}>
        {projectsData.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={index}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </section>
  );
}
