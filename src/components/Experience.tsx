import { experience } from "@/data/content";

export function Experience() {
  return (
    <section className="stack-wrap" id="experience">
      <div className="stack-stage">
        <div className="stack-head">
          <div>
            <span className="eyebrow">/experience</span>
            <h2 className="h-display h-lg">
              <span className="outline">history</span>
            </h2>
          </div>
          <p className="lede">
            15+ years placeholder lede: a one-sentence summary of the career path across companies and roles.
          </p>
        </div>
        <div className="stack-area">
          {experience.map((e, i) => (
            <article className={`stack-item${i === 0 ? " on" : ""}`} key={e.num}>
              <div className="stack-card">
                <div className="stack-num">{e.num}</div>
                <div>
                  <div className="stack-title">
                    <h3>{e.company}</h3>
                    <span className="role">{e.role}</span>
                  </div>
                  <p className="stack-desc">{e.desc}</p>
                  <div className="stack-tags">
                    {e.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="stack-side">
                  <span className="stack-year">{e.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
