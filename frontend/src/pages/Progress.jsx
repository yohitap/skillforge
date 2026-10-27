import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Target, BookOpen, RefreshCw } from "lucide-react";
import dashboardService from "../services/dashboardService";

export default function Progress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await dashboardService.getDashboard();
      setData(result?.data || result);
    } catch (e) {
      setError(e.message || "Could not load progress.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const percentage = Math.max(0, Math.min(100, Number(
    data?.progress_percentage ?? data?.completion_percentage ?? 0
  )));

  const activities = data?.recent_activities || data?.activities || [];

  return (
    <main className="sf-page">
      <header className="sf-page-header sf-progress-header">
        <div>
          <span className="sf-eyebrow">CONSISTENCY OVER PERFECTION</span>
          <h1>Your learning progress</h1>
          <p>Track your development and keep moving toward your career goals.</p>
        </div>
        <button className="sf-secondary" onClick={load} disabled={loading}>
          <RefreshCw size={15} /> Refresh
        </button>
      </header>

      {error && <div className="sf-alert">{error}</div>}

      {loading ? <p>Loading progress...</p> : (
        <>
          <section className="sf-progress-hero">
            <div className="sf-progress-circle" style={{ "--progress": `${percentage}%` }}>
              <div>
                <strong>{percentage}%</strong>
                <span>Overall progress</span>
              </div>
            </div>
            <div className="sf-progress-copy">
              <span className="sf-eyebrow">YOUR JOURNEY SO FAR</span>
              <h2>Every skill you build counts.</h2>
              <p>
                Use your roadmap and practical projects to turn learning
                into measurable progress. Your percentage reflects the
                progress value currently supplied by your backend.
              </p>
              <Link to="/roadmap" className="sf-primary">
                Continue learning <TrendingUp size={16} />
              </Link>
            </div>
          </section>

          <section className="sf-progress-stats">
            <article className="sf-panel">
              <Target size={21} />
              <span>Skills tracked</span>
              <strong>{data?.skills_count ?? data?.total_skills ?? 0}</strong>
            </article>
            <article className="sf-panel">
              <BookOpen size={21} />
              <span>Projects completed</span>
              <strong>{data?.completed_projects ?? 0}</strong>
            </article>
            <article className="sf-panel">
              <TrendingUp size={21} />
              <span>Evidence items</span>
              <strong>{data?.evidence_count ?? data?.total_evidence ?? 0}</strong>
            </article>
          </section>

          <section className="sf-panel sf-activity">
            <h2>Recent activity</h2>
            {activities.length === 0 ? (
              <p>No recent activity is available yet. Start a project or update your skills to begin building your history.</p>
            ) : activities.map((activity, index) => (
              <div className="sf-activity-row" key={activity.id ?? index}>
                <span className="sf-activity-dot" />
                <div>
                  <strong>{activity.title || activity.description || activity.action || "Learning activity"}</strong>
                  <p>{activity.created_at ? new Date(activity.created_at).toLocaleDateString() : "Recent activity"}</p>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      <style>{`
        .sf-page{color:#edf1ed;font-family:Inter,system-ui,sans-serif}
        .sf-page-header{margin-bottom:25px}.sf-progress-header{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap}
        .sf-eyebrow{color:#a7d985;font-size:10px;letter-spacing:1.4px;font-weight:700}
        .sf-page-header h1{font-size:32px;letter-spacing:-1px;margin:10px 0}
        .sf-page-header p,.sf-panel p,.sf-progress-copy p{color:#9ba79d;font-size:12px;line-height:1.8}
        .sf-progress-hero{display:flex;align-items:center;gap:30px;padding:28px;border:1px solid #35482f;border-radius:13px;background:linear-gradient(120deg,#1b281b,#111715)}
        .sf-progress-circle{width:150px;height:150px;flex-shrink:0;display:grid;place-items:center;border-radius:50%;background:conic-gradient(#b8ed8a var(--progress),#303b31 0);position:relative}
        .sf-progress-circle:before{content:"";position:absolute;inset:9px;border-radius:50%;background:#151e15}
        .sf-progress-circle div{z-index:1;display:grid;text-align:center;gap:6px}.sf-progress-circle strong{font-size:29px}.sf-progress-circle span{font-size:10px;color:#9ba79d}
        .sf-progress-copy h2{font-size:22px;margin:12px 0}.sf-progress-copy p{max-width:530px}
        .sf-primary,.sf-secondary{display:inline-flex;align-items:center;gap:8px;padding:11px 14px;border-radius:8px;text-decoration:none;font-size:11px;cursor:pointer}
        .sf-primary{background:#b8ed8a;color:#14200f;font-weight:700}.sf-secondary{background:#182019;border:1px solid #344036;color:#dce4dc}
        .sf-progress-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:17px 0}
        .sf-panel{padding:20px;border:1px solid #29342b;border-radius:12px;background:#111715}
        .sf-progress-stats svg{color:#b8ed8a}.sf-progress-stats span,.sf-progress-stats strong{display:block}.sf-progress-stats span{margin:12px 0 7px;color:#9ba79d;font-size:11px}.sf-progress-stats strong{font-size:24px}
        .sf-activity h2{font-size:16px}.sf-activity-row{display:flex;gap:13px;padding:14px 0;border-bottom:1px solid #29342b}.sf-activity-row:last-child{border-bottom:0}
        .sf-activity-dot{width:9px;height:9px;flex-shrink:0;margin-top:5px;border-radius:50%;background:#b8ed8a}.sf-activity-row strong{font-size:12px}.sf-activity-row p{margin:5px 0 0}
        .sf-alert{color:#ffc2b4;font-size:12px}
        @media(max-width:600px){.sf-progress-hero{flex-direction:column;align-items:flex-start}.sf-progress-stats{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
