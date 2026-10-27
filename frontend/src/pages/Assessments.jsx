import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Clock3, ArrowUpRight, RefreshCw } from "lucide-react";
import assessmentService from "../services/assessmentService";

export default function Assessments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await assessmentService.getAssessments();
      setItems(Array.isArray(result) ? result : result?.items || result?.assessments || []);
    } catch (e) {
      setError(e.message || "Could not load assessments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = items.filter((item) =>
    `${item.title || item.name || ""} ${item.skill_name || item.skill || ""}`
      .toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="sf-page">
      <header className="sf-page-header">
        <span className="sf-eyebrow">TEST YOUR KNOWLEDGE</span>
        <h1>Skill assessments</h1>
        <p>Discover what you know, identify gaps, and measure your readiness.</p>
      </header>

      <input className="sf-search" placeholder="Search assessments or skills..."
        value={search} onChange={(e) => setSearch(e.target.value)} />

      {loading ? <p>Loading assessments...</p> : error ? (
        <div className="sf-panel"><p>{error}</p><button onClick={load}>Try again</button></div>
      ) : filtered.length === 0 ? (
        <div className="sf-panel sf-empty">
          <Brain size={30} />
          <h3>No assessments found</h3>
          <p>Try another search, or add assessments through your backend.</p>
        </div>
      ) : (
        <div className="sf-grid">
          {filtered.map((item, index) => (
            <article className="sf-panel" key={item.id ?? index}>
              <div className="sf-icon"><Brain size={21} /></div>
              <h3>{item.title || item.name || "Skill assessment"}</h3>
              <p>{item.description || "Evaluate your understanding and identify areas to improve."}</p>
              <div className="sf-meta">
                <span>{item.skill_name || item.skill || "General skills"}</span>
                <span><Clock3 size={13} /> {item.duration_minutes || item.duration || 15} min</span>
              </div>
              <Link className="sf-link" to={`/assessments/${item.id}`}>
                View assessment <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      )}

      <button className="sf-secondary" onClick={load} disabled={loading}>
        <RefreshCw size={15} /> Refresh
      </button>

      <style>{`
        .sf-page{color:#edf1ed;font-family:Inter,system-ui,sans-serif}
        .sf-page-header{margin-bottom:25px}.sf-eyebrow{color:#a7d985;font-size:10px;letter-spacing:1.4px;font-weight:700}
        .sf-page-header h1{font-size:32px;letter-spacing:-1px;margin:10px 0}
        .sf-page-header p,.sf-panel p{color:#9ba79d;font-size:12px;line-height:1.8}
        .sf-search{box-sizing:border-box;width:100%;padding:13px;margin-bottom:20px;border:1px solid #344036;border-radius:8px;background:#111715;color:#edf1ed;outline:none}
        .sf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:15px}
        .sf-panel{padding:20px;border:1px solid #29342b;border-radius:12px;background:#111715}
        .sf-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:10px;background:#243320;color:#b8ed8a}
        .sf-panel h3{font-size:15px;margin:16px 0 8px}.sf-meta{display:flex;flex-wrap:wrap;gap:12px;color:#b8ed8a;font-size:10px;margin:18px 0}
        .sf-meta span{display:flex;align-items:center;gap:5px}.sf-link{display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #29342b;color:#b8ed8a;font-size:11px;text-decoration:none}
        .sf-empty{text-align:center;padding:40px 20px}.sf-secondary{display:flex;gap:8px;align-items:center;margin-top:20px;padding:10px 13px;background:#182019;border:1px solid #344036;border-radius:8px;color:#dce4dc;cursor:pointer}
      `}</style>
    </main>
  );
}
