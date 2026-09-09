import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    num: "01",
    title: "Listen first",
    text: "We start with what matters to you, then help you find a direction that fits.",
  },
  {
    num: "02",
    title: "Keep it clear",
    text: "Good decisions need good information. We keep every conversation straightforward.",
  },
  {
    num: "03",
    title: "Stay for the journey",
    text: "From the first question to your next milestone, our team is here to help.",
  },
];

export function WhySection() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !root.current) return;

    const ctx = gsap.context(() => {
      const cards = root.current!.querySelectorAll(".why-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        });
      });

      gsap.from(".why-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(".why-bg-text", { xPercent: 0 }, {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".why-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why-section" id="why-us" ref={root}>
      <div className="why-bg-text" aria-hidden="true">
        BEE HOME CREATORS — LAND FOR LIVING —
      </div>
      <div className="container why-grid">
        <div className="why-heading">
          <div className="kicker">
            <span className="kicker-line" />
            The Bee Home difference
          </div>
          <h2 className="section-title">
            Land buying, <em>made human.</em>
          </h2>
        </div>
        <div className="why-cards">
          {reasons.map((r) => (
            <div key={r.num} className="why-card">
              <span className="why-number">{r.num}</span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
