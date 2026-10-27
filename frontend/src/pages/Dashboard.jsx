import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain, BriefcaseBusiness, Award, TrendingUp,
  ArrowUpRight, RefreshCw, Target
} from "lucide-react";
import dashboardService from "../services/dashboardService";

export default function Dashboard() {
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
      setError(e.message || "Unable to load your dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const stats = [
    { label: "Skills tracked", value: data?.skills_count ?? data?.total_skills ?? 0, icon: Brain },
    { label: "Evidence items", value: data?.evidence_count ?? data?.total_evidence ?? 0, icon: Award },
    { label: "Projects", value: data?.projects_count ?? data?.total_projects ?? 0, icon: BriefcaseBusiness },
    { label: "Learning progress", value: `${data?.progress_percentage ?? data?.completion_percentage ?? 0}%`, icon: TrendingUp },
  ];

  if (loading) return <main className="sf-page"><p>Loading your dashboard...</p></main>;

  return (
    <main className="sf-page">
      <header className="sf-page-header sf-row">
        <div>
          <span className="sf-eyebrow">YOUR CAREER WORKSPACE</span>
          <h1>Your progress, at a glance.</h1>
          <p>Understand where you stand and decide what to work on next.</p>
        </div>
        <button className="sf-secondary" onClick={load}>
          <RefreshCw size={15} /> Refresh
        </button>
      </header>

      {error && <div className="sf-alert">{error}</div>}

      <section className="sf-stats">
        {stats.map(({ label, value, icon: Icon }) => (
          <article className="sf-panel sf-stat" key={label}>
            <div className="sf-icon"><Icon size={20} /></div>
            <p>{label}</p>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="sf-dashboard-columns">
        <article className="sf-panel">
          <span className="sf-eyebrow">YOUR NEXT MOVE</span>
          <h2>Turn skills into evidence.</h2>
          <p>
            Build practical projects, document what you learn, and
            use your progress to guide your next career decision.
          </p>
          <Link to="/evidence" className="sf-primary">
            Add evidence <ArrowUpRight size={16} />
          </Link>
        </article>

        <article className="sf-panel">
          <span className="sf-eyebrow">KEEP MOVING FORWARD</span>
          <h2>Make learning measurable.</h2>
          <p>Review your skill gaps and follow a structured learning roadmap.</p>
          <div className="sf-dashboard-links">
            <Link to="/skill-map"><Brain size={16} /> Explore skills</Link>
            <Link to="/roadmap"><Target size={16} /> Open roadmap</Link>
            <Link to="/progress"><TrendingUp size={16} /> View progress</Link>
            <Link to="/projects"><BriefcaseBusiness size={16} /> Explore projects</Link>
          </div>
        </article>
      </section>

      <style>{`
        .sf-page{color:#edf1ed;font-family:Inter,system-ui,sans-serif}
        .sf-page-header{margin-bottom:25px}.sf-row{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap}
        .sf-eyebrow{color:#a7d985;font-size:10px;letter-spacing:1.4px;font-weight:700}
        .sf-page-header h1{font-size:clamp(25px,3vw,34px);letter-spacing:-1px;margin:10px 0}
        .sf-page-header p,.sf-panel p{color:#9ba79d;font-size:12px;line-height:1.8}
        .sf-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
        .sf-panel{padding:21px;border:1px solid #29342b;border-radius:12px;background:#111715}
        .sf-stat p{margin:15px 0 8px}.sf-stat strong{font-size:27px;letter-spacing:-1px}
        .sf-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:10px;background:#243320;color:#b8ed8a}
        .sf-dashboard-columns{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:17px}
        .sf-panel h2{font-size:19px;margin:14px 0}
        .sf-primary,.sf-secondary{display:inline-flex;align-items:center;gap:8px;padding:11px 14px;border-radius:8px;text-decoration:none;font-size:11px;cursor:pointer}
        .sf-primary{background:#b8ed8a;color:#14200f;font-weight:700}.sf-secondary{background:#182019;border:1px solid #344036;color:#dce4dc}
        .sf-dashboard-links{display:grid;gap:9px;margin-top:18px}
        .sf-dashboard-links a{display:flex;align-items:center;gap:9px;padding:11px;border:1px solid #29342b;border-radius:7px;color:#cbd7ca;text-decoration:none;font-size:11px}
        .sf-dashboard-links a svg{color:#b8ed8a}
        .sf-alert{padding:12px;color:#ffc2b4;font-size:12px}
        @media(max-width:650px){.sf-dashboard-columns{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
