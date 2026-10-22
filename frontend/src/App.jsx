
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function HomePage() {
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <a className="brand" href="/">
          <span className="brand-mark">S</span>
          SkillForge
        </a>
        <div className="nav-actions">
          <a href="/login" className="nav-link">Log in</a>
          <a href="/register" className="button button-primary">
            Get started
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <span className="status-dot" />
          YOUR SKILLS. YOUR NEXT MOVE.
        </div>

        <h1>
          Build skills that
          <br />
          <span className="text-accent">move you forward.</span>
        </h1>

        <p className="hero-description">
          Discover your skill gaps, understand what employers need,
          and turn your career goals into a practical learning roadmap.
        </p>

        <div className="hero-actions">
          <a href="/register" className="button button-primary">
            Start building <span aria-hidden="true">↗</span>
          </a>
          <a href="/login" className="button button-secondary">
            I already have an account
          </a>
        </div>

        <div className="hero-note">
          <span className="status-dot" />
          A clearer path from learning to career readiness.
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <span className="feature-icon">◎</span>
          <h3>Map your skills</h3>
          <p>See your strengths, identify gaps, and understand skill dependencies.</p>
        </article>
        <article className="feature-card">
          <span className="feature-icon">↗</span>
          <h3>Explore opportunities</h3>
          <p>Compare your skills with the requirements of roles you want.</p>
        </article>
        <article className="feature-card">
          <span className="feature-icon">⌁</span>
          <h3>Build your roadmap</h3>
          <p>Turn skill gaps into focused learning tasks and portfolio projects.</p>
        </article>
      </section>

      <footer className="landing-footer">
        <span>SkillForge</span>
        <span>Learn with direction. Grow with evidence.</span>
      </footer>
    </main>
  );
}

function AuthPage({ mode }) {
  const { login, register, isAuthenticated } = useAuth();
  const isLogin = mode === "login";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
      ...(isLogin ? {} : { full_name: formData.get("full_name") })
    };

    try {
      if (isLogin) {
        await login(payload);
      } else {
        await register(payload);
      }
    } catch {
      // AuthContext reports request errors through its own error handling.
    }
  }

  return (
    <main className="auth-page">
      <a href="/" className="brand auth-brand">
        <span className="brand-mark">S</span>
        SkillForge
      </a>

      <section className="auth-card">
        <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
        <h1>{isLogin ? "Welcome back." : "Create your account."}</h1>
        <p className="muted">
          {isLogin
            ? "Continue building your career with direction."
            : "Start turning your career goals into a plan."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              Full name
              <input
                name="full_name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={8}
              required
            />
          </label>

          <button className="button button-primary auth-submit" type="submit">
            {isLogin ? "Log in" : "Create account"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "New to SkillForge?" : "Already have an account?"}{" "}
          <a href={isLogin ? "/register" : "/login"}>
            {isLogin ? "Create an account" : "Log in"}
          </a>
        </p>
      </section>
    </main>
  );
}

function DashboardPlaceholder() {
  const { user, logout } = useAuth();

  return (
    <main className="placeholder-page">
      <nav className="landing-nav">
        <a className="brand" href="/dashboard">
          <span className="brand-mark">S</span>
          SkillForge
        </a>
        <button className="button button-secondary" onClick={logout}>
          Log out
        </button>
      </nav>
      <section className="placeholder-content">
        <div className="eyebrow">YOUR WORKSPACE</div>
        <h1>Welcome{user?.full_name ? `, ${user.full_name}` : " back"}.</h1>
        <p className="muted">
          Your dashboard will take shape as we build the skill map,
          job matching, evidence tracking, and roadmap pages.
        </p>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>Skill map</h3>
            <p>Understand your current capabilities.</p>
          </article>
          <article className="feature-card">
            <h3>Career opportunities</h3>
            <p>Explore roles that match your goals.</p>
          </article>
          <article className="feature-card">
            <h3>Learning roadmap</h3>
            <p>Plan your next steps.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="eyebrow">404 — PAGE NOT FOUND</span>
      <h1>Looks like a wrong turn.</h1>
      <p className="muted">The page you're looking for doesn't exist yet.</p>
      <a className="button button-primary" href="/">Back to home</a>
    </main>
  );
}

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <span className="brand-mark">S</span>
        <p>Preparing your workspace...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated
            ? <DashboardPlaceholder />
            : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
