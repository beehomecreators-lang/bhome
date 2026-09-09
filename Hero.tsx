import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PHONE, projects } from "../data/content";

export function Hero({ onExplore }: { onExplore: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set(".hero-visual", { clipPath: "inset(0 0 100% 0)" })
        .set(".hero-title-line", { yPercent: 110, opacity: 0 })
        .set(".hero-kicker", { opacity: 0, x: -20 })
        .set(".hero-desc", { opacity: 0, y: 20 })
        .set(".hero-cta", { opacity: 0, y: 20 })
        .set(".hero-trust", { opacity: 0, y: 20 })
        .set(".hero-badge", { opacity: 0, scale: 0.8 });

      tl.to(".hero-visual", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.4,
        ease: "power3.out",
      })
        .to(
          ".hero-kicker",
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "-=0.9"
        )
        .to(
          ".hero-title-line",
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .to(
          ".hero-desc",
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          ".hero-cta",
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.3"
        )
        .to(
          ".hero-trust",
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .to(
          ".hero-badge",
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.4)" },
          "-=0.3"
        );
    }, root.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="hero-bg-grain" />
      <div className="hero-glow" />
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="kicker-line" />
            Trusted land partners in Trichy
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">Find a place to</span>
            <span className="hero-title-line hero-title-accent">put down roots.</span>
          </h1>
          <p className="hero-desc">
            Thoughtfully selected residential plots for families building their
            next chapter — with clarity, care, and a future-facing point of view.
          </p>
          <div className="hero-actions">
            <button className="button button-gold hero-cta" onClick={onExplore}>
              Explore our projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
            <a className="button button-outline hero-cta" href={`tel:${PHONE}`}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Speak to an advisor
            </a>
          </div>
          <div className="hero-trust">
            <div className="trust-item">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>
                <strong>Clear conversations</strong>
                <small>No pressure, just guidance</small>
              </span>
            </div>
            <div className="trust-item">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>
                <strong>Local expertise</strong>
                <small>Rooted in Trichy</small>
              </span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-inner">
            <img
              src="/images/vasantham avenue/Gemini_Generated_Image_ahvqlzahvqlzahvq.png"
              alt="Vasantham Avenue residential plots"
              data-cursor="image"
              data-cursor-label="Preview"
            />
            <div className="hero-visual-overlay" />
          </div>
          <div className="hero-badge hero-badge-1">
            <span className="hero-badge-num">{String(projects.length).padStart(2, "0")}</span>
            <span className="hero-badge-label">Signature projects</span>
          </div>
          <div className="hero-badge hero-badge-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>DTCP & RERA approved</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
