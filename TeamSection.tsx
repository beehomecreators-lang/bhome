import { useEffect, useRef, useState } from "react";
import { teamMembers } from "../data/content";

export function TeamSection() {
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);

  const filtered = teamMembers.filter((m) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.designation.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q) ||
      m.mobile.includes(q)
    );
  });

  useEffect(() => {
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
    root.current?.querySelectorAll(".team-card").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section className="team-section" id="team" ref={root}>
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="kicker">
              <span className="kicker-line" />
              Our people
            </div>
            <h2 className="section-title">
              The team <em>behind Bee Home.</em>
            </h2>
          </div>
          <p className="section-desc">
            Meet the people who make every plot search, site visit, and
            conversation feel personal.
          </p>
        </div>
        <div className="team-search-wrap">
          <div className="team-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, role, ID, or phone number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search employees"
            />
          </div>
          <span className="team-count">
            {filtered.length} {filtered.length === 1 ? "member" : "members"}
          </span>
        </div>
        <div className="team-grid">
          {filtered.map((m) => (
            <article key={m.id} className="team-card">
              <div className="team-avatar">
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="team-info">
                <div className="team-id">{m.id}</div>
                <h3>{m.name}</h3>
                <div className="team-role">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {m.designation}
                </div>
                <a className="team-phone" href={`tel:+91${m.mobile}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 {m.mobile}
                </a>
                <a
                  className="team-whatsapp"
                  href={`https://wa.me/91${m.mobile}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="team-empty">
              No team members match your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
