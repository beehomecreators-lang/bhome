import { projects } from "../data/content";

const routes: Record<string, string> = {
  "kungumam-nagar": "/kungumam-nagar",
  "sre-vasantham-avenue": "/vasantham-avenue",
  "sri-vellaiyammal-garden-69": "/shree-vellaiyammal-garden",
  "sathya-nagar": "/sathya-nagar",
};

export function SignatureProjectsSection() {
  const go = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
  };

  return (
    <section className="signature-section" id="signature-projects">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="kicker">
              <span className="kicker-line" />
              Selected developments
            </div>
            <h2 className="section-title">
              Our <em>Signature Projects.</em>
            </h2>
          </div>
          <p className="section-desc">
            Explore the four projects currently featured by Bee Home Creators.
            Select a project to view its dedicated page.
          </p>
        </div>

        <div className="signature-grid">
          {projects.map((project, index) => {
            const path = routes[project.id];
            const title =
              project.id === "sri-vellaiyammal-garden-69"
                ? "Shree Vellaiyammal Garden"
                : project.name;
            return (
              <button
                key={project.id}
                className="signature-card"
                type="button"
                onClick={() => go(path)}
              >
                <div className="signature-image">
                  <img src={project.image} alt={title} loading="lazy" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="signature-copy">
                  <span>{project.type}</span>
                  <h3>{title}</h3>
                  <p>{project.location}</p>
                  <strong>View project →</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
