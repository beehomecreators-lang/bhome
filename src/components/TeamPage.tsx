import { Navigation } from "./Navigation";
import { TeamSection } from "./TeamSection";
import { Footer } from "./CtaFooter";

export function TeamPage() {
  return (
    <div className="standalone-page">
      <Navigation onMenu={() => {}} />
      <main>
        <div className="standalone-page-intro container">
          <div className="kicker">
            <span className="kicker-line" />
            Bee Home Creators
          </div>
          <h1>Our <em>Team.</em></h1>
          <p>
            Meet the people behind Bee Home Creators. Existing employee
            information is presented below without modification.
          </p>
        </div>
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
