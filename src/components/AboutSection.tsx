export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-heading about-heading">
          <div>
            <div className="kicker">
              <span className="kicker-line" />
              About us
            </div>
            <h2 className="section-title">
              About <em>Bee Home Creators.</em>
            </h2>
          </div>
          <p className="section-desc">
            A growing real estate company focused on quality residential spaces,
            reliable property solutions, and long-term customer relationships.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <h3>About Bee Home Creators</h3>
            <p>
              Bee Home Creators is a growing real estate company committed to
              creating quality living spaces and providing reliable property
              solutions for individuals and families. We focus on thoughtfully
              planned residential projects, strategic locations, quality
              development, essential amenities, and customer satisfaction.
            </p>
            <p>
              Our goal is to make property ownership a smooth and trustworthy
              experience by maintaining transparency, professional service, and
              strong customer relationships.
            </p>
            <p>
              At Bee Home Creators, we believe that a home is more than a
              property—it is a place where people build their lives, memories,
              and future.
            </p>

            <div className="about-address">
              <span className="panel-kicker">Company location</span>
              <strong>Bee Home Creators</strong>
              <p>49, Madhavan Salai, KK Nagar,<br />Trichy – 620021, Tamil Nadu, India</p>
            </div>
          </div>

          <div className="about-side">
            <article className="leadership-card">
              <span className="panel-kicker">Leadership</span>
              <div className="leadership-avatar">RS</div>
              <h3>Ranjith Sakthivel</h3>
              <p>General Manager &amp; Owner</p>
              <small>Bee Home Creators</small>
            </article>

            <div className="vision-card">
              <span className="panel-kicker">Our Vision</span>
              <p>
                To become a trusted and respected name in the real estate
                industry by creating quality residential spaces and delivering
                lasting value to our customers.
              </p>
            </div>

            <div className="vision-card">
              <span className="panel-kicker">Our Mission</span>
              <p>
                To develop well-planned properties with quality, convenience,
                connectivity, and customer-focused service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
