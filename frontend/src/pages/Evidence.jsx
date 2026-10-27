import { useEffect, useState } from "react";
import { Award, Plus, RefreshCw, ExternalLink } from "lucide-react";
import evidenceService from "../services/evidenceService";

export default function Evidence() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", evidence_type: "Project", description: "", url: ""
  });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await evidenceService.getEvidence();
      setItems(Array.isArray(result) ? result : result?.items || result?.evidence || []);
    } catch (e) {
      setError(e.message || "Could not load your evidence.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await evidenceService.createEvidence(form);
      setForm({ title: "", evidence_type: "Project", description: "", url: "" });
      setShowForm(false);
      await load();
    } catch (e) {
      setError(e.message || "Could not save evidence. Check your API service.");
    }
  }

  return (
    <main className="sf-page">
      <header className="sf-page-header sf-row">
        <div>
          <span className="sf-eyebrow">PROVE WHAT YOU CAN DO</span>
          <h1>My evidence</h1>
          <p>Build a portfolio of projects, certifications, and practical achievements.</p>
        </div>
        <button className="sf-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} /> Add evidence
        </button>
      </header>

      {error && <div className="sf-alert">{error}</div>}

      {showForm && (
        <form className="sf-panel sf-form" onSubmit={submit}>
          <h3>Add a piece of evidence</h3>
          <input required placeholder="Title" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />
          <select value={form.evidence_type}
            onChange={e => setForm({ ...form, evidence_type: e.target.value })}>
            <option>Project</option><option>Certification</option>
            <option>Coursework</option><option>Work experience</option>
            <option>Assessment</option><option>Other</option>
          </select>
          <textarea placeholder="What does this demonstrate?"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />
          <input type="url" placeholder="Public URL (optional)" value={form.url}
            onChange={e => setForm({ ...form, url: e.target.value })} />
          <div className="sf-row">
            <button className="sf-primary" type="submit">Save evidence</button>
            <button className="sf-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? <p>Loading evidence...</p> : items.length === 0 ? (
        <div className="sf-panel sf-empty">
          <Award size={32} />
          <h3>Your proof of skills starts here</h3>
          <p>Add a project or certification to show how you have applied your knowledge.</p>
        </div>
      ) : (
        <div className="sf-grid">
          {items.map((item, index) => (
            <article className="sf-panel" key={item.id ?? index}>
              <div className="sf-icon"><Award size={21} /></div>
              <span className="sf-tag">{item.evidence_type || item.type || "Evidence"}</span>
              <h3>{item.title || item.name || "Untitled evidence"}</h3>
              <p>{item.description || "No description added."}</p>
              {item.created_at && <small>{new Date(item.created_at).toLocaleDateString()}</small>}
              {item.url && <a className="sf-link" href={item.url} target="_blank" rel="noreferrer">
                View proof <ExternalLink size={15} />
              </a>}
            </article>
          ))}
        </div>
      )}

      <button className="sf-secondary" onClick={load} disabled={loading}>
        <RefreshCw size={15} /> Refresh
      </button>

      <style>{`
        .sf-page{color:#edf1ed;font-family:Inter,system-ui,sans-serif}.sf-page-header{margin-bottom:25px}
        .sf-eyebrow{color:#a7d985;font-size:10px;letter-spacing:1.4px;font-weight:700}
        .sf-page-header h1{font-size:32px;letter-spacing:-1px;margin:10px 0}
        .sf-page-header p,.sf-panel p{color:#9ba79d;font-size:12px;line-height:1.8}
        .sf-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .sf-primary,.sf-secondary{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:11px 14px;border-radius:8px;cursor:pointer;font-size:11px}
        .sf-primary{background:#b8ed8a;border:1px solid #b8ed8a;color:#14200f;font-weight:700}
        .sf-secondary{background:#182019;border:1px solid #344036;color:#dce4dc}
        .sf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:15px}
        .sf-panel{padding:20px;border:1px solid #29342b;border-radius:12px;background:#111715}
        .sf-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:10px;background:#243320;color:#b8ed8a}
        .sf-panel h3{font-size:15px;margin:16px 0 8px}.sf-tag{display:inline-block;margin-top:12px;color:#b8ed8a;font-size:10px}
        .sf-link{display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:13px;border-top:1px solid #29342b;color:#b8ed8a;font-size:11px;text-decoration:none}
        .sf-empty{text-align:center;padding:40px 20px}.sf-form{display:grid;gap:12px;margin-bottom:20px}
        .sf-form input,.sf-form select,.sf-form textarea{box-sizing:border-box;width:100%;padding:12px;border:1px solid #344036;border-radius:7px;background:#0e1410;color:#edf1ed}
        .sf-form textarea{min-height:90px;resize:vertical}.sf-alert{margin:12px 0;padding:12px;border:1px solid #694139;border-radius:8px;color:#ffc2b4;font-size:12px}
      `}</style>
    </main>
  );
}
