import { stats } from "@/data/content";

export function Stats() {
  return (
    <section className="stats section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">/numbers</span>
          <h2 className="h-display h-lg" data-split>
            By the <span className="outline">numbers</span>
          </h2>
        </div>
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat fade-up" key={s.label}>
              <div className="stat-number" data-value={s.value} data-suffix={s.suffix}>
                {s.value}
                {s.suffix}
              </div>
              <div className="stat-label">{s.label}</div>
              <p className="stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
