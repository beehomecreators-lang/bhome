import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { projects } from "./data/content";
import { Cursor } from "./components/Cursor";
import { Navigation, MobileMenu } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/ProjectsSection";
import { WhySection } from "./components/WhySection";
import { TeamSection } from "./components/TeamSection";
import { CtaSection, Footer } from "./components/CtaFooter";
import { ProjectDetail } from "./components/ProjectDetail";
import { Lightbox } from "./components/Lightbox";

export function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const project = projects.find(
    (p: { id: string }) => path === `/project/${p.id}`
  );

  const openProject = (id: string) => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      window.history.pushState({}, "", `/project/${id}`);
      setPath(`/project/${id}`);
      window.scrollTo(0, 0);
      return;
    }

    const overlay = transitionRef.current;
    if (overlay) {
      gsap
        .timeline()
        .set(overlay, { display: "flex" })
        .fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.inOut" }
        )
        .add(() => {
          window.history.pushState({}, "", `/project/${id}`);
          setPath(`/project/${id}`);
          window.scrollTo(0, 0);
        })
        .to(overlay, {
          clipPath: "inset(100% 0 0% 0)",
          duration: 0.5,
          ease: "power3.inOut",
          delay: 0.1,
        })
        .set(overlay, { display: "none" });
    } else {
      window.history.pushState({}, "", `/project/${id}`);
      setPath(`/project/${id}`);
      window.scrollTo(0, 0);
    }
  };

  const goHome = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      window.history.pushState({}, "", "/");
      setPath("/");
      window.scrollTo(0, 0);
      return;
    }

    const overlay = transitionRef.current;
    if (overlay) {
      gsap
        .timeline()
        .set(overlay, { display: "flex" })
        .fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.inOut" }
        )
        .add(() => {
          window.history.pushState({}, "", "/");
          setPath("/");
          window.scrollTo(0, 0);
        })
        .to(overlay, {
          clipPath: "inset(100% 0 0% 0)",
          duration: 0.5,
          ease: "power3.inOut",
          delay: 0.1,
        })
        .set(overlay, { display: "none" });
    } else {
      window.history.pushState({}, "", "/");
      setPath("/");
      window.scrollTo(0, 0);
    }
  };

  const scrollToProjects = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Cursor />
      <div ref={transitionRef} className="page-transition" aria-hidden="true">
        <span>Bee Home Creators</span>
      </div>
      {project ? (
        <ProjectDetail project={project} onBack={goHome} />
      ) : (
        <>
          <Navigation onMenu={() => setMenuOpen(true)} transparent />
          {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
          <main>
            <Hero onExplore={scrollToProjects} />
            <ProjectsSection
              onOpen={openProject}
              onZoom={(src, alt) => setZoomImage({ src, alt })}
            />
            <WhySection />
            <TeamSection />
            <CtaSection />
          </main>
          <Footer />
        </>
      )}
      {zoomImage && (
        <Lightbox
          src={zoomImage.src}
          alt={zoomImage.alt}
          onClose={() => setZoomImage(null)}
        />
      )}
    </>
  );
}
