import { Link } from "react-router-dom";

export default function PlaceholderPage({ title, description }) {
  return (
    <main className="sf-page">
      <span className="sf-eyebrow">COMING SOON</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to="/dashboard" className="sf-primary-link">
        Back to dashboard
      </Link>

      <style>{`
        .sf-page {
          color: #edf1ed;
          font-family: Inter, system-ui, sans-serif;
        }
        .sf-eyebrow {
          color: #a7d985;
          font-size: 10px;
          letter-spacing: 1.4px;
          font-weight: 700;
        }
        .sf-page h1 {
          font-size: clamp(25px, 3vw, 34px);
          letter-spacing: -1px;
          margin: 10px 0;
        }
        .sf-page p {
          color: #9ba79d;
          font-size: 13px;
          line-height: 1.8;
          max-width: 520px;
        }
        .sf-primary-link {
          display: inline-flex;
          margin-top: 18px;
          padding: 11px 14px;
          border-radius: 8px;
          background: #b8ed8a;
          color: #14200f;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }
      `}</style>
    </main>
  );
}
