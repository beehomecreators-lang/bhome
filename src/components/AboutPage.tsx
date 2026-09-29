import { Navigation } from "./Navigation";
import { AboutSection } from "./AboutSection";
import { SignatureProjectsSection } from "./SignatureProjectsSection";
import { CtaSection, Footer } from "./CtaFooter";

export function AboutPage() {
  return (
    <div className="standalone-page">
      <Navigation onMenu={() => {}} />
      <main>
        <AboutSection />
        <SignatureProjectsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
