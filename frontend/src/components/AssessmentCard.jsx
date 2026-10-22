import { ArrowRight, ClipboardCheck, Clock3 } from "lucide-react";

export default function AssessmentCard({
  assessment,
  onStart,
  onClick
}) {
  const title = assessment?.title || assessment?.name || "Skill assessment";
  const difficulty = assessment?.difficulty || "Beginner";
  const questions = Number(
    assessment?.question_count ?? assessment?.total_questions ?? 10
  );
  const duration = Number(assessment?.duration_minutes ?? assessment?.duration ?? 15);
  const completed = Boolean(assessment?.completed ?? assessment?.is_completed);
  const score = assessment?.score;

  function handleAction() {
    if (onStart) {
      onStart(assessment);
    } else {
      onClick?.(assessment);
    }
  }

  return (
    <article className="sf-assessment-card">
      <div className="sf-assessment-top">
        <span className="sf-assessment-icon">
          <ClipboardCheck size={21} />
        </span>
        <span className={`sf-assessment-difficulty ${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      </div>

      <h3>{title}</h3>
      <p className="sf-assessment-description">
        {assessment?.description || "Test your knowledge and identify areas to improve."}
      </p>

      <div className="sf-assessment-meta">
        <span>{questions} questions</span>
        <span><Clock3 size={14} /> {duration} min</span>
      </div>

      {completed && score != null && (
        <div className="sf-assessment-score">
          Previous score: <strong>{score}%</strong>
        </div>
      )}

      <button
        type="button"
        className="sf-assessment-button"
        onClick={handleAction}
      >
        {completed ? "Retake assessment" : "Start assessment"}
        <ArrowRight size={16} />
      </button>

      <style>{`
        .sf-assessment-card {
          padding: 22px;
          border: 1px solid #27312b;
          border-radius: 14px;
          background: #111715;
        }

        .sf-assessment-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sf-assessment-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 11px;
          color: #b8ed8a;
          background: #1a2518;
        }

        .sf-assessment-difficulty {
          padding: 5px 9px;
          border-radius: 20px;
          color: #b8ed8a;
          background: #23321f;
          font-size: 10px;
          text-transform: capitalize;
        }

        .sf-assessment-difficulty.intermediate {
          color: #f2cf83;
          background: #342d1b;
        }

        .sf-assessment-difficulty.advanced {
          color: #ffaaa0;
          background: #3a211f;
        }

        .sf-assessment-card h3 {
          margin: 19px 0 8px;
          color: #edf1ed;
          font-size: 17px;
        }

        .sf-assessment-description {
          min-height: 42px;
          margin: 0;
          color: #929d95;
          font-size: 12px;
          line-height: 1.75;
        }

        .sf-assessment-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 20px;
          color: #929d95;
          font-size: 11px;
        }

        .sf-assessment-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .sf-assessment-score {
          margin-top: 14px;
          color: #929d95;
          font-size: 12px;
        }

        .sf-assessment-score strong {
          color: #b8ed8a;
        }

        .sf-assessment-button {
          width: 100%;
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 22px;
          padding: 0 13px;
          border: 1px solid #354333;
          border-radius: 9px;
          color: #b8ed8a;
          background: #192319;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .sf-assessment-button:hover {
          border-color: #b8ed8a;
          background: #223020;
        }
      `}</style>
    </article>
  );
}
