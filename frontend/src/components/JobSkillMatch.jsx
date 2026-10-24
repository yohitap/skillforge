
import { CheckCircle2, XCircle, Target } from "lucide-react";

export default function JobSkillMatch({ match, onSkillClick }) {
  const matchedSkills = match?.matched_skills || match?.matched || [];
  const missingSkills = match?.missing_skills || match?.missing || [];
  const requiredSkills = match?.required_skills || [];

  const score = Math.min(
    100,
    Math.max(
      0,
      Number(
        match?.match_percentage ??
        match?.match_score ??
        match?.score ??
        0
      )
    )
  );

  function getName(skill) {
    return typeof skill === "string"
      ? skill
      : skill?.name || skill?.skill_name || "Unknown skill";
  }

  return (
    <section className="sf-job-match-panel">
      <div className="sf-jsm-header">
        <div>
          <span className="sf-jsm-eyebrow">JOB COMPATIBILITY</span>
          <h3>Skill match analysis</h3>
          <p>Compare your current skills with this role's requirements.</p>
        </div>

        <div className="sf-jsm-score">
          <Target size={17} />
          <strong>{Math.round(score)}%</strong>
        </div>
      </div>

      <div
        className="sf-jsm-progress"
        role="progressbar"
        aria-label="Job skill match"
        aria-valuenow={Math.round(score)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div style={{ width: `${score}%` }} />
      </div>

      <div className="sf-jsm-columns">
        <div className="sf-jsm-section">
          <h4>
            <CheckCircle2 size={17} />
            Skills you have ({matchedSkills.length})
          </h4>

          {matchedSkills.length ? (
            <div className="sf-jsm-tags">
              {matchedSkills.map((skill, index) => (
                <button
                  type="button"
                  key={`${getName(skill)}-${index}`}
                  onClick={() => onSkillClick?.(skill)}
                  className="sf-jsm-tag matched"
                >
                  {getName(skill)}
                </button>
              ))}
            </div>
          ) : (
            <p className="sf-jsm-empty">No matched skills have been identified yet.</p>
          )}
        </div>

        <div className="sf-jsm-section">
          <h4>
            <XCircle size={17} />
            Skills to develop ({missingSkills.length})
          </h4>

          {missingSkills.length ? (
            <div className="sf-jsm-tags">
              {missingSkills.map((skill, index) => (
                <button
                  type="button"
                  key={`${getName(skill)}-${index}`}
                  onClick={() => onSkillClick?.(skill)}
                  className="sf-jsm-tag missing"
                >
                  {getName(skill)}
                </button>
              ))}
            </div>
          ) : (
            <p className="sf-jsm-empty">No missing skills reported.</p>
          )}
        </div>
      </div>

      {requiredSkills.length > 0 && (
        <p className="sf-jsm-required">
          Based on {requiredSkills.length} listed job requirements.
        </p>
      )}

      <style>{`
        .sf-job-match-panel {
          padding: 23px;
          border: 1px solid #27312b;
          border-radius: 15px;
          background: #111715;
        }

        .sf-jsm-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .sf-jsm-eyebrow {
          color: #b8ed8a;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        .sf-jsm-header h3 {
          margin: 9px 0 7px;
          color: #edf1ed;
          font-size: 17px;
        }

        .sf-jsm-header p {
          margin: 0;
          color: #929d95;
          font-size: 12px;
          line-height: 1.7;
        }

        .sf-jsm-score {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 7px;
          color: #b8ed8a;
        }

        .sf-jsm-score strong {
          font-size: 21px;
        }

        .sf-jsm-progress {
          height: 6px;
          margin: 22px 0;
          overflow: hidden;
          border-radius: 8px;
          background: #27312b;
        }

        .sf-jsm-progress div {
          height: 100%;
          border-radius: inherit;
          background: #b8ed8a;
          transition: width 300ms ease;
        }

        .sf-jsm-columns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .sf-jsm-section h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 14px;
          color: #dce4dd;
          font-size: 12px;
        }

        .sf-jsm-section:first-child h4 svg {
          color: #b8ed8a;
        }

        .sf-jsm-section:last-child h4 svg {
          color: #f0ad8e;
        }

        .sf-jsm-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .sf-jsm-tag {
          padding: 7px 10px;
          border: 1px solid #303a33;
          border-radius: 7px;
          font-size: 11px;
          cursor: pointer;
        }

        .sf-jsm-tag.matched {
          color: #c9efb0;
          background: #1b2b1c;
        }

        .sf-jsm-tag.missing {
          color: #f0b8a8;
          background: #30211e;
        }

        .sf-jsm-tag:hover {
          border-color: #75856e;
        }

        .sf-jsm-empty {
          color: #929d95;
          font-size: 12px;
          line-height: 1.7;
        }

        .sf-jsm-required {
          margin: 20px 0 0;
          padding-top: 14px;
          border-top: 1px solid #27312b;
          color: #77847a;
          font-size: 10px;
        }

        @media (max-width: 600px) {
          .sf-jsm-columns {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
