
import { useState } from "react";

function getLevelClass(level) {
  if (level >= 80) return "sf-heat-strong";
  if (level >= 60) return "sf-heat-good";
  if (level >= 35) return "sf-heat-growing";
  return "sf-heat-low";
}

export default function SkillHeatmap({
  skills = [],
  onSkillClick,
  title = "Skill proficiency",
  description = "Your current strengths and areas to develop."
}) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const normalizedSkills = skills.map((skill, index) => ({
    ...skill,
    id: skill.id ?? skill.skill_id ?? skill.name ?? index,
    name: skill.name ?? skill.skill_name ?? "Unnamed skill",
    level: Math.min(
      100,
      Math.max(
        0,
        Number(skill.proficiency ?? skill.level ?? skill.current_level ?? 0)
      )
    )
  }));

  function handleSelect(skill) {
    setSelectedSkill(skill);
    onSkillClick?.(skill);
  }

  return (
    <section className="sf-heatmap">
      <header className="sf-heatmap-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="sf-heatmap-count">
          {normalizedSkills.length} skills
        </span>
      </header>

      {normalizedSkills.length === 0 ? (
        <div className="sf-heatmap-empty">
          Your skill map will appear here once you add skills.
        </div>
      ) : (
        <div className="sf-heatmap-grid">
          {normalizedSkills.map((skill) => (
            <button
              type="button"
              key={skill.id}
              className={`sf-heatmap-tile ${getLevelClass(skill.level)}`}
              onClick={() => handleSelect(skill)}
              aria-pressed={selectedSkill?.id === skill.id}
              title={`${skill.name}: ${skill.level}% proficiency`}
            >
              <span className="sf-heatmap-name">{skill.name}</span>
              <strong>{skill.level}%</strong>
            </button>
          ))}
        </div>
      )}

      <footer className="sf-heatmap-legend">
        <span><i className="sf-heat-low" /> Beginner</span>
        <span><i className="sf-heat-growing" /> Developing</span>
        <span><i className="sf-heat-good" /> Proficient</span>
        <span><i className="sf-heat-strong" /> Strong</span>
      </footer>

      {selectedSkill && (
        <div className="sf-heatmap-selected" aria-live="polite">
          <span>
            Selected: <strong>{selectedSkill.name}</strong>
          </span>
          <span>{selectedSkill.level}% proficiency</span>
          <button
            type="button"
            onClick={() => setSelectedSkill(null)}
          >
            Clear
          </button>
        </div>
      )}

      <style>{`
        .sf-heatmap {
          padding: 23px;
          border: 1px solid #27312b;
          border-radius: 15px;
          background: #111715;
        }

        .sf-heatmap-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 22px;
        }

        .sf-heatmap-header h3 {
          margin: 0 0 7px;
          color: #edf1ed;
          font-size: 16px;
        }

        .sf-heatmap-header p {
          margin: 0;
          color: #929d95;
          font-size: 12px;
          line-height: 1.7;
        }

        .sf-heatmap-count {
          flex-shrink: 0;
          color: #929d95;
          font-size: 11px;
        }

        .sf-heatmap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
          gap: 10px;
        }

        .sf-heatmap-tile {
          min-width: 0;
          min-height: 84px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 13px;
          border: 1px solid transparent;
          border-radius: 10px;
          text-align: left;
          cursor: pointer;
          transition: transform 160ms ease, border-color 160ms ease;
        }

        .sf-heatmap-tile:hover {
          transform: translateY(-2px);
          border-color: #b8ed8a;
        }

        .sf-heatmap-tile[aria-pressed="true"] {
          border-color: #b8ed8a;
          outline: 1px solid #b8ed8a;
        }

        .sf-heatmap-name {
          overflow-wrap: anywhere;
          font-size: 12px;
        }

        .sf-heatmap-tile strong {
          font-size: 19px;
          font-weight: 700;
        }

        .sf-heat-low {
          color: #ffb1a7;
          background: #352321;
        }

        .sf-heat-growing {
          color: #f1d18b;
          background: #352e1d;
        }

        .sf-heat-good {
          color: #d1ed9b;
          background: #29331e;
        }

        .sf-heat-strong {
          color: #b8ed8a;
          background: #1b3020;
        }

        .sf-heatmap-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 22px;
        }

        .sf-heatmap-legend span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #929d95;
          font-size: 10px;
        }

        .sf-heatmap-legend i {
          width: 9px;
          height: 9px;
          border-radius: 3px;
        }

        .sf-heatmap-selected {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 17px;
          padding-top: 14px;
          border-top: 1px solid #27312b;
          color: #929d95;
          font-size: 12px;
        }

        .sf-heatmap-selected strong {
          color: #edf1ed;
        }

        .sf-heatmap-selected button {
          margin-left: auto;
          border: 0;
          color: #b8ed8a;
          background: transparent;
          cursor: pointer;
        }

        .sf-heatmap-empty {
          padding: 35px 10px;
          color: #929d95;
          text-align: center;
          font-size: 13px;
        }

        @media (max-width: 480px) {
          .sf-heatmap {
            padding: 17px;
          }

          .sf-heatmap-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
