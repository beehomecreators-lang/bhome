import { useEffect, useState } from "react";
import { PHONE } from "../data/content";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`brand ${compact ? "brand-compact" : ""}`}
      href="/"
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }}
    >
      <img
        className="brand-image"
        src="/images/IMG-20260815-WA0011.jpg"
        alt="Bee Home Creators"
      />
    </a>
  );
}

export function Navigation({
  onMenu,
  transparent = false,
}: {
  onMenu: () => void;
  transparent?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header ${transparent ? "is-transparent" : ""} ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#projects">Our projects</a>
          <a href="#why-us">Why choose us</a>
          <a href="#team">Our team</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="header-call" href={`tel:${PHONE}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+91 63818 95472</span>
          </a>
          <a
            className="button button-dark button-small"
            href={`https://wa.me/${PHONE}`}
            target="_blank"
            rel="noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            WhatsApp
          </a>
          <button
            className="menu-button"
            onClick={onMenu}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="mobile-menu">
      <div className="mobile-menu-top">
        <Brand compact />
        <button onClick={onClose} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <nav>
        <a href="#projects" onClick={onClose}>Our projects</a>
        <a href="#why-us" onClick={onClose}>Why choose us</a>
        <a href="#team" onClick={onClose}>Our team</a>
        <a href="#contact" onClick={onClose}>Contact</a>
      </nav>
      <a className="button button-gold" href={`tel:${PHONE}`}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call our team
      </a>
    </div>
  );
}
