
import {
  ArrowRight,
  FolderKanban,
  Clock3,
  Target,
  Sparkles
} from "lucide-react";

export default function ProjectRecommendation({
  project,
  onView,
  onStart
}) {
  const title =
    project?.title || project?.name || "Recommended project";

  const description =
    project?.description ||
    "Build practical experience and strengthen your portfolio.";

  const skills =
    project?.target_skills ||
    project?.skills ||
    project?.required_skills ||
    [];

  const difficulty = project?.difficulty || "Intermediate";
  const duration = project?.estimated_duration || project?.duration || "Flexible";

  const skillNames = skills.map((skill) =>
    typeof skill === "string"
      ? skill
      : skill?.name || skill?.skill_name || "Skill"
  );

  return (
    <article className="sf-project-rec">
      <div className="sf-project-rec-top">
        <span className="sf-project-rec-icon">
          <FolderKanban size={21} />
        </span>

        <span className="sf-project-rec-badge">
          <Sparkles size={12} />
          Recommended
        </span>
      </div>

      <h3>{title}</h3>

      <p className="sf-project-rec-description">
        {description}
      </p>

      <div className="sf-project-rec-meta">
        <span>
          <Target size={14} />
          {difficulty}
        </span>

        <span>
          <Clock3 size={14} />
          {duration}
        </span>
      </div>

      {skillNames.length > 0 && (
        <div className="sf-project-rec-skills">
          <span className="sf-project-rec-label">
            SKILLS YOU'LL PRACTICE
          </span>

          <div className="sf-project-rec-tags">
            {skillNames.slice(0, 5).map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}

            {skillNames.length > 5 && (
              <span>+{skillNames.length - 5}</span>
            )}
          </div>
        </div>
      )}

      <div className="sf-project-rec-actions">
        <button
          type="button"
          className="sf-project-rec-secondary"
          onClick={() => onView?.(project)}
        >
          Details
        </button>

        <button
          type="button"
          className="sf-project-rec-primary"
          onClick={() => onStart?.(project)}
        >
          Start project
          <ArrowRight size={15} />
        </button>
      </div>

      <style>{`
        .sf-project-rec {
          min-width: 0;
          padding: 22px;
          border: 1px solid #27312b;
          border-radius: 14px;
          background: #111715;
          transition: border-color 180ms ease;
        }

        .sf-project-rec:hover {
          border-color: #425640;
        }

        .sf-project-rec-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sf-project-rec-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 11px;
          color: #b8ed8a;
          background: #1a2518;
        }

        .sf-project-rec-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 8px;
          border-radius: 20px;
          color: #b8ed8a;
          background: #23321f;
          font-size: 10px;
        }

        .sf-project-rec h3 {
          margin: 20px 0 9px;
          overflow-wrap: anywhere;
          color: #edf1ed;
          font-size: 17px;
        }

        .sf-project-rec-description {
          min-height: 42px;
          margin: 0;
          color: #929d95;
          font-size: 12px;
          line-height: 1.8;
        }

        .sf-project-rec-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 17px;
          margin-top: 18px;
        }

        .sf-project-rec-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #aab5ac;
          font-size: 11px;
        }

        .sf-project-rec-meta svg {
          color: #b8ed8a;
        }

        .sf-project-rec-skills {
          margin-top: 20px;
        }

        .sf-project-rec-label {
          color: #77847a;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .sf-project-rec-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 10px;
        }

        .sf-project-rec-tags span {
          padding: 6px 8px;
          border: 1px solid #303a33;
          border-radius: 6px;
          color: #b9c5ba;
          background: #151c17;
          font-size: 10px;
        }

        .sf-project-rec-actions {
          display: flex;
          gap: 9px;
          margin-top: 23px;
        }

        .sf-project-rec-actions button {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          border: 1px solid #354333;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .sf-project-rec-secondary {
          color: #c0cbc1;
          background: transparent;
        }

        .sf-project-rec-primary {
          flex: 1;
          color: #10170d;
          background: #b8ed8a;
        }

        .sf-project-rec-primary:hover {
          background: #d1f8b5;
        }

        .sf-project-rec-secondary:hover {
          border-color: #b8ed8a;
        }
      `}</style>
    </article>
  );
}
