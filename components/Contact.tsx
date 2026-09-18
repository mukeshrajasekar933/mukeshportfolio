"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Contact.module.css";
import { registerGSAP, isReducedMotion } from "@/lib/gsap/gsapConfig";
import { useMagnetic } from "@/lib/gsap/useMagnetic";
import { ArrowUpRight, Github, Linkedin, Mail, Copy, Check, Send, Phone } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingLine1Ref = useRef<HTMLDivElement | null>(null);
  const headingLine2Ref = useRef<HTMLDivElement | null>(null);
  const ctaBtnRef = useRef<HTMLButtonElement | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Magnetic button hooks
  const magneticCta = useMagnetic<HTMLButtonElement>({ strength: 0.35 });
  const magneticGh = useMagnetic<HTMLAnchorElement>({ strength: 0.25 });
  const magneticLi = useMagnetic<HTMLAnchorElement>({ strength: 0.25 });
  const magneticEm = useMagnetic<HTMLButtonElement>({ strength: 0.25 });
  const magneticPh = useMagnetic<HTMLButtonElement>({ strength: 0.25 });

  const emailAddress = "mukeshrajasekar933@gmail.com";
  const phoneNumber = "+91 7395863175";

  useEffect(() => {
    const { gsap } = registerGSAP();
    const isReduced = isReducedMotion();
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Split character/word entry animation with 3D rotation
      const line1Words = headingLine1Ref.current?.querySelectorAll(`.${styles.char}`) || [];
      const line2Words = headingLine2Ref.current?.querySelectorAll(`.${styles.char}`) || [];

      gsap.fromTo(
        [...line1Words, ...line2Words],
        {
          y: 90,
          rotateX: 65,
          opacity: 0,
        },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // CTA button appears after heading
      if (ctaBtnRef.current) {
        gsap.fromTo(
          ctaBtnRef.current,
          { y: 35, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.contactSection}>
      <div className="editorial-container">
        <div className={styles.topLabel}>
          <span className="section-label">06 — INITIATE</span>
        </div>

        {/* Dramatic 3D Perspective Reveal Heading */}
        <div className={styles.headingWrapper}>
          <div ref={headingLine1Ref} className={styles.headingLine}>
            {"LET'S BUILD".split(" ").map((word, wIdx) => (
              <span key={wIdx} className={styles.wordWrapper}>
                {word.split("").map((char, cIdx) => (
                  <span key={cIdx} className={styles.char}>
                    {char}
                  </span>
                ))}
                <span className={styles.space}>&nbsp;</span>
              </span>
            ))}
          </div>
          <div ref={headingLine2Ref} className={styles.headingLine}>
            {"SOMETHING.".split("").map((char, cIdx) => (
              <span key={cIdx} className={styles.char}>
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Supporting Text */}
        <div className={styles.supportingArea}>
          <p className={styles.statementText}>
            Have an idea, project or opportunity? <br />
            Let&apos;s turn it into something real.
          </p>
        </div>

        {/* Large Interactive CTA */}
        <div className={styles.ctaWrapper}>
          <button
            ref={(node) => {
              ctaBtnRef.current = node;
              if (magneticCta) (magneticCta as any).current = node;
            }}
            onClick={() => setIsModalOpen(true)}
            className={styles.mainCtaButton}
            aria-label="Get in touch"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight size={24} className={styles.ctaArrow} />
          </button>
        </div>

        {/* Direct Contact Quick-Copy Pills (Email & Phone) */}
        <div className={styles.contactPillsRow}>
          {/* Email */}
          <button
            ref={magneticEm}
            onClick={handleCopyEmail}
            className={styles.contactPill}
            aria-label="Copy email address"
          >
            <Mail size={16} />
            <span className={styles.pillText}>{emailAddress}</span>
            <span className={styles.copyBadge}>
              {copiedEmail ? (
                <>
                  <Check size={14} /> COPIED
                </>
              ) : (
                <>
                  <Copy size={14} /> COPY
                </>
              )}
            </span>
          </button>

          {/* Phone */}
          <button
            ref={magneticPh}
            onClick={handleCopyPhone}
            className={styles.contactPill}
            aria-label="Copy phone number"
          >
            <Phone size={15} />
            <span className={styles.pillText}>{phoneNumber}</span>
            <span className={styles.copyBadge}>
              {copiedPhone ? (
                <>
                  <Check size={14} /> COPIED
                </>
              ) : (
                <>
                  <Copy size={14} /> COPY
                </>
              )}
            </span>
          </button>
        </div>

        {/* Social Links Row */}
        <div className={styles.socialRow}>
          <a
            ref={magneticGh}
            href="https://github.com/mukeshrajasekar933"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <Github size={18} />
            <span>GITHUB</span>
          </a>

          <a
            ref={magneticLi}
            href="https://www.linkedin.com/in/mukesh-r-a61a93386/"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <Linkedin size={18} />
            <span>LINKEDIN</span>
          </a>

          <a
            href={`mailto:${emailAddress}`}
            className={styles.socialLink}
          >
            <Mail size={18} />
            <span>DIRECT MAIL</span>
          </a>

          <a
            href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
            className={styles.socialLink}
          >
            <Phone size={17} />
            <span>CALL DIRECT</span>
          </a>
        </div>
      </div>

      {/* Interactive Contact Drawer/Modal */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalTop}>
              <h3 className={styles.modalTitle}>START A CONVERSATION</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className={styles.modalCloseBtn}
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            <p className={styles.modalSub}>
              Share a few details about your vision, timeline, or engineering role. I typically reply within 24 hours.
            </p>

            {formSent ? (
              <div className={styles.successMessage}>
                <Check size={36} className={styles.successIcon} />
                <h4>MESSAGE TRANSMITTED</h4>
                <p>Thank you. Looking forward to speaking with you.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className={styles.contactForm}>
                <div className={styles.inputGroup}>
                  <label htmlFor="client-name">YOUR NAME / COMPANY</label>
                  <input
                    id="client-name"
                    required
                    type="text"
                    placeholder="e.g. Alex Morgan / Tech Labs"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="client-email">EMAIL ADDRESS</label>
                  <input
                    id="client-email"
                    required
                    type="email"
                    placeholder="alex@company.com"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="client-msg">PROJECT OR ROLE INQUIRY</label>
                  <textarea
                    id="client-msg"
                    required
                    rows={4}
                    placeholder="Tell me about what you are looking to build..."
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <span>TRANSMIT INQUIRY</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
