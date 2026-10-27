import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BriefcaseBusiness,
  MapPin,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import jobService from "../services/jobService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadJobs() {
    setLoading(true);
    setError("");

    try {
      const result = await jobService.getJobs();
      setJobs(
        Array.isArray(result)
          ? result
          : result?.items || result?.jobs || []
      );
    } catch (err) {
      setError(err.message || "Unable to load job opportunities.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const text = [
      job.title,
      job.company,
      job.location,
      job.description,
      ...(job.skills || []).map((skill) =>
        typeof skill === "string" ? skill : skill.name
      ),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const type = (job.work_type || job.job_type || job.type || "")
      .toLowerCase();

    const matchesType =
      workType === "All" ||
      type.includes(workType.toLowerCase());

    return matchesSearch && matchesType;
  });

  return (
    <main className="sf-jobs">
      <header className="sf-jobs-header">
        <div>
          <span className="sf-jobs-kicker">CAREER OPPORTUNITIES</span>
          <h1>Find your next opportunity.</h1>
          <p>
            Explore roles, understand required skills, and identify
            the gaps you can work on.
          </p>
        </div>

        <button
          className="sf-jobs-refresh"
          onClick={loadJobs}
          disabled={loading}
          type="button"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </header>

      <section className="sf-jobs-banner">
        <div className="sf-jobs-banner-icon">
          <BriefcaseBusiness size={25} />
        </div>
        <div>
          <strong>Look beyond the job title.</strong>
          <p>
            Compare role requirements with your current skills
            before deciding what to learn next.
          </p>
        </div>
      </section>

      <section className="sf-jobs-controls">
        <label className="sf-jobs-search">
          <Search size={17} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search roles, companies, or skills..."
            aria-label="Search jobs"
          />
        </label>

        <select
          value={workType}
          onChange={(event) => setWorkType(event.target.value)}
          aria-label="Filter by work type"
        >
          <option value="All">All work types</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
        </select>
      </section>

      <div className="sf-jobs-results-heading">
        <h2>Explore opportunities</h2>
        {!loading && (
          <span>{filteredJobs.length} opportunities</span>
        )}
      </div>

      {error && (
        <div className="sf-jobs-error" role="alert">
          {error}
          <button type="button" onClick={loadJobs}>Try again</button>
        </div>
      )}

      {loading ? (
        <div className="sf-jobs-empty">Loading opportunities...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="sf-jobs-empty">
          <BriefcaseBusiness size={30} />
          <h3>No matching opportunities</h3>
          <p>
            {jobs.length === 0
              ? "No jobs are available from the connected backend yet."
              : "Try a different search term or work type."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setWorkType("All");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <section className="sf-jobs-grid">
          {filteredJobs.map((job) => {
            const skills = job.skills || job.required_skills || [];

            return (
              <article className="sf-job-card" key={job.id}>
                <div className="sf-job-card-top">
                  <span className="sf-job-icon">
                    <BriefcaseBusiness size={19} />
                  </span>
                  <span className="sf-job-type">
                    {job.work_type || job.job_type || job.type || "Opportunity"}
                  </span>
                </div>

                <h3>{job.title || "Untitled role"}</h3>

                <p className="sf-job-company">
                  {job.company || "Company not specified"}
                </p>

                <p className="sf-job-location">
                  <MapPin size={14} />
                  {job.location || "Location not specified"}
                </p>

                <p className="sf-job-description">
                  {job.description ||
                    "Explore this role's requirements and identify the skills you may need."}
                </p>

                <div className="sf-job-skills">
                  {skills.slice(0, 4).map((skill, index) => (
                    <span key={skill.id ?? skill.name ?? skill ?? index}>
                      {typeof skill === "string" ? skill : skill.name}
                    </span>
                  ))}
                  {skills.length > 4 && (
                    <span>+{skills.length - 4}</span>
                  )}
                </div>

                <Link
                  to={`/jobs/${job.id}`}
                  className="sf-job-details"
                >
                  View role details <ArrowUpRight size={16} />
                </Link>
              </article>
            );
          })}
        </section>
      )}

      <style>{`
        .sf-jobs { color: #edf1ed; font-family: Inter, system-ui, sans-serif; }
        .sf-jobs-header { display:flex; align-items:center; justify-content:space-between; gap:18px; margin-bottom:26px; }
        .sf-jobs-kicker { color:#a7d985; font-size:10px; font-weight:750; letter-spacing:1.3px; }
        .sf-jobs-header h1 { margin:10px 0; font-size:clamp(25px,3vw,34px); letter-spacing:-1px; }
        .sf-jobs-header p { max-width:530px; color:#9ba79d; font-size:12px; line-height:1.8; }
        .sf-jobs-refresh { display:flex; align-items:center; gap:8px; padding:10px 13px; border:1px solid #344036; border-radius:8px; color:#dce4dc; background:#131a15; cursor:pointer; }
        .sf-jobs-banner { display:flex; align-items:center; gap:15px; padding:20px; border:1px solid #35482f; border-radius:12px; background:linear-gradient(110deg,#19241a,#121815); }
        .sf-jobs-banner-icon { display:grid; width:45px; height:45px; flex-shrink:0; place-items:center; border-radius:10px; color:#b8ed8a; background:#243320; }
        .sf-jobs-banner strong { font-size:13px; }
        .sf-jobs-banner p { margin:6px 0 0; color:#9ba79d; font-size:11px; line-height:1.8; }
        .sf-jobs-controls { display:flex; gap:12px; margin:23px 0; }
        .sf-jobs-search { display:flex; align-items:center; gap:10px; flex:1; padding:0 13px; border:1px solid #344036; border-radius:8px; color:#8c998e; background:#111715; }
        .sf-jobs-search input { width:100%; height:43px; border:0; outline:0; color:#edf1ed; background:transparent; font-size:12px; }
        .sf-jobs-controls select { min-width:150px; padding:0 12px; border:1px solid #344036; border-radius:8px; color:#dce4dc; background:#111715; font-size:11px; }
        .sf-jobs-results-heading { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:15px; }
        .sf-jobs-results-heading h2 { font-size:16px; }
        .sf-jobs-results-heading span { color:#9ba79d; font-size:11px; }
        .sf-jobs-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:15px; }
        .sf-job-card { min-width:0; padding:20px; border:1px solid #29342b; border-radius:12px; background:#111715; transition:border-color .15s ease,transform .15s ease; }
        .sf-job-card:hover { border-color:#607953; transform:translateY(-2px); }
        .sf-job-card-top { display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .sf-job-icon { display:grid; width:38px; height:38px; place-items:center; border-radius:10px; color:#b8ed8a; background:#1c291b; }
        .sf-job-type { padding:6px 9px; border:1px solid #35482f; border-radius:20px; color:#b8ed8a; font-size:10px; }
        .sf-job-card h3 { margin:18px 0 6px; font-size:16px; }
        .sf-job-company { color:#b8ed8a; font-size:11px; }
        .sf-job-location { display:flex; align-items:center; gap:6px; color:#9ba79d; font-size:11px; }
        .sf-job-description { min-height:39px; color:#9ba79d; font-size:11px; line-height:1.8; }
        .sf-job-skills { display:flex; flex-wrap:wrap; gap:7px; margin:15px 0; }
        .sf-job-skills span { padding:6px 8px; border-radius:5px; color:#c5d0c5; background:#202820; font-size:10px; }
        .sf-job-details { display:flex; align-items:center; justify-content:space-between; gap:10px; padding-top:15px; border-top:1px solid #29342b; color:#b8ed8a; font-size:11px; text-decoration:none; }
        .sf-jobs-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; min-height:210px; padding:25px; border:1px dashed #344036; border-radius:12px; color:#b8ed8a; text-align:center; }
        .sf-jobs-empty h3 { margin:0; color:#edf1ed; font-size:15px; }
        .sf-jobs-empty p { color:#9ba79d; font-size:11px; line-height:1.8; }
        .sf-jobs-empty button,.sf-jobs-error button { border:0; color:#b8ed8a; background:transparent; cursor:pointer; }
        .sf-jobs-error { display:flex; justify-content:space-between; gap:12px; margin-bottom:15px; padding:12px; border:1px solid #694139; border-radius:8px; color:#ffc2b4; font-size:11px; }
        @media(max-width:750px) { .sf-jobs-grid { grid-template-columns:1fr; } }
        @media(max-width:520px) { .sf-jobs-header { align-items:flex-start; } .sf-jobs-controls { flex-direction:column; } .sf-jobs-controls select { min-height:42px; } }
      `}</style>
    </main>
  );
}
