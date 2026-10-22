import {
  ExternalLink,
  FileCheck2,
  Github,
  Award,
  FolderKanban,
  CalendarDays
} from "lucide-react";

const evidenceIcons = {
  project: FolderKanban,
  github: Github,
  certification: Award,
  certificate: Award,
  assessment: FileCheck2
};

export default function EvidenceCard({ evidence, onClick }) {
  const title = evidence?.title || evidence?.name || "Untitled evidence";
  const type = (evidence?.type || evidence?.evidence_type || "project").toLowerCase();
  const Icon = evidenceIcons[type] || FileCheck2;
  const status = evidence?.status || "Submitted";
  const date = evidence?.created_at || evidence?.date;
  const link = evidence?.url || evidence?.external_url;

  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : null;

  return (
    <article className="sf-evidence-card">
      <div className="sf-evidence-header">
        <span className="sf-evidence-icon">
          <Icon size={20} />
        </span>
        <span className="sf-evidence-type">{type}</span>
      </div>

      <h3>{title}</h3>

      <p className="sf-evidence-description">
        {evidence?.description || "Evidence submitted to demonstrate your skills."}
      </p>

      <div className="sf-evidence-footer">
        <div className="sf-evidence-status">
          <span className="sf-evidence-status-dot" />
          {status}
        </div>

        {formattedDate && (
          <span className="sf-evidence-date">
            <CalendarDays size={13} />
            {formattedDate}
          </span>
        )}
      </div>

      <div className="sf-evidence-actions">
        {onClick && (
          <button
            type="button"
            onClick={() => onClick(evidence)}
            className="sf-evidence-view"
          >
            View details
          </button>
        )}

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="sf-evidence-external"
            aria-label={`Open ${title}`}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      <style>{`
        .sf-evidence-card {
          min-width: 0;
          padding: 21px;
          border: 1px solid #27312b;
          border-radius: 14px;
          background: #111715;
        }

        .sf-evidence-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sf-evidence-icon {
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border-radius: 10px;
          color: #b8ed8a;
          background: #1a2518;
        }

        .sf-evidence-type {
          color: #929d95;
          font-size: 10px;
          text-transform: capitalize;
        }

        .sf-evidence-card h3 {
          margin: 18px 0 8px;
          overflow-wrap: anywhere;
          color: #edf1ed;
          font-size: 15px;
        }

        .sf-evidence-description {
          min-height: 40px;
          margin: 0;
          color: #929d95;
          font-size: 12px;
          line-height: 1.7;
        }

        .sf-evidence-footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid #27312b;
        }

        .sf-evidence-status,
        .sf-evidence-date {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #929d95;
          font-size: 10px;
        }

        .sf-evidence-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #b8ed8a;
        }

        .sf-evidence-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 14px;
        }

        .sf-evidence-view,
        .sf-evidence-external {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 0;
          color: #b8ed8a;
          background: transparent;
          font-size: 12px;
          cursor: pointer;
        }

        .sf-evidence-external {
          padding: 5px;
        }

        .sf-evidence-view:hover,
        .sf-evidence-external:hover {
          color: #d1f8b5;
        }
      `}</style>
    </article>
  );
}
