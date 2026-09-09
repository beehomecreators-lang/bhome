import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Project, PHONE } from "../data/content";
import { Navigation } from "./Navigation";
import { Footer } from "./CtaFooter";
import { Lightbox } from "./Lightbox";

gsap.registerPlugin(ScrollTrigger);

export function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [selectedImage, setSelectedImage] = useState(project.image);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: `I am interested in ${project.name}. Please share more details.`,
  });
  const root = useRef<HTMLDivElement>(null);

  const whatsappLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    project.whatsappMessage
  )}`;

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".detail-visual", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".detail-copy > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });
      gsap.from(".gallery-card", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".detail-gallery",
          start: "top 80%",
        },
      });
      gsap.from(".info-panel", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".detail-info-grid",
          start: "top 85%",
        },
      });
    }, root.current);

    return () => ctx.revert();
  }, [project.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(
        `Hello Bee Home Creators, my name is ${form.name}. ${form.message} My phone number is ${form.phone}.`
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="detail-page" ref={root}>
      <Navigation onMenu={() => {}} transparent />
      <main className="container detail-main">
        <button className="back-link" onClick={onBack}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to all projects
        </button>
        <div className="detail-layout">
          <div className="detail-visual">
            <img
              src={selectedImage}
              alt={`${project.name} project flyer`}
              onClick={() => setZoom(true)}
              style={{ cursor: "zoom-in" }}
              data-cursor="image"
              data-cursor-label="Zoom"
            />
            <div className="detail-stamp">
              <span>Bee Home</span>
              <strong>CREATORS</strong>
              <small>Land for living</small>
            </div>
          </div>
          <div className="detail-copy">
            <div className="eyebrow">
              <span className="dot" />
              {project.type}
            </div>
            <h1>{project.name}</h1>
            <div className="detail-location">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {project.location}
            </div>
            <div className="price-block">
              <span>Starting price</span>
              <strong>{project.price}</strong>
              <small>/ sq.ft</small>
            </div>
            <div className="detail-buttons">
              <a
                className="button button-gold"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                WhatsApp us
              </a>
              <a className="button button-dark" href={`tel:${PHONE}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call now
              </a>
            </div>
            <div className="detail-link-row">
              {project.mapsUrl && (
                <>
                  <a href={project.mapsUrl} target="_blank" rel="noreferrer">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Google Maps
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </a>
                  <a href={project.mapsUrl} target="_blank" rel="noreferrer">
                    Get directions
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <section className="detail-gallery">
          <div className="gallery-heading">
            <div>
              <span className="panel-kicker">Explore the project</span>
              <h2>
                See it from<br />
                <em>every angle.</em>
              </h2>
            </div>
            <p>
              Browse the latest project highlights and tap any image to view it
              full size.
            </p>
          </div>
          <div className="gallery-grid">
            {(project.images ?? [project.image]).map((img, i) => (
              <button
                key={img}
                className={`gallery-card ${selectedImage === img ? "is-selected" : ""}`}
                onClick={() => setSelectedImage(img)}
                aria-label={`Select image ${i + 1} of ${project.name}`}
                aria-pressed={selectedImage === img}
                data-cursor="image"
                data-cursor-label="Select"
              >
                <img
                  src={img}
                  alt={`${project.name} view ${i + 1}`}
                  loading="lazy"
                />
                <span>{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </section>
        <div className="detail-info-grid">
          <section className="info-panel">
            <div className="panel-icon">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
            </div>
            <div>
              <span className="panel-kicker">A little extra</span>
              <h2>Offers that make<br />a difference.</h2>
              <ul>
                {project.offers?.map((o) => (
                  <li key={o}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="info-panel">
            <div className="panel-icon panel-icon-blue">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <span className="panel-kicker">Around the project</span>
              <h2>Well connected<br />to what matters.</h2>
              <ul>
                {project.landmarks.map((l) => (
                  <li key={l}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="enquiry-panel" id="contact">
            <div>
              <span className="panel-kicker">Have questions?</span>
              <h2>Let's talk about<br />your next step.</h2>
              <p>
                Share a few details and our team will get back to you.
              </p>
            </div>
            {sent ? (
              <div className="sent-state">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <strong>Message ready to send.</strong>
                <span>We will be in touch shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label>
                  Name
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Phone
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Your phone number"
                  />
                </label>
                <label>
                  Message
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                  />
                </label>
                <button className="button button-dark" type="submit">
                  Send enquiry
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                    <path d="m21.854 2.147-10.94 10.939" />
                  </svg>
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
      {zoom && (
        <Lightbox
          src={selectedImage}
          alt={`${project.name} project flyer`}
          onClose={() => setZoom(false)}
        />
      )}
      <Footer />
    </div>
  );
}
