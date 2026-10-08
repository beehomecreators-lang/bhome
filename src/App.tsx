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
import { AboutSection } from "./components/AboutSection";
import { SignatureProjectsSection } from "./components/SignatureProjectsSection";
import { TeamPage } from "./components/TeamPage";
import { AboutPage } from "./components/AboutPage";
import { Lightbox } from "./components/Lightbox";
import { AdminPage } from "./components/AdminPage";

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

  // Make all content images interactive: clicking an image opens it full size.
  // Links are excluded so image-based links (such as the footer brand) keep their normal behavior.
  useEffect(() => {
    const onImageClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (target.closest(".lightbox")) return;
      if (target.closest("a")) return;

      setZoomImage({
        src: target.currentSrc || target.src,
        alt: target.alt || "Bee Home Creators image",
      });
    };

    document.addEventListener("click", onImageClick);
    return () => document.removeEventListener("click", onImageClick);
  }, []);

  const projectRoutes: Record<string, string> = {
    "sre-vasantham-avenue": "/vasantham-avenue",
    "kungumam-nagar": "/kungumam-nagar",
    "sri-vellaiyammal-garden-69": "/shree-vellaiyammal-garden",
    "sathya-nagar": "/sathya-nagar",
  };
  const project = projects.find(
    (p: { id: string }) =>
      path === `/project/${p.id}` || path === projectRoutes[p.id]
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
      {path === "/admin" ? (
        <AdminPage />
      ) : project ? (
        <ProjectDetail key={project.id} project={project} onBack={goHome} />
      ) : path === "/team" || path === "/employees" ? (
        <TeamPage />
      ) : path === "/about" ? (
        <AboutPage />
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
            <AboutSection />
            <SignatureProjectsSection />
            <WhySection />
            <TeamSection />
            <CtaSection />
          </main>
          <Footer />
        </>
      )}
      <a href="/admin" aria-label="Admin panel" style={{position:"fixed",right:14,top:14,zIndex:1000,width:42,height:42,borderRadius:"50%",background:"#1f241f",color:"#fff",display:"grid",placeItems:"center",textDecoration:"none",fontSize:20,boxShadow:"0 8px 24px rgba(0,0,0,.2)"}}>🐝</a>
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
