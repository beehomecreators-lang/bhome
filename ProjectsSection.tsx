import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection({
  onOpen,
  onZoom,
}: {
  onOpen: (id: string) => void;
  onZoom: (src: string, alt: string) => void;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".projects-head-row > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-head-row",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const cards = root.current!.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: (i % 4) * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".projects-end-inner", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-end",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, root.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={root}>
      <div className="container">
        <div className="projects-head-row">
          <div>
            <div className="kicker">
              <span className="kicker-line" />
              Our current collection
            </div>
            <h2 className="section-title">
              Places with <em>promise.</em>
            </h2>
          </div>
          <p className="section-desc">
            Every project is chosen with an eye for location, long-term value,
            and the simple joy of finding a place that feels like yours.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpen={onOpen}
              onZoom={onZoom}
            />
          ))}
        </div>
        <div className="projects-end">
          <div className="projects-end-inner">
            <span>Want to see more?</span>
            <a className="button button-gold" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
  onZoom,
}: {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
  onZoom: (src: string, alt: string) => void;
}) {
  return (
    <article className="project-card">
      <div className="project-card-image">
        <img
          src={project.image}
          alt={`${project.name} plot project`}
          data-cursor="image"
          data-cursor-label="Zoom"
          onClick={() => onZoom(project.image, `${project.name} plot project`)}
        />
        <div className="project-card-index">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <div className="project-card-body">
        <div className="eyebrow">
          <span className="dot" />
          {project.type}
        </div>
        <h3 className="project-card-title">{project.name}</h3>
        <div className="project-card-loc">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {project.location}
        </div>
        <div className="project-card-meta">
          <div className="project-card-price">
            <span>Starting from</span>
            <strong>{project.price}</strong>
            <small>/ sq.ft</small>
          </div>
          <button
            className="text-link"
            onClick={() => onOpen(project.id)}
          >
            View details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        {project.offers && (
          <div className="project-card-offers">
            {project.offers.map((o) => (
              <span key={o} className="offer-chip">{o}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
