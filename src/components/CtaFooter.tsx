import { useEffect, useRef } from "react";
import { PHONE } from "../data/content";
import adminData from "../data/adminData.json";

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cta-section reveal" ref={ref}>
      <div className="container cta-inner">
        <div>
          <span className="panel-kicker">Your next chapter starts somewhere.</span>
          <h2 className="section-title">
            Let's find that <em>somewhere.</em>
          </h2>
        </div>
        <a
          className="button button-gold"
          href={`https://wa.me/${PHONE}`}
          target="_blank"
          rel="noreferrer"
        >
          Start a conversation
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer reveal" id="contact" ref={ref}>
      <div className="container footer-grid">
        <div>
          <a
            className="brand"
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
          <p>
            Helping families find the right<br />
            place to begin.
          </p>
        </div>
        <div>
          <span className="footer-label">Visit us</span>
          <p>{adminData.site.address[0]}<br />{adminData.site.address[1]}</p>
        </div>
        <div>
          <span className="footer-label">Talk to us</span>
          <a href={`tel:${PHONE}`}>{adminData.site.phoneDisplay}</a>
          <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer">
            WhatsApp our team
          </a>
          <a href="mailto:{adminData.site.email}">
            beehomecreators@gmail.com
          </a>
        </div>
        <div className="footer-social">
          <span className="footer-label">Follow along</span>
          <div>
            <a
              href="{adminData.site.instagramUrl}"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="{adminData.site.facebookUrl}"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2024 Bee Home Creators</span>
        <span>Real estate & marketing agency</span>
        <small>Website created by x.jeswin</small>
      </div>
      <div className="container footer-compliance">
        <p>{adminData.site.complianceText}</p>
      </div>
    </footer>
  );
}
