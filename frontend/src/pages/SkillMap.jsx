import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Search, RefreshCw, ArrowUpRight } from "lucide-react";
import skillService from "../services/skillService";

export default function SkillMap() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await skillService.getSkills();
      setSkills(Array.isArray(result) ? result : result?.items || result?.skills || []);
    } catch (e) {
      setError(e.message || "Could not load your skills.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const categories = [
    "All",
    ...new Set(skills.map(skill => skill.category || "Other"))
  ];

  const filtered = skills.filter(skill => {
    const name = skill.name || skill.title || "";
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" ||
      (skill.category || "Other") === category;
    return matchesSearch && matchesCategory;
  });

  function getLevel(skill) {
    const raw = skill.proficiency ?? skill.proficiency_level ?? skill.level ?? 0;
    if (typeof raw === "string") {
      const levels = {
        beginner: 1, novice: 1, basic: 1,
        intermediate: 2, competent: 2,
        advanced: 3, expert: 4
      };
      return levels[raw.toLowerCase()] || 0;
    }
    return Math.max(0, Math.min(4, Number(raw) || 0));
  }

  const levelNames = ["Not rated", "Beginner", "Intermediate", "Advanced", "Expert"];

  return (
    <main className="sf-page">
      <header className="sf-page-header sf-skill-header">
        <div>
          <span className="sf-eyebrow">YOUR SKILL INVENTORY</span>
          <h1>See your skills differently.</h1>
          <p>Track your capabilities, identify areas to improve, and build toward your target role.</p>
        </div>
        <button className="sf-secondary" onClick={load} disabled={loading}>
          <RefreshCw size={15} /> Refresh
        </button>
      </header>

      <section className="sf-skill-overview">
        <div className="sf-skill-overview-icon"><Brain size={24} /></div>
        <div>
          <span className="sf-eyebrow">YOUR SKILL MAP</span>
          <h2>{skills.length} skills tracked</h2>
          <p>Your inventory becomes more useful as you add evidence and assess your proficiency.</p>
        </div>
      </section>

      <section className="sf-skill-filters">
        <label className="sf-skill-search">
          <Search size={17} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search skills..." aria-label="Search skills" />
        </label>
        <select value={category} onChange={e => setCategory(e.target.value)}
          aria-label="Filter by category">
          {categories.map(value => <option key={value}>{value}</option>)}
        </select>
      </section>

      {error && <div className="sf-alert">{error}</div>}

      {loading ? <p>Loading skills...</p> : filtered.length === 0 ? (
        <div className="sf-panel sf-skill-empty">
          <Brain size={30} />
          <h3>No skills found</h3>
          <p>Add skills through your account or seed catalog, or try a different search.</p>
        </div>
      ) : (
        <section className="sf-skill-grid">
          {filtered.map((skill, index) => {
            const level = getLevel(skill);
            const name = skill.name || skill.title || "Unnamed skill";

            return (
              <article className="sf-panel sf-skill-card" key={skill.id ?? index}>
                <div className="sf-skill-card-top">
                  <div className="sf-skill-card-icon"><Brain size={19} /></div>
                  <span className="sf-skill-category">{skill.category || "Other"}</span>
                </div>

                <h3>{name}</h3>
                <p>{skill.description || "Track this skill and gather practical evidence of your ability."}</p>

                <div className="sf-skill-level">
                  <span>Proficiency</span>
                  <strong>{levelNames[level]}</strong>
                </div>

                <div className="sf-skill-bars" aria-label={`Proficiency: ${levelNames[level]}`}>
                  {[1, 2, 3, 4].map(n => (
                    <span key={n} className={n <= level ? "active" : ""} />
                  ))}
                </div>

                <Link className="sf-link" to={`/skills/${skill.id}`}>
                  Explore skill <ArrowUpRight size={16} />
                </Link>
              </article>
            );
          })}
        </section>
      )}

      <style>{`
        .sf-page{color:#edf1ed;font-family:Inter,system-ui,sans-serif}
        .sf-skill-header{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;margin-bottom:25px}
        .sf-eyebrow{color:#a7d985;font-size:10px;letter-spacing:1.4px;font-weight:700}
        .sf-page-header h1{font-size:clamp(25px,3vw,34px);letter-spacing:-1px;margin:10px 0}
        .sf-page-header p,.sf-panel p,.sf-skill-overview p{color:#9ba79d;font-size:12px;line-height:1.8}
        .sf-secondary{display:inline-flex;align-items:center;gap:8px;padding:11px 14px;border:1px solid #344036;border-radius:8px;background:#182019;color:#dce4dc;cursor:pointer}
        .sf-skill-overview{display:flex;align-items:center;gap:15px;padding:20px;border:1px solid #35482f;border-radius:12px;background:linear-gradient(110deg,#1b281b,#111715)}
        .sf-skill-overview-icon,.sf-skill-card-icon{display:grid;place-items:center;flex-shrink:0;width:43px;height:43px;border-radius:10px;background:#243320;color:#b8ed8a}
        .sf-skill-overview h2{font-size:17px;margin:7px 0}.sf-skill-overview p{margin:0}
        .sf-skill-filters{display:flex;gap:12px;margin:22px 0}
        .sf-skill-search{display:flex;align-items:center;gap:10px;flex:1;padding:0 12px;border:1px solid #344036;border-radius:8px;color:#9ba79d;background:#111715}
        .sf-skill-search input{width:100%;height:43px;border:0;outline:0;background:transparent;color:#edf1ed;font-size:12px}
        .sf-skill-filters select{min-width:140px;padding:0 12px;border:1px solid #344036;border-radius:8px;background:#111715;color:#edf1ed}
        .sf-skill-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(225px,1fr));gap:14px}
        .sf-panel{padding:19px;border:1px solid #29342b;border-radius:12px;background:#111715}
        .sf-skill-card{transition:border-color .15s,transform .15s}.sf-skill-card:hover{border-color:#607953;transform:translateY(-2px)}
        .sf-skill-card-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
        .sf-skill-category{color:#b8ed8a;font-size:10px}.sf-skill-card h3{font-size:15px;margin:16px 0 8px}
        .sf-skill-card p{min-height:42px}.sf-skill-level{display:flex;justify-content:space-between;gap:8px;margin-top:18px;font-size:10px}
        .sf-skill-level span{color:#9ba79d}.sf-skill-level strong{color:#b8ed8a}
        .sf-skill-bars{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin:10px 0 16px}
        .sf-skill-bars span{height:5px;border-radius:4px;background:#303b31}.sf-skill-bars span.active{background:#b8ed8a}
        .sf-link{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:13px;border-top:1px solid #29342b;color:#b8ed8a;font-size:11px;text-decoration:none}
        .sf-skill-empty{text-align:center;padding:40px 20px}.sf-alert{color:#ffc2b4;font-size:12px}
        @media(max-width:500px){.sf-skill-filters{flex-direction:column}.sf-skill-filters select{min-height:42px}}
      `}</style>
    </main>
  );
}
