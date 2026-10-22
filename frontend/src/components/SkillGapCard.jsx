
import { AlertTriangle, ArrowRight, Target } from "lucide-react";

export default function SkillGapCard({
  gap,
  onAction,
  compact = false
}) {
  const name =
    gap?.skill_name || gap?.skill?.name || gap?.name || "Unknown skill";

  const current = Math.min(
    100,
    Math.max(0, Number(gap?.current_level ?? gap?.current_proficiency ?? 0))
  );

  const required = Math.min(
    100,
    Math.max(0, Number(gap?.required_level ?? gap?.required_proficiency ?? 70))
  );

  const difference = Math.max(0, required - current);

  const priority =
    gap?.priority ||
    (difference >= 40 ? "High" : difference >= 20 ? "Medium" : "Low");

  const priorityClass = priority.toLowerCase();

  return (
    <article className={`sf-gap-card ${compact ? "sf-gap-compact" : ""}`}>
      <div className="sf-gap-heading">
        <span className="sf-gap-icon">
          {priorityClass === "high" ? (
            <AlertTriangle size={19} />
          ) : (
            <Target size={19} />
          )}
        </span>

        <span className={`sf-gap-priority ${priorityClass}`}>
          {priority} priority
        </span>
      </div>

      <h3>{name}</h3>

      {!compact && (
        <p className="sf-gap-description">
          {gap?.reason ||
            `Increase your proficiency by ${difference} points to reach the target level.`}
        </p>
      )}

      <div className="sf-gap-levels">
        <div>
          <span>Current</span>
          <strong>{current}%</strong>
        </div>
        <div>
          <span>Target</span>
          <strong>{required}%</strong>
        </div>
      </div>

      <div className="sf-gap-track">
        <div
          className="sf-gap-current"
          style={{ width: `${current}%` }}
        />
        <div
          className="sf-gap-target"
          style={{
            left: `${required}%`,
            display: required === 100 ? "none" : "block"
          }}
        />
      </div>

      <div className="sf-gap-footer">
        <span>{difference === 0 ? "Target reached" : `${difference} points to go`}</span>

        {onAction && difference > 0 && (
          <button
            type="button"
            onClick={() => onAction(gap)}
            className="sf-gap-action"
          >
            Improve <ArrowRight size={15} />
          </button>
        )}
      </div>

      <style>{`
        .sf-gap-card {
          padding: 21px;
          border: 1px solid #27312b;
          border-radius: 14px;
          background: #111715;
        }

        .sf-gap-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .sf-gap-icon {
          display: grid;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #354333;
          border-radius: 10px;
          color: #b8ed8a;
          background: #1a2518;
        }

        .sf-gap-priority {
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
        }

        .sf-gap-priority.high {
          color: #ffaaa0;
          background: #3a211f;
        }

        .sf-gap-priority.medium {
          color: #f2cf83;
          background: #342d1b;
        }

        .sf-gap-priority.low {
          color: #b8ed8a;
          background: #23321f;
        }

        .sf-gap-card h3 {
          margin: 18px 0 7px;
          color: #edf1ed;
          font-size: 16px;
        }

        .sf-gap-description {
          margin: 0 0 19px;
          color: #929d95;
          font-size: 12px;
          line-height: 1.7;
        }

        .sf-gap-levels {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin: 17px 0 11px;
        }

        .sf-gap-levels div {
          display: grid;
          gap: 5px;
        }

        .sf-gap-levels span {
          color: #929d95;
          font-size: 11px;
        }

        .sf-gap-levels strong {
          color: #edf1ed;
          font-size: 15px;
        }

        .sf-gap-track {
          position: relative;
          height: 6px;
          overflow: hidden;
          border-radius: 10px;
          background: #27312b;
        }

        .sf-gap-current {
          height: 100%;
          border-radius: inherit;
          background: #b8ed8a;
        }

        .sf-gap-target {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #f2cf83;
        }

        .sf-gap-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 16px;
          color: #929d95;
          font-size: 11px;
        }

        .sf-gap-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 0 5px 8px;
          border: 0;
          color: #b8ed8a;
          background: transparent;
          font-size: 12px;
          cursor: pointer;
        }

        .sf-gap-action:hover {
          color: #d1f8b5;
        }

        .sf-gap-compact {
          padding: 15px;
        }
      `}</style>
    </article>
  );
}
