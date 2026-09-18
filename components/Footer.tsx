"use client";

import React from "react";
import styles from "./Footer.module.css";
import { ArrowUp } from "lucide-react";
import { useMagnetic } from "@/lib/gsap/useMagnetic";

export default function Footer() {
  const magneticBackToTop = useMagnetic<HTMLButtonElement>({ strength: 0.3 });

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="editorial-container">
        <div className={styles.footerMain}>
          {/* Left Block */}
          <div className={styles.copyrightBlock}>
            <span className={styles.yearName}>© 2026 MUKESH R</span>
            <span className={styles.roleSub}>FULL STACK DEVELOPER</span>
          </div>

          {/* Center Credit */}
          <div className={styles.centerCredit}>
            <span>DESIGNED &amp; DEVELOPED BY MUKESH R</span>
          </div>

          {/* Right: Back to Top */}
          <div className={styles.backToTopBlock}>
            <button
              ref={magneticBackToTop}
              onClick={scrollToTop}
              className={styles.backToTopBtn}
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
