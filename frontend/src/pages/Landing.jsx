import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Target,
  GitBranch,
  BriefcaseBusiness,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Find your skill gaps",
    description:
      "Compare your current abilities with the skills required for your target career.",
  },
  {
    icon: BrainCircuit,
    title: "Get tailored recommendations",
    description:
      "Discover learning resources and projects that target your actual skill gaps.",
  },
  {
    icon: GitBranch,
    title: "Build a clear roadmap",
    description:
      "Turn a career goal into manageable learning steps and track your progress.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Prepare for real roles",
    description:
      "Explore job requirements and understand what you need to become a stronger candidate.",
  },
];

export default function Landing() {
  return (
    <div className="sf-landing">
      <header className="sf-landing-nav">
        <Link to="/" className="sf-landing-brand">
          <span className="sf-brand-icon">
            <BrainCircuit size={22} />
          </span>
          <span>SkillForge<span className="sf-brand-dot">.</span></span>
        </Link>

        <nav className="sf-landing-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </nav>

        <div className="sf-landing-actions">
          <Link to="/login" className="sf-login-link">
            Log in
          </Link>
          <Link to="/register" className="sf-primary-btn">
            Get started <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main>
        <section className="sf-hero">
          <div className="sf-hero-content">
            <div className="sf-hero-label">
              <Sparkles size={14} />
              YOUR CAREER, WITH A CLEARER DIRECTION
            </div>

            <h1>
              Turn your skills into
              <span> your next opportunity.</span>
            </h1>

            <p>
              Discover what you know, identify what you need to learn,
              and build a practical path toward your career goals.
            </p>

            <div className="sf-hero-actions">
              <Link to="/register" className="sf-primary-btn sf-hero-btn">
                Build my skill roadmap <ArrowRight size={17} />
              </Link>
              <a href="#how-it-works" className="sf-secondary-btn">
                Explore SkillForge
              </a>
            </div>

            <div className="sf-hero-trust">
              <CheckCircle2 size={15} />
              <span>Personalized learning. Practical projects. Measurable progress.</span>
            </div>
          </div>

          <div className="sf-hero-visual">
            <div className="sf-preview-card">
              <div className="sf-preview-top">
                <div>
                  <span className="sf-preview-eyebrow">CAREER OVERVIEW</span>
                  <h3>Your growth snapshot</h3>
                </div>
                <span className="sf-preview-icon">
                  <Target size={19} />
                </span>
              </div>

              <div className="sf-preview-role">
                <span className="sf-role-dot" />
                <div>
                  <strong>Target role</strong>
                  <p>Software Developer</p>
                </div>
                <span className="sf-preview-role-tag">Example</span>
              </div>

              <div className="sf-preview-score">
                <div>
                  <span>Skill readiness</span>
                  <strong>68%</strong>
                </div>
                <div className="sf-preview-bar">
                  <span />
                </div>
                <p>Illustrative preview — your results will depend on your profile.</p>
              </div>

              <div className="sf-preview-skills">
                <div className="sf-preview-section-title">
                  <span>Skill snapshot</span>
                  <span>EXAMPLE</span>
                </div>
                {[
                  ["Python", "Strong", 85],
                  ["Problem solving", "Growing", 60],
                  ["System design", "Explore", 30],
                ].map(([name, status, width]) => (
                  <div className="sf-preview-skill" key={name}>
                    <div className="sf-preview-skill-label">
                      <span>{name}</span>
                      <span>{status}</span>
                    </div>
                    <div className="sf-preview-skill-bar">
                      <span style={{ width: `${width}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="sf-preview-footer">
                <GitBranch size={17} />
                <span>Your next step: build a project that demonstrates your skills.</span>
              </div>
            </div>
            <div className="sf-hero-decoration sf-decoration-one" />
            <div className="sf-hero-decoration sf-decoration-two" />
          </div>
        </section>

        <section id="features" className="sf-features">
          <div className="sf-section-heading">
            <span>BUILT AROUND YOUR GROWTH</span>
            <h2>More than another learning checklist.</h2>
            <p>
              Connect career goals, real skill requirements, practical work,
              and visible evidence of what you can do.
            </p>
          </div>

          <div className="sf-feature-grid">
            {features.map(({ icon: Icon, title, description }, index) => (
              <article className="sf-feature-card" key={title}>
                <span className="sf-feature-icon">
                  <Icon size={21} />
                </span>
                <span className="sf-feature-number">
                  0{index + 1}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="sf-how">
          <div className="sf-how-copy">
            <span className="sf-section-kicker">A MORE PRACTICAL APPROACH</span>
            <h2>Know where you stand. Know what to do next.</h2>
            <p>
              SkillForge is designed to help you move from uncertainty
              to focused action instead of collecting endless courses
              without a clear direction.
            </p>
            <Link to="/register" className="sf-text-link">
              Start your journey <ArrowRight size={16} />
            </Link>
          </div>

          <div className="sf-how-steps">
            {[
              ["01", "Choose a target", "Select a role or career direction."],
              ["02", "Understand the gaps", "Compare role requirements with your skills and evidence."],
              ["03", "Take focused action", "Work through learning steps and build practical projects."],
            ].map(([number, title, description]) => (
              <div className="sf-how-step" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sf-landing-cta">
          <ShieldCheck size={29} />
          <h2>Your next opportunity starts with a plan.</h2>
          <p>Build a clearer picture of your skills and your next steps.</p>
          <Link to="/register" className="sf-primary-btn">
            Get started for free <ArrowRight size={16} />
          </Link>
        </section>
      </main>

      <footer className="sf-landing-footer">
        <Link to="/" className="sf-landing-brand">
          <span className="sf-brand-icon">
            <BrainCircuit size={18} />
          </span>
          SkillForge<span className="sf-brand-dot">.</span>
        </Link>
        <span>Build skills. Show evidence. Move forward.</span>
      </footer>

      <style>{`
        .sf-landing {
          min-height: 100vh;
          overflow: hidden;
          color: #edf1ed;
          background: #0c100e;
          font-family: Inter, system-ui, sans-serif;
        }
        .sf-landing * { box-sizing: border-box; }
        .sf-landing a { text-decoration: none; }
        .sf-landing-nav {
          min-height: 76px;
          max-width: 1240px;
          margin: auto;
          padding: 16px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          border-bottom: 1px solid #202822;
        }
        .sf-landing-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #edf1ed;
          font-size: 19px;
          font-weight: 750;
          letter-spacing: -0.6px;
        }
        .sf-brand-icon {
          display: grid;
          width: 35px;
          height: 35px;
          place-items: center;
          border-radius: 10px;
          color: #b8ed8a;
          background: #1c291b;
        }
        .sf-brand-dot { color: #b8ed8a; }
        .sf-landing-links, .sf-landing-actions {
          display: flex;
          align-items: center;
          gap: 25px;
        }
        .sf-landing-links a, .sf-login-link {
          color: #aab5ac;
          font-size: 12px;
        }
        .sf-landing-links a:hover, .sf-login-link:hover {
          color: #b8ed8a;
        }
        .sf-primary-btn, .sf-secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 43px;
          padding: 0 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 650;
          transition: transform 160ms ease, background 160ms ease;
        }
        .sf-primary-btn {
          color: #10170d;
          background: #b8ed8a;
        }
        .sf-primary-btn:hover {
          background: #d0f5b3;
          transform: translateY(-1px);
        }
        .sf-secondary-btn {
          border: 1px solid #354036;
          color: #d5ded5;
          background: transparent;
        }
        .sf-secondary-btn:hover { border-color: #b8ed8a; }
        .sf-hero {
          max-width: 1240px;
          min-height: 590px;
          margin: auto;
          padding: 75px 28px 80px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 65px;
        }
        .sf-hero-content { position: relative; z-index: 1; }
        .sf-hero-label, .sf-section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #b8ed8a;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 1.2px;
        }
        .sf-hero h1 {
          max-width: 620px;
          margin: 23px 0 20px;
          font-size: clamp(42px, 5.4vw, 66px);
          line-height: 1.08;
          letter-spacing: -3px;
        }
        .sf-hero h1 span {
          display: block;
          color: #b8ed8a;
        }
        .sf-hero-content > p, .sf-how-copy > p {
          max-width: 500px;
          color: #9ca89e;
          font-size: 14px;
          line-height: 1.9;
        }
        .sf-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }
        .sf-hero-btn { min-height: 49px; padding: 0 19px; }
        .sf-hero-trust {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-top: 26px;
          color: #8d9b90;
          font-size: 10px;
          line-height: 1.7;
        }
        .sf-hero-trust svg { flex-shrink: 0; color: #b8ed8a; }
        .sf-hero-visual {
          position: relative;
          display: grid;
          min-height: 400px;
          place-items: center;
        }
        .sf-preview-card {
          position: relative;
          z-index: 1;
          width: min(100%, 390px);
          padding: 25px;
          border: 1px solid #303b32;
          border-radius: 18px;
          background: #121915;
          box-shadow: 0 25px 80px #0007;
        }
        .sf-preview-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .sf-preview-eyebrow, .sf-preview-section-title span:last-child {
          color: #859187;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .sf-preview-top h3 { margin: 9px 0 0; font-size: 16px; }
        .sf-preview-icon {
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border-radius: 11px;
          color: #b8ed8a;
          background: #25341f;
        }
        .sf-preview-role {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-top: 26px;
          padding: 14px;
          border: 1px solid #2b352d;
          border-radius: 10px;
          background: #151d17;
        }
        .sf-role-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #b8ed8a;
        }
        .sf-preview-role strong { font-size: 11px; }
        .sf-preview-role p { margin: 5px 0 0; color: #a2aea3; font-size: 11px; }
        .sf-preview-role-tag {
          margin-left: auto;
          color: #a9b59f;
          font-size: 9px;
        }
        .sf-preview-score { margin-top: 23px; }
        .sf-preview-score > div:first-child {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #b9c4bb;
          font-size: 11px;
        }
        .sf-preview-score strong { color: #b8ed8a; font-size: 21px; }
        .sf-preview-bar, .sf-preview-skill-bar {
          height: 5px;
          margin-top: 12px;
          overflow: hidden;
          border-radius: 6px;
          background: #2b352d;
        }
        .sf-preview-bar span {
          display: block;
          width: 68%;
          height: 100%;
          background: #b8ed8a;
        }
        .sf-preview-score > p { color: #748176; font-size: 9px; line-height: 1.6; }
        .sf-preview-skills { margin-top: 26px; }
        .sf-preview-section-title {
          display: flex;
          justify-content: space-between;
          color: #dce5dc;
          font-size: 11px;
        }
        .sf-preview-skill { margin-top: 17px; }
        .sf-preview-skill-label {
          display: flex;
          justify-content: space-between;
          color: #b8c3b9;
          font-size: 10px;
        }
        .sf-preview-skill-label span:last-child { color: #849286; }
        .sf-preview-skill-bar { margin-top: 8px; }
        .sf-preview-skill-bar span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: #829b71;
        }
        .sf-preview-footer {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid #2b352d;
          color: #a7b2a7;
          font-size: 10px;
          line-height: 1.7;
        }
        .sf-preview-footer svg { flex-shrink: 0; color: #b8ed8a; }
        .sf-hero-decoration {
          position: absolute;
          border: 1px solid #34442f;
          border-radius: 50%;
          pointer-events: none;
        }
        .sf-decoration-one { width: 350px; height: 350px; }
        .sf-decoration-two { width: 430px; height: 430px; border-color: #1d2b20; }
        .sf-features, .sf-how {
          max-width: 1240px;
          margin: auto;
          padding: 85px 28px;
        }
        .sf-features { border-top: 1px solid #202822; }
        .sf-section-heading { max-width: 640px; margin: 0 auto 43px; text-align: center; }
        .sf-section-heading > span { color: #b8ed8a; font-size: 10px; font-weight: 750; letter-spacing: 1.3px; }
        .sf-section-heading h2, .sf-how-copy h2 {
          margin: 15px 0;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.2;
          letter-spacing: -1.3px;
        }
        .sf-section-heading p { color: #9ca89e; font-size: 13px; line-height: 1.8; }
        .sf-feature-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 15px; }
        .sf-feature-card {
          position: relative;
          min-height: 220px;
          padding: 22px;
          border: 1px solid #29342b;
          border-radius: 13px;
          background: #111715;
        }
        .sf-feature-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 11px;
          color: #b8ed8a;
          background: #1c291b;
        }
        .sf-feature-number { position: absolute; top: 26px; right: 20px; color: #566456; font-size: 11px; }
        .sf-feature-card h3 { margin: 22px 0 9px; font-size: 14px; }
        .sf-feature-card p { margin: 0; color: #9ca89e; font-size: 12px; line-height: 1.8; }
        .sf-how {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 90px;
          align-items: center;
          border-top: 1px solid #202822;
        }
        .sf-how-copy h2 { max-width: 480px; }
        .sf-how-copy > p { margin-bottom: 24px; }
        .sf-text-link { display: inline-flex; align-items: center; gap: 8px; color: #b8ed8a; font-size: 12px; font-weight: 650; }
        .sf-how-steps { display: flex; flex-direction: column; }
        .sf-how-step { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid #29342b; }
        .sf-how-step > span { color: #b8ed8a; font-size: 12px; font-weight: 700; }
        .sf-how-step h3 { margin: 0 0 8px; font-size: 14px; }
        .sf-how-step p { margin: 0; color: #9ca89e; font-size: 12px; line-height: 1.8; }
        .sf-landing-cta {
          margin: 20px auto 70px;
          padding: 58px 25px;
          max-width: 1184px;
          border: 1px solid #33452f;
          border-radius: 17px;
          background: radial-gradient(ellipse at top, #1b291b, #101511 70%);
          text-align: center;
        }
        .sf-landing-cta > svg { color: #b8ed8a; }
        .sf-landing-cta h2 { margin: 18px 0 10px; font-size: clamp(23px, 3vw, 34px); letter-spacing: -0.8px; }
        .sf-landing-cta p { margin-bottom: 24px; color: #9ca89e; font-size: 12px; }
        .sf-landing-footer {
          max-width: 1240px;
          margin: auto;
          padding: 25px 28px;
          border-top: 1px solid #202822;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .sf-landing-footer > span { color: #7f8c81; font-size: 10px; }
        @media (max-width: 900px) {
          .sf-hero { gap: 25px; padding-top: 55px; }
          .sf-feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .sf-how { gap: 35px; }
        }
        @media (max-width: 650px) {
          .sf-landing-nav { padding: 14px 17px; }
          .sf-landing-links { display: none; }
          .sf-landing-actions { gap: 13px; }
          .sf-landing-actions .sf-primary-btn { padding: 0 10px; }
          .sf-hero { grid-template-columns: 1fr; padding: 58px 20px; gap: 30px; }
          .sf-hero h1 { letter-spacing: -1.8px; }
          .sf-hero-visual { min-height: 380px; }
          .sf-features, .sf-how { padding: 60px 20px; }
          .sf-feature-grid { grid-template-columns: 1fr; }
          .sf-feature-card { min-height: auto; }
          .sf-how { grid-template-columns: 1fr; gap: 25px; }
          .sf-landing-cta { margin: 10px 15px 45px; padding: 40px 20px; }
          .sf-landing-footer { padding: 22px 17px; flex-wrap: wrap; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sf-landing *, .sf-landing *::before, .sf-landing *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
