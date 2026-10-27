import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.full_name.trim() || !form.email.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="sf-register-page">
      <Link to="/" className="sf-register-brand">
        <span><BrainCircuit size={22} /></span>
        SkillForge<span className="sf-register-dot">.</span>
      </Link>

      <section className="sf-register-card">
        <span className="sf-register-kicker">START BUILDING</span>
        <h1>Create your account.</h1>
        <p className="sf-register-description">
          Set up your profile and start turning your career goals into action.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="full_name">Full name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-password">Password</label>
          <div className="sf-register-password">
            <input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              minLength={8}
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

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && (
            <div className="sf-register-error" role="alert">{error}</div>
          )}

          <button
            className="sf-register-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        <p className="sf-register-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>

      <style>{`
        .sf-register-page {
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
        .sf-register-brand {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 28px;
          color: #edf1ed;
          text-decoration: none;
          font-size: 21px;
          font-weight: 750;
        }
        .sf-register-brand > span:first-child {
          display: grid;
          width: 37px;
          height: 37px;
          place-items: center;
          border-radius: 10px;
          color: #b8ed8a;
          background: #1c291b;
        }
        .sf-register-dot { margin-left: -8px; color: #b8ed8a; }
        .sf-register-card {
          width: 100%;
          max-width: 440px;
          padding: 34px;
          border: 1px solid #29342b;
          border-radius: 17px;
          background: #111715;
        }
        .sf-register-kicker {
          color: #b8ed8a;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 1.3px;
        }
        .sf-register-card h1 {
          margin: 12px 0;
          font-size: 28px;
          letter-spacing: -0.8px;
        }
        .sf-register-description {
          margin: 0 0 22px;
          color: #98a59a;
          font-size: 12px;
          line-height: 1.8;
        }
        .sf-register-card form { display: flex; flex-direction: column; }
        .sf-register-card label {
          margin: 13px 0 8px;
          color: #dce4dc;
          font-size: 11px;
          font-weight: 600;
        }
        .sf-register-card input {
          width: 100%;
          min-width: 0;
          height: 44px;
          padding: 0 12px;
          border: 1px solid #344036;
          border-radius: 8px;
          outline: none;
          color: #edf1ed;
          background: #0d120f;
          font-size: 12px;
        }
        .sf-register-card input:focus { border-color: #b8ed8a; }
        .sf-register-card input::placeholder { color: #69766c; }
        .sf-register-password { position: relative; }
        .sf-register-password input { padding-right: 45px; }
        .sf-register-password button {
          position: absolute;
          top: 0;
          right: 0;
          height: 44px;
          width: 43px;
          display: grid;
          place-items: center;
          border: 0;
          color: #95a197;
          background: transparent;
          cursor: pointer;
        }
        .sf-register-error {
          margin-top: 15px;
          padding: 11px;
          border: 1px solid #6c3932;
          border-radius: 7px;
          color: #ffc2b4;
          background: #2b1917;
          font-size: 11px;
          line-height: 1.6;
        }
        .sf-register-submit {
          min-height: 46px;
          margin-top: 22px;
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
        .sf-register-submit:disabled { opacity: 0.6; cursor: wait; }
        .sf-register-switch {
          margin: 23px 0 0;
          color: #98a59a;
          font-size: 11px;
          text-align: center;
        }
        .sf-register-switch a { color: #b8ed8a; text-decoration: none; }
        @media (max-width: 480px) {
          .sf-register-card { padding: 25px 20px; }
        }
      `}</style>
    </main>
  );
}
