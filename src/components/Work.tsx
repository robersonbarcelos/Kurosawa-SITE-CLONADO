import { cases } from "@/data/content";

export function Work() {
  return (
    <section className="pin-wrap" id="work">
      <div className="pin-stage">
        <div className="pin-head">
          <div>
            <span className="eyebrow">/work</span>
            <h2 className="h-display h-lg">
              <span className="outline">cases</span>
            </h2>
          </div>
          <div className="pin-dots">
            {cases.map((c, i) => (
              <i key={c.idx} className={i === 0 ? "on" : undefined} />
            ))}
            <span className="pin-count">01 / {String(cases.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="htrack">
          {cases.map((c, i) => (
            <a href="#contact" className={`hcard${i === 0 ? " on" : ""}`} key={c.idx}>
              <div className="hcard-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.bg} alt="" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hcard-device" src={c.device} alt="" />
              <div className="hcard-accent" />
              <div className="hcard-num">{c.idx}</div>
              <div className="hcard-body">
                <div className="hcard-meta">
                  <span className="idx">{c.idx}</span>
                  <i className="sep" />
                  <span className="cat">{c.cat}</span>
                </div>
                <h3 className="hcard-name">{c.name}</h3>
                <p className="hcard-tagline">{c.tagline}</p>
                <p className="hcard-desc">{c.desc}</p>
                <div className="hcard-tags">
                  {c.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="hcard-go">
                  View case <i>↗</i>
                </span>
              </div>
              <div className="hcard-year">{c.year}</div>
            </a>
          ))}
        </div>

        <div className="pin-hint">
          <span>scroll to explore</span>
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l8 8 8-8" />
          </svg>
        </div>
      </div>
    </section>
  );
}
