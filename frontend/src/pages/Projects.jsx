import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Code2, ArrowUpRight, RefreshCw } from "lucide-react";
import projectService from "../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await projectService.getProjects();
      setProjects(Array.isArray(result) ? result : result?.items || result?.projects || []);
    } catch (e) {
      setError(e.message || "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = projects.filter(project =>
    `${project.title || project.name || ""} ${project.description || ""} ${(project.skills || []).map(s => typeof s === "string" ? s : s.name).join(" ")}`
      .toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="sf-page">
      <header className="sf-page-header sf-project-header">
        <div>
          <span className="sf-eyebrow">LEARN BY BUILDING</span>
          <h1>Projects that prove your skills.</h1>
          <p>Discover practical projects to turn your knowledge into demonstrable experience.</p>
        </div>
        <button className="sf-secondary" onClick={load} disabled={loading}>
          <RefreshCw size={15} /> Refresh
        </button>
      </header>

      <input className="sf-search" placeholder="Search projects or technologies..."
        value={search} onChange={e => setSearch(e.target.value)} />

      {error && <div className="sf-alert">{error}</div>}

      {loading ? <p>Loading projects...</p> : filtered.length === 0 ? (
        <div className="sf-panel sf-empty">
          <Code2 size={32} />
          <h3>No projects found</h3>
          <p>Try another search, or connect the project catalog to your backend.</p>
        </div>
      ) : (
        <section className="sf-project-grid">
          {filtered.map((project, index) => (
            <article className="sf-panel sf-project-card" key={project.id ?? index}>
              <div className="sf-project-icon"><Code2 size={21} /></div>
              <span className="sf-project-level">
                {project.difficulty || project.level || "Practical project"}
              </span>
              <h3>{project.title || project.name || "Untitled project"}</h3>
              <p>{project.description || "Build a practical solution and document the skills you demonstrate."}</p>

              <div className="sf-project-skills">
                {(project.skills || project.technologies || []).slice(0, 5).map((skill, i) => (
                  <span key={skill.id ?? skill.name ?? skill ?? i}>
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))}
              </div>

              <Link className="sf-link" to={`/projects/${project.id}`}>
                Explore project <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </section>
      )}

      <style>{`
        .sf-page{color:#edf1ed;font-family:Inter,system-ui,sans-serif}
        .sf-project-header{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;margin-bottom:25px}
        .sf-eyebrow{color:#a7d985;font-size:10px;letter-spacing:1.4px;font-weight:700}
        .sf-page-header h1{font-size:clamp(25px,3vw,34px);letter-spacing:-1px;margin:10px 0}
        .sf-page-header p,.sf-panel p{color:#9ba79d;font-size:12px;line-height:1.8}
        .sf-search{box-sizing:border-box;width:100%;padding:13px;margin-bottom:20px;border:1px solid #344036;border-radius:8px;background:#111715;color:#edf1ed;outline:none}
        .sf-secondary{display:inline-flex;align-items:center;gap:8px;padding:11px 14px;border:1px solid #344036;border-radius:8px;background:#182019;color:#dce4dc;cursor:pointer}
        .sf-project-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:15px}
        .sf-panel{padding:20px;border:1px solid #29342b;border-radius:12px;background:#111715}
        .sf-project-card{transition:border-color .15s,transform .15s}.sf-project-card:hover{border-color:#607953;transform:translateY(-2px)}
        .sf-project-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:10px;background:#243320;color:#b8ed8a}
        .sf-project-level{display:inline-block;margin-top:13px;color:#b8ed8a;font-size:10px}
        .sf-project-card h3{font-size:15px;margin:12px 0 8px}.sf-project-skills{display:flex;flex-wrap:wrap;gap:7px;margin:16px 0}
        .sf-project-skills span{padding:6px 8px;border-radius:5px;background:#202820;color:#c5d0c5;font-size:10px}
        .sf-link{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:14px;border-top:1px solid #29342b;color:#b8ed8a;font-size:11px;text-decoration:none}
        .sf-empty{text-align:center;padding:40px 20px}.sf-alert{color:#ffc2b4;font-size:12px}
      `}</style>
    </main>
  );
}
