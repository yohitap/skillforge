import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import jobService from "../services/jobService";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadJob() {
      setLoading(true);
      setError("");

      try {
        const result = await jobService.getJobById(id);
        if (active) {
          setJob(result?.job || result);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load this job.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadJob();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <div className="sf-job-detail-state">Loading job details...</div>;
  }

  if (error || !job) {
    return (
      <main className="sf-job-detail-state">
        <p>{error || "This job could not be found."}</p>
        <Link to="/jobs"><ArrowLeft size={15} /> Back to jobs</Link>
      </main>
    );
  }

  const skills = job.skills || job.required_skills || [];

  return (
    <main className="sf-job-detail">
      <Link to="/jobs" className="sf-job-back">
        <ArrowLeft size={15} /> Back to opportunities
      </Link>

      <section className="sf-job-detail-hero">
        <span className="sf-jd-icon"><BriefcaseBusiness size={26} /></span>
        <span className="sf-jd-kicker">OPPORTUNITY DETAILS</span>
        <h1>{job.title || "Untitled role"}</h1>
        <p className="sf-jd-company">
          {job.company || "Company not specified"}
        </p>

        <div className="sf-jd-meta">
          <span><MapPin size={15} /> {job.location || "Location not specified"}</span>
          <span>{job.work_type || job.job_type || job.type || "Role"}</span>
          {job.salary && <span>{job.salary}</span>}
        </div>
      </section>

      <div className="sf-jd-columns">
        <section className="sf-jd-panel">
          <h2>About this role</h2>
          <p className="sf-jd-description">
            {job.description || "No job description has been provided."}
          </p>

          {job.responsibilities && (
            <>
              <h2>Responsibilities</h2>
              <p className="sf-jd-description">
                {Array.isArray(job.responsibilities)
                  ? job.responsibilities.join("\n")
                  : job.responsibilities}
              </p>
            </>
          )}

          {job.qualification && (
            <>
              <h2>Qualifications</h2>
              <p className="sf-jd-description">{job.qualification}</p>
            </>
          )}
        </section>

        <aside className="sf-jd-panel">
          <h2><BookOpen size={18} /> Required skills</h2>

          {skills.length ? (
            <div className="sf-jd-skills">
              {skills.map((skill, index) => (
                <span key={skill.id ?? skill.name ?? skill ?? index}>
                  {typeof skill === "string" ? skill : skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="sf-jd-description">
              No specific skills have been listed for this role.
            </p>
          )}

          <p className="sf-jd-hint">
            Compare these requirements with your current skill inventory
            to identify areas to improve.
          </p>

          <Link to="/skill-map" className="sf-jd-action">
            Review my skills <ArrowLeft size={15} />
          </Link>

          {job.application_url && (
            <a
              href={job.application_url}
              target="_blank"
              rel="noreferrer"
              className="sf-jd-apply"
            >
              Open application <ExternalLink size={15} />
            </a>
          )}
        </aside>
      </div>

      <style>{`
        .sf-job-detail { color:#edf1ed; font-family:Inter,system-ui,sans-serif; }
        .sf-job-back { display:inline-flex; align-items:center; gap:8px; margin-bottom:22px; color:#b8ed8a; font-size:11px; text-decoration:none; }
        .sf-job-detail-hero { padding:28px; border:1px solid #35482f; border-radius:14px; background:radial-gradient(ellipse at right,#233421,#121915 70%); }
        .sf-jd-icon { display:grid; width:46px; height:46px; place-items:center; margin-bottom:18px; border-radius:11px; color:#b8ed8a; background:#243320; }
        .sf-jd-kicker { color:#a7d985; font-size:10px; font-weight:750; letter-spacing:1.3px; }
        .sf-job-detail-hero h1 { margin:10px 0; font-size:clamp(25px,3vw,35px); letter-spacing:-1px; }
        .sf-jd-company { color:#b8ed8a; font-size:13px; }
        .sf-jd-meta { display:flex; flex-wrap:wrap; gap:10px; margin-top:19px; }
        .sf-jd-meta span { display:flex; align-items:center; gap:6px; padding:8px 10px; border:1px solid #354036; border-radius:7px; color:#c5d0c5; font-size:10px; }
        .sf-jd-columns { display:grid; grid-template-columns:1.2fr .8fr; gap:16px; margin-top:18px; }
        .sf-jd-panel { min-width:0; padding:23px; border:1px solid #29342b; border-radius:12px; background:#111715; }
        .sf-jd-panel h2 { display:flex; align-items:center; gap:8px; margin:0 0 16px; font-size:15px; }
        .sf-jd-description { color:#9ba79d; font-size:12px; line-height:1.9; white-space:pre-line; }
        .sf-jd-panel h2:not(:first-child) { margin-top:25px; }
        .sf-jd-skills { display:flex; flex-wrap:wrap; gap:8px; }
        .sf-jd-skills span { padding:7px 10px; border:1px solid #35482f; border-radius:6px; color:#cde8c0; background:#1c291b; font-size:11px; }
        .sf-jd-hint { margin:20px 0; color:#9ba79d; font-size:11px; line-height:1.8; }
        .sf-jd-action,.sf-jd-apply { display:flex; align-items:center; justify-content:center; gap:8px; width:100%; box-sizing:border-box; margin-top:10px; padding:12px; border-radius:8px; color:#10170d; background:#b8ed8a; font-size:11px; font-weight:700; text-decoration:none; }
        .sf-jd-action svg { transform:rotate(180deg); }
        .sf-jd-apply { border:1px solid #344036; color:#dce4dc; background:#182019; }
        .sf-job-detail-state { padding:40px 20px; color:#c5d0c5; font-family:Inter,system-ui,sans-serif; }
        .sf-job-detail-state a { display:inline-flex; align-items:center; gap:8px; color:#b8ed8a; text-decoration:none; }
        @media(max-width:750px) { .sf-jd-columns { grid-template-columns:1fr; } }
      `}</style>
    </main>
  );
}
