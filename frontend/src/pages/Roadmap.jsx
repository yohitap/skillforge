import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Map, RefreshCw, ArrowRight } from "lucide-react";
import roadmapService from "../services/roadmapService";

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await roadmapService.getRoadmap();
      setRoadmap(result?.data || result);
    } catch (e) {
      setError(e.message || "Could not load your roadmap.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const steps = Array.isArray(roadmap)
    ? roadmap
    : roadmap?.steps || roadmap?.milestones || roadmap?.items || [];

  const completed = steps.filter(
    step => step.completed || step.status === "completed"
  ).length;

  const percentage = steps.length
    ? Math.round((completed / steps.length) * 100)
    : 0;

  return (
    <main className="sf-page">
      <header className="sf-page-header sf-roadmap-header">
        <div>
          <span className="sf-eyebrow">YOUR PERSONAL LEARNING PATH</span>
          <h1>A roadmap built around progress.</h1>
          <p>Follow manageable milestones and turn your career goals into actionable steps.</p>
        </div>
        <button className="sf-secondary" onClick={load} disabled={loading}>
          <RefreshCw size={15} /> Refresh
        </button>
      </header>

      {error && <div className="sf-alert">{error}</div>}

      {loading ? <p>Loading roadmap...</p> : (
        <>
          <section className="sf-roadmap-summary">
            <div className="sf-roadmap-summary-icon"><Map size={25} /></div>
            <div className="sf-roadmap-summary-copy">
              <span className="sf-eyebrow">ROADMAP OVERVIEW</span>
              <h2>{roadmap?.title || roadmap?.name || "Your learning roadmap"}</h2>
              <p>{roadmap?.description || "Work through each milestone at your own pace."}</p>
            </div>
            <div className="sf-roadmap-percentage">
              <strong>{percentage}%</strong>
              <span>{completed} of {steps.length} completed</span>
            </div>
          </section>

          {steps.length === 0 ? (
            <section className="sf-panel sf-roadmap-empty">
              <Map size={30} />
              <h3>Your roadmap is waiting</h3>
              <p>Create a roadmap through the SkillForge backend to see your milestones here.</p>
            </section>
          ) : (
            <section className="sf-roadmap-list">
              {steps.map((step, index) => {
                const done = step.completed || step.status === "completed";

                return (
                  <article className="sf-roadmap-step" key={step.id ?? index}>
                    <div className={`sf-roadmap-marker ${done ? "is-done" : ""}`}>
                      {done ? <CheckCircle2 size={21} /> : <Circle size={21} />}
                    </div>
                    <div className="sf-panel sf-roadmap-step-content">
                      <div className="sf-step-top">
                        <span className="sf-step-number">MILESTONE {index + 1}</span>
                        <span className={`sf-step-status ${done ? "done" : ""}`}>
                          {done ? "Completed" : step.status || "Not started"}
                        </span>
                      </div>
                      <h3>{step.title || step.name || `Learning milestone ${index + 1}`}</h3>
                      <p>{step.description || step.objective || "Complete this milestone to advance your learning."}</p>
                      {step.estimated_hours != null && (
                        <span className="sf-step-time">{step.estimated_hours} estimated hours</span>
                      )}
                      {step.resource_url && (
                        <a className="sf-step-link" href={step.resource_url}
                          target="_blank" rel="noreferrer">
                          Open learning resource <ArrowRight size={15} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </>
      )}

      <style>{`
        .sf-page{color:#edf1ed;font-family:Inter,system-ui,sans-serif}
        .sf-roadmap-header{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;margin-bottom:25px}
        .sf-eyebrow{color:#a7d985;font-size:10px;letter-spacing:1.4px;font-weight:700}
        .sf-page-header h1{font-size:clamp(25px,3vw,34px);letter-spacing:-1px;margin:10px 0}
        .sf-page-header p,.sf-roadmap-step-content p,.sf-roadmap-summary p{color:#9ba79d;font-size:12px;line-height:1.8}
        .sf-secondary{display:inline-flex;align-items:center;gap:8px;padding:11px 14px;border:1px solid #344036;border-radius:8px;background:#182019;color:#dce4dc;cursor:pointer}
        .sf-roadmap-summary{display:flex;align-items:center;gap:17px;padding:22px;border:1px solid #35482f;border-radius:12px;background:linear-gradient(120deg,#1b281b,#111715)}
        .sf-roadmap-summary-icon{display:grid;place-items:center;width:46px;height:46px;flex-shrink:0;border-radius:10px;background:#243320;color:#b8ed8a}
        .sf-roadmap-summary-copy{flex:1;min-width:0}.sf-roadmap-summary h2{margin:8px 0;font-size:17px}.sf-roadmap-summary p{margin:0}
        .sf-roadmap-percentage{text-align:right;flex-shrink:0}.sf-roadmap-percentage strong,.sf-roadmap-percentage span{display:block}
        .sf-roadmap-percentage strong{font-size:26px;color:#b8ed8a}.sf-roadmap-percentage span{font-size:10px;color:#9ba79d;margin-top:5px}
        .sf-roadmap-list{margin-top:23px}.sf-roadmap-step{position:relative;display:grid;grid-template-columns:28px minmax(0,1fr);gap:13px;padding-bottom:17px}
        .sf-roadmap-step:not(:last-child):before{content:"";position:absolute;left:13px;top:29px;bottom:-1px;width:1px;background:#354036}
        .sf-roadmap-marker{position:relative;z-index:1;padding-top:19px;color:#778477}.sf-roadmap-marker.is-done{color:#b8ed8a}
        .sf-panel{padding:20px;border:1px solid #29342b;border-radius:12px;background:#111715}
        .sf-step-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
        .sf-step-number,.sf-step-status,.sf-step-time{font-size:10px;color:#9ba79d}
        .sf-step-number{color:#b8ed8a;letter-spacing:1px}.sf-step-status.done{color:#b8ed8a}
        .sf-roadmap-step-content h3{margin:13px 0 7px;font-size:15px}
        .sf-step-link{display:inline-flex;align-items:center;gap:8px;margin-top:10px;color:#b8ed8a;font-size:11px;text-decoration:none}
        .sf-roadmap-empty{text-align:center;margin-top:20px;padding:35px}.sf-alert{color:#ffc2b4;font-size:12px}
        @media(max-width:550px){.sf-roadmap-summary{align-items:flex-start;flex-wrap:wrap}.sf-roadmap-percentage{width:100%;text-align:left}}
      `}</style>
    </main>
  );
}
