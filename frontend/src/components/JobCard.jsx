
import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";

export default function JobCard({ job, onClick }) {
  const title = job?.title || job?.role || "Untitled position";
  const company = job?.company || job?.company_name || "Company not specified";
  const location = job?.location || "Location not specified";
  const skills = job?.required_skills || job?.skills || [];
  const match = job?.match_percentage ?? job?.match_score;

  return (
    <article className="sf-job-card">
      <div className="sf-job-header">
        <div className="sf-job-icon">
          <BriefcaseBusiness size={21} />
        </div>

        {match != null && (
          <span className="sf-job-match">
            {Math.round(Number(match))}% match
          </span>
        )}
      </div>

      <h3>{title}</h3>
      <p className="sf-job-company">{company}</p>

      <div className="sf-job-location">
        <MapPin size={14} />
        <span>{location}</span>
      </div>

      {job?.employment_type && (
        <span className="sf-job-employment">{job.employment_type}</span>
      )}

      <div className="sf-job-skills">
        {skills.slice(0, 4).map((skill, index) => {
          const skillName =
            typeof skill === "string"
              ? skill
              : skill?.name || skill?.skill_name || "Skill";

          return (
            <span key={`${skillName}-${index}`} className="sf-job-skill">
              {skillName}
            </span>
          );
        })}
        {skills.length > 4 && (
          <span className="sf-job-skill">+{skills.length - 4}</span>
        )}
      </div>

      <button
        type="button"
        className="sf-job-details"
        onClick={() => onClick?.(job)}
      >
        View opportunity <ArrowUpRight size={16} />
      </button>

      <style>{`
        .sf-job-card {
          min-width: 0;
          padding: 22px;
          border: 1px solid #27312b;
          border-radius: 14px;
          background: #111715;
          transition: border-color 180ms ease, transform 180ms ease;
        }

        .sf-job-card:hover {
          transform: translateY(-2px);
          border-color: #425640;
        }

        .sf-job-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sf-job-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 11px;
          color: #b8ed8a;
          background: #1a2518;
        }

        .sf-job-match {
          padding: 6px 9px;
          border-radius: 20px;
          color: #b8ed8a;
          background: #23321f;
          font-size: 10px;
          font-weight: 600;
        }

        .sf-job-card h3 {
          margin: 20px 0 7px;
          overflow-wrap: anywhere;
          color: #edf1ed;
          font-size: 17px;
        }

        .sf-job-company {
          margin: 0;
          color: #c0cbc1;
          font-size: 13px;
        }

        .sf-job-location {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 14px;
          color: #929d95;
          font-size: 11px;
        }

        .sf-job-location span {
          overflow-wrap: anywhere;
        }

        .sf-job-employment {
          display: inline-block;
          margin-top: 13px;
          padding: 5px 8px;
          border: 1px solid #303a33;
          border-radius: 6px;
          color: #b9c5ba;
          font-size: 10px;
        }

        .sf-job-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 17px;
        }

        .sf-job-skill {
          padding: 5px 8px;
          border: 1px solid #303a33;
          border-radius: 6px;
          color: #aab5ac;
          background: #151c17;
          font-size: 10px;
        }

        .sf-job-details {
          width: 100%;
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 22px;
          padding: 0 12px;
          border: 1px solid #354333;
          border-radius: 9px;
          color: #b8ed8a;
          background: #192319;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .sf-job-details:hover {
          border-color: #b8ed8a;
        }
      `}</style>
    </article>
  );
}
