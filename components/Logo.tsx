import React from "react";
import styles from "./Logo.module.css";

interface LogoProps {
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export default function Logo({ size = 36, className = "", showGlow = true }: LogoProps) {
  return (
    <div
      className={`${styles.logoWrapper} ${showGlow ? styles.hasGlow : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-label="Mukesh R Logo"
    >
      <svg
        viewBox="0 0 512 512"
        width={size}
        height={size}
        className={styles.svg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="logoBgGlow" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#181a26" />
            <stop offset="45%" stopColor="#0c0d14" />
            <stop offset="100%" stopColor="#050508" />
          </radialGradient>

          <linearGradient id="logoRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#818cf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="logoLeftPillar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="logoLeftDiagonal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient id="logoRightDiagonal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <linearGradient id="logoRightPillar" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          <radialGradient id="logoCenterAura" cx="50%" cy="52%" r="40%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000000" floodOpacity="0.8" />
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#38bdf8" floodOpacity="0.25" />
          </filter>

          <filter id="logoGlowOnly" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Squircle */}
        <rect
          x="28"
          y="28"
          width="456"
          height="456"
          rx="116"
          fill="url(#logoBgGlow)"
          stroke="url(#logoRimGrad)"
          strokeWidth="4.5"
          className={styles.squircle}
        />

        {/* Glass Edge */}
        <rect
          x="36"
          y="36"
          width="440"
          height="440"
          rx="108"
          fill="none"
          stroke="rgba(255, 255, 255, 0.07)"
          strokeWidth="1.5"
        />

        {/* Bloom */}
        <circle cx="256" cy="256" r="140" fill="url(#logoCenterAura)" />

        {/* 'M' Monogram */}
        <g filter="url(#logoShadow)" className={styles.mGroup}>
          <path
            d="M 116 376 V 156 Q 116 132 140 132 H 176 V 376 H 116 Z"
            fill="url(#logoLeftPillar)"
          />
          <path
            d="M 176 132 L 256 264 L 256 324 L 176 192 Z"
            fill="url(#logoLeftDiagonal)"
            className={styles.cyanRibbon}
          />
          <path
            d="M 256 264 L 336 132 H 372 L 256 324 Z"
            fill="url(#logoRightDiagonal)"
            className={styles.violetRibbon}
          />
          <path
            d="M 336 132 H 372 Q 396 132 396 156 V 376 H 336 Z"
            fill="url(#logoRightPillar)"
          />
          <path
            d="M 256 264 L 220 205 L 256 226 L 292 205 Z"
            fill="#ffffff"
            opacity="0.32"
          />
          <circle cx="256" cy="264" r="5" fill="#ffffff" filter="url(#logoGlowOnly)" />
          <circle cx="256" cy="264" r="3" fill="#38bdf8" />
        </g>
      </svg>
    </div>
  );
}
