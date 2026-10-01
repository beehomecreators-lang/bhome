import adminData from "../data/adminData.json";

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-heading about-heading">
          <div>
            <div className="kicker">
              <span className="kicker-line" />
              {adminData.site.aboutKicker}
            </div>
            <h2 className="section-title">
              About <em>Bee Home Creators.</em>
            </h2>
          </div>
          <p className="section-desc">
            {adminData.site.aboutDescription}
          </p>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <h3>About Bee Home Creators</h3>
            <p>
              {adminData.site.aboutBody[0]}
            </p>
            <p>
              {adminData.site.aboutBody[1]}
            </p>
            <p>
              {adminData.site.aboutBody[2]}
            </p>

            <div className="about-address">
              <span className="panel-kicker">Company location</span>
              <strong>Bee Home Creators</strong>
              <p>{adminData.site.companyLocation}</p>
            </div>
          </div>

          <div className="about-side">
            <article className="leadership-card">
              <span className="panel-kicker">Leadership</span>
              <div className="leadership-avatar">RS</div>
              <h3>{adminData.site.ownerName}</h3>
              <p>{adminData.site.ownerTitle}</p>
              <small>Bee Home Creators</small>
            </article>

            <div className="vision-card">
              <span className="panel-kicker">Our Vision</span>
              <p>
                {adminData.site.vision}
              </p>
            </div>

            <div className="vision-card">
              <span className="panel-kicker">Our Mission</span>
              <p>
                {adminData.site.mission}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
