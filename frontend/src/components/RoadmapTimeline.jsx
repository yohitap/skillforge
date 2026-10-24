
import {
  CheckCircle2,
  Circle,
  Clock3,
  LockKeyhole,
  ArrowRight
} from "lucide-react";

function getStatus(step) {
  const status = (step.status || "").toLowerCase();

  if (
    step.completed === true ||
    status === "completed" ||
    status === "done"
  ) {
    return "completed";
  }

  if (
    step.current === true ||
    status === "in_progress" ||
    status === "in progress"
  ) {
    return "in-progress";
  }

  if (status === "locked" || step.locked === true) {
    return "locked";
  }

  return "upcoming";
}

export default function RoadmapTimeline({
  steps = [],
  onStepClick,
  onContinue
}) {
  const completedCount = steps.filter(
    (step) => getStatus(step) === "completed"
  ).length;

  const progress =
    steps.length > 0
      ? Math.round((completedCount / steps.length) * 100)
      : 0;

  return (
    <section className="sf-roadmap">
      <header className="sf-roadmap-header">
        <div>
          <span className="sf-roadmap-eyebrow">YOUR LEARNING JOURNEY</span>
          <h3>Roadmap timeline</h3>
          <p>Build skills step by step and track your progress.</p>
        </div>

        <div className="sf-roadmap-progress">
          <strong>{progress}%</strong>
          <span>complete</span>
        </div>
      </header>

      <div className="sf-roadmap-progress-track">
        <div style={{ width: `${progress}%` }} />
      </div>

      {steps.length === 0 ? (
        <div className="sf-roadmap-empty">
          <p>Your learning roadmap is waiting to be created.</p>
        </div>
      ) : (
        <div className="sf-roadmap-list">
          {steps.map((step, index) => {
            const status = getStatus(step);
            const title =
              step.title || step.name || `Learning step ${index + 1}`;

            const description =
              step.description || step.goal || "Continue developing your skills.";

            const duration =
              step.estimated_duration || step.duration || null;

            const Icon =
              status === "completed"
                ? CheckCircle2
                : status === "locked"
                  ? LockKeyhole
                  : status === "in-progress"
                    ? Clock3
                    : Circle;

            return (
              <div
                className={`sf-roadmap-step ${status}`}
                key={step.id ?? step.roadmap_step_id ?? index}
              >
                <div className="sf-roadmap-marker">
                  <Icon size={19} />
                </div>

                <div className="sf-roadmap-step-content">
                  <div className="sf-roadmap-step-top">
                    <span className="sf-roadmap-step-number">
                      STEP {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={`sf-roadmap-status ${status}`}>
                      {status === "in-progress"
                        ? "In progress"
                        : status === "completed"
                          ? "Completed"
                          : status === "locked"
                            ? "Locked"
                            : "Upcoming"}
                    </span>
                  </div>

                  <h4>{title}</h4>
                  <p>{description}</p>

                  {duration && (
                    <span className="sf-roadmap-duration">
                      <Clock3 size={13} />
                      {duration}
                    </span>
                  )}

                  {status !== "locked" && (
                    <button
                      type="button"
                      className="sf-roadmap-open"
                      onClick={() => onStepClick?.(step)}
                    >
                      {status === "completed" ? "Review step" : "View step"}
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {steps.some((step) => getStatus(step) === "in-progress") && (
        <button
          type="button"
          className="sf-roadmap-continue"
          onClick={() => onContinue?.(steps.find(
            (step) => getStatus(step) === "in-progress"
          ))}
        >
          Continue learning
          <ArrowRight size={16} />
        </button>
      )}

      <style>{`
        .sf-roadmap {
          padding: 24px;
          border: 1px solid #27312b;
          border-radius: 15px;
          background: #111715;
        }

        .sf-roadmap-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .sf-roadmap-eyebrow {
          color: #b8ed8a;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        .sf-roadmap-header h3 {
          margin: 9px 0 7px;
          color: #edf1ed;
          font-size: 17px;
        }

        .sf-roadmap-header p {
          margin: 0;
          color: #929d95;
          font-size: 12px;
          line-height: 1.7;
        }

        .sf-roadmap-progress {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          flex-shrink: 0;
        }

        .sf-roadmap-progress strong {
          color: #b8ed8a;
          font-size: 22px;
        }

        .sf-roadmap-progress span {
          color: #929d95;
          font-size: 10px;
        }

        .sf-roadmap-progress-track {
          height: 5px;
          margin: 22px 0 28px;
          overflow: hidden;
          border-radius: 8px;
          background: #27312b;
        }

        .sf-roadmap-progress-track div {
          height: 100%;
          border-radius: inherit;
          background: #b8ed8a;
          transition: width 300ms ease;
        }

        .sf-roadmap-list {
          display: flex;
          flex-direction: column;
        }

        .sf-roadmap-step {
          position: relative;
          display: grid;
          grid-template-columns: 28px minmax(0, 1fr);
          gap: 15px;
          padding-bottom: 27px;
        }

        .sf-roadmap-step:not(:last-child)::after {
          position: absolute;
          top: 30px;
          bottom: 0;
          left: 13px;
          width: 1px;
          background: #303a33;
          content: "";
        }

        .sf-roadmap-marker {
          z-index: 1;
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          border-radius: 50%;
          color: #77847a;
          background: #1a211c;
        }

        .sf-roadmap-step.completed .sf-roadmap-marker {
          color: #b8ed8a;
          background: #23321f;
        }

        .sf-roadmap-step.in-progress .sf-roadmap-marker {
          color: #10170d;
          background: #b8ed8a;
        }

        .sf-roadmap-step-content {
          min-width: 0;
          padding: 2px 0 0;
        }

        .sf-roadmap-step-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .sf-roadmap-step-number {
          color: #77847a;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .sf-roadmap-status {
          color: #929d95;
          font-size: 10px;
        }

        .sf-roadmap-status.completed {
          color: #b8ed8a;
        }

        .sf-roadmap-status.in-progress {
          color: #f2cf83;
        }

        .sf-roadmap-step h4 {
          margin: 10px 0 7px;
          color: #edf1ed;
          font-size: 14px;
          overflow-wrap: anywhere;
        }

        .sf-roadmap-step p {
          margin: 0;
          color: #929d95;
          font-size: 12px;
          line-height: 1.8;
        }

        .sf-roadmap-duration {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 11px;
          color: #aab5ac;
          font-size: 10px;
        }

        .sf-roadmap-open {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 0;
          border: 0;
          color: #b8ed8a;
          background: transparent;
          font-size: 11px;
          cursor: pointer;
        }

        .sf-roadmap-open:hover {
          color: #d1f8b5;
        }

        .sf-roadmap-continue {
          width: 100%;
          min-height: 43px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 4px;
          padding: 0 13px;
          border: 1px solid #354333;
          border-radius: 9px;
          color: #b8ed8a;
          background: #192319;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .sf-roadmap-continue:hover {
          border-color: #b8ed8a;
        }

        .sf-roadmap-empty {
          padding: 28px 0;
          color: #929d95;
          font-size: 12px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .sf-roadmap {
            padding: 17px;
          }
        }
      `}</style>
    </section>
  );
}
