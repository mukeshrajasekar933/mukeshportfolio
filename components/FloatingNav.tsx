"use client";

import React, { useEffect, useState } from "react";
import { Home, User, Briefcase, Cpu, Mail } from "lucide-react";
import styles from "./FloatingNav.module.css";
import { useMagnetic } from "@/lib/gsap/useMagnetic";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

function NavItem({ href, label, icon, isActive }: NavItemProps) {
  const magneticRef = useMagnetic<HTMLAnchorElement>({ strength: 0.25 });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      ref={magneticRef}
      href={href}
      onClick={handleClick}
      className={`${styles.navButton} ${isActive ? styles.active : ""}`}
      aria-label={label}
      title={label}
    >
      <span className={styles.iconWrapper}>{icon}</span>
      <span className={styles.labelTooltip}>{label}</span>
    </a>
  );
}

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "skills", "work", "process", "capabilities", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportHeight * 0.45) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#hero", label: "Home", icon: <Home size={18} />, section: "hero" },
    { href: "#about", label: "About", icon: <User size={18} />, section: "about" },
    { href: "#skills", label: "Skills", icon: <Cpu size={18} />, section: "skills" },
    { href: "#work", label: "Work", icon: <Briefcase size={18} />, section: "work" },
    { href: "#contact", label: "Contact", icon: <Mail size={18} />, section: "contact" },
  ];

  return (
    <nav className={styles.floatingNav} aria-label="Quick navigation">
      <div className={styles.navBar}>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={activeSection === item.section}
          />
        ))}
      </div>
    </nav>
  );
}
