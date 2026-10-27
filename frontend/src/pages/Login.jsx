import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await login({
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="sf-auth-page">
      <Link to="/" className="sf-auth-brand">
        <span><BrainCircuit size={22} /></span>
        SkillForge<span className="sf-auth-dot">.</span>
      </Link>

      <section className="sf-auth-card">
        <div className="sf-auth-icon"><BrainCircuit size={25} /></div>
        <span className="sf-auth-kicker">WELCOME BACK</span>
        <h1>Pick up where you left off.</h1>
        <p className="sf-auth-description">
          Sign in to continue building your skills and career roadmap.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="sf-password-field">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {error && <div className="sf-auth-error" role="alert">{error}</div>}

          <button className="sf-auth-submit" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        <p className="sf-auth-switch">
          New to SkillForge? <Link to="/register">Create an account</Link>
        </p>
      </section>

      <p className="sf-auth-footer">
        Build skills. Show evidence. Move forward.
      </p>

      <style>{`
        .sf-auth-page {
          min-height: 100vh;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #edf1ed;
          background: #0c100e;
          font-family: Inter, system-ui, sans-serif;
        }
        .sf-auth-brand {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 35px;
          color: #edf1ed;
          text-decoration: none;
          font-size: 21px;
          font-weight: 750;
        }
        .sf-auth-brand > span:first-child {
          display: grid;
          width: 37px;
          height: 37px;
          place-items: center;
          border-radius: 10px;
          color: #b8ed8a;
          background: #1c291b;
        }
        .sf-auth-dot { margin-left: -8px; color: #b8ed8a; }
        .sf-auth-card {
          width: 100%;
          max-width: 440px;
          padding: 36px;
          border: 1px solid #29342b;
          border-radius: 17px;
          background: #111715;
        }
        .sf-auth-icon {
          display: grid;
          width: 46px;
          height: 46px;
          margin-bottom: 22px;
          place-items: center;
          border-radius: 12px;
          color: #b8ed8a;
          background: #1c291b;
        }
        .sf-auth-kicker {
          color: #b8ed8a;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 1.3px;
        }
        .sf-auth-card h1 {
          margin: 12px 0;
          font-size: 28px;
          line-height: 1.25;
          letter-spacing: -0.8px;
        }
        .sf-auth-description {
          margin-bottom: 27px;
          color: #98a59a;
          font-size: 12px;
          line-height: 1.8;
        }
        .sf-auth-card form { display: flex; flex-direction: column; }
        .sf-auth-card label {
          margin: 15px 0 8px;
          color: #dce4dc;
          font-size: 11px;
          font-weight: 600;
        }
        .sf-auth-card input {
          width: 100%;
          min-width: 0;
          height: 45px;
          padding: 0 13px;
          border: 1px solid #344036;
          border-radius: 8px;
          outline: none;
          color: #edf1ed;
          background: #0d120f;
          font-size: 12px;
        }
        .sf-auth-card input:focus { border-color: #b8ed8a; }
        .sf-auth-card input::placeholder { color: #69766c; }
        .sf-password-field { position: relative; }
        .sf-password-field input { padding-right: 45px; }
        .sf-password-field button {
          position: absolute;
          top: 0;
          right: 0;
          height: 45px;
          width: 43px;
          display: grid;
          place-items: center;
          border: 0;
          color: #95a197;
          background: transparent;
          cursor: pointer;
        }
        .sf-auth-error {
          margin-top: 16px;
          padding: 11px;
          border: 1px solid #6c3932;
          border-radius: 7px;
          color: #ffc2b4;
          background: #2b1917;
          font-size: 11px;
          line-height: 1.6;
        }
        .sf-auth-submit {
          width: 100%;
          min-height: 46px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 0;
          border-radius: 8px;
          color: #10170d;
          background: #b8ed8a;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .sf-auth-submit:disabled { opacity: 0.6; cursor: wait; }
        .sf-auth-switch {
          margin: 25px 0 0;
          color: #98a59a;
          font-size: 11px;
          text-align: center;
        }
        .sf-auth-switch a { color: #b8ed8a; text-decoration: none; }
        .sf-auth-footer { margin-top: 28px; color: #748176; font-size: 10px; }
        @media (max-width: 480px) {
          .sf-auth-card { padding: 25px 20px; }
        }
      `}</style>
    </main>
  );
}
