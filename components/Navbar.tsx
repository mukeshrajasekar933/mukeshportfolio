"use client";

import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Logo from "./Logo";

export default function Navbar() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in IST / Local
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTimeString(`${timeStr} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.navbar} id="site-header">
      <div className={styles.container}>
        {/* Top-Left: Logo + MUKESH R */}
        <div className={styles.brand}>
          <a href="#hero" className={styles.brandLink}>
            <Logo size={36} />
            <div className={styles.brandInfo}>
              <span className={styles.name}>MUKESH R</span>
            </div>
          </a>
          <span className={styles.statusBadge}>
            <span className={styles.statusDot} />
            AVAILABLE FOR HIRE
          </span>
        </div>

        {/* Center: Live Time & Location */}
        <div className={styles.locationInfo}>
          <span className={styles.locationLabel}>CHENNAI, INDIA</span>
          <span className={styles.liveClock}>{timeString || "11:30:00 IST"}</span>
        </div>

        {/* Top-Right: FULL STACK DEVELOPER */}
        <div className={styles.roleBlock}>
          <div className={styles.roleTitle}>FULL STACK DEVELOPER</div>
          <div className={styles.roleSubtitle}>
            Crafting digital experiences through code, design and technology.
          </div>
        </div>
      </div>
    </header>
  );
}
