
import { ArrowUpRight, Code2 } from "lucide-react";

export default function SkillCard({
  skill,
  onClick,
  compact = false
}) {
  const name = skill?.name || skill?.skill_name || "Unnamed skill";
  const rawLevel = Number(skill?.proficiency ?? skill?.level ?? 0);
  const level = Math.min(100, Math.max(0, rawLevel));
  const category = skill?.category || "General";
  const status =
    level >= 80 ? "Strong" : level >= 50 ? "Developing" : "Needs work";

  return (
    <article
      className={`sf-skill-card ${compact ? "sf-skill-card-compact" : ""}`}
    >
      <div className="sf-skill-card-top">
        <span className="sf-skill-card-icon">
          <Code2 size={19} />
        </span>

        {onClick && (
          <button
            type="button"
            className="sf-skill-card-open"
            onClick={() => onClick(skill)}
            aria-label={`View ${name}`}
          >
            <ArrowUpRight size={18} />
          </button>
        )}
      </div>

      <div className="sf-skill-card-info">
        <span className="sf-skill-category">{category}</span>
        <h3>{name}</h3>
        {!compact && (
          <p className="sf-skill-status">{status}</p>
        )}
      </div>

      <div className="sf-skill-progress-label">
        <span>Proficiency</span>
        <strong>{level}%</strong>
      </div>

      <div
        className="sf-skill-progress-track"
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="sf-skill-progress-fill"
          style={{ width: `${level}%` }}
        />
      </div>

      <style>{`
        .sf-skill-card {
          min-width: 0;
          padding: 21px;
          border: 1px solid #27312b;
          border-radius: 14px;
          background: #111715;
          transition: border-color 180ms ease, transform 180ms ease;
        }

        .sf-skill-card:hover {
          transform: translateY(-2px);
          border-color: #425640;
        }

        .sf-skill-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sf-skill-card-icon {
          display: grid;
          width: 39px;
          height: 39px;
          place-items: center;
          border: 1px solid #354333;
          border-radius: 10px;
          color: #b8ed8a;
          background: #1a2518;
        }

        .sf-skill-card-open {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 1px solid #303a33;
          border-radius: 8px;
          color: #929d95;
          background: transparent;
          cursor: pointer;
        }

        .sf-skill-card-open:hover {
          color: #b8ed8a;
          border-color: #465c45;
        }

        .sf-skill-card-info {
          margin: 18px 0;
        }

        .sf-skill-category {
          color: #929d95;
          font-size: 11px;
        }

        .sf-skill-card-info h3 {
          margin: 7px 0;
          overflow-wrap: anywhere;
          color: #edf1ed;
          font-size: 17px;
          font-weight: 600;
        }

        .sf-skill-status {
          margin: 0;
          color: #b8ed8a;
          font-size: 12px;
        }

        .sf-skill-progress-label {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 9px;
          color: #929d95;
          font-size: 11px;
        }

        .sf-skill-progress-label strong {
          color: #edf1ed;
          font-weight: 600;
        }

        .sf-skill-progress-track {
          height: 5px;
          overflow: hidden;
          border-radius: 10px;
          background: #27312b;
        }

        .sf-skill-progress-fill {
          height: 100%;
          border-radius: inherit;
          background: #b8ed8a;
          transition: width 350ms ease;
        }

        .sf-skill-card-compact {
          padding: 15px;
        }

        .sf-skill-card-compact .sf-skill-card-info {
          margin: 13px 0;
        }

        .sf-skill-card-compact .sf-skill-card-info h3 {
          font-size: 15px;
        }
      `}</style>
    </article>
  );
}
