export function Hero() {
  return (
    <div className="hero-wrap" id="top">
      <header className="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-portrait.svg" alt="" />
        </div>
        <div className="hero-veil" />
        <div className="hero-rule" />
        <div className="hero-status" data-hero-fade>
          <i className="dot" />
          <span>Available for work</span>
        </div>
        <div className="hero-place" data-hero-fade>
          Your City · Country · 2026
        </div>
        <div className="hero-inner">
          <span className="mask">
            <span className="hero-kicker">Firstname</span>
          </span>
          <span className="mask">
            <span className="hero-name">Lastname</span>
          </span>
          <div className="hero-tag" data-hero-fade>
            <i className="bar" />
            <span>
              <b>Designer</b> · Leader · Art Director
            </span>
          </div>
          <p className="hero-blurb" data-hero-fade>
            15+ years placeholder blurb: a short paragraph about design leadership, product thinking and the
            teams built along the way.
          </p>
          <div className="hero-actions" data-hero-fade>
            <a href="#contact" className="btn btn-primary">
              Download CV ↓
            </a>
            <a href="#work" className="btn btn-ghost">
              /view work
            </a>
          </div>
        </div>
        <div className="hero-scroll" data-hero-fade>
          <span>scroll</span>
          <i />
        </div>
      </header>
    </div>
  );
}
