import { useEffect, useState } from "react";
import { UserRound, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    full_name: "", email: "", headline: "", location: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      full_name: user?.full_name || user?.name || "",
      email: user?.email || "",
      headline: user?.headline || "",
      location: user?.location || ""
    });
  }, [user]);

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (typeof authService.updateProfile !== "function") {
        throw new Error("Add updateProfile() to authService before saving.");
      }

      await authService.updateProfile({
        full_name: form.full_name,
        headline: form.headline,
        location: form.location
      });
      setMessage("Profile updated successfully.");
    } catch (e) {
      setError(e.message || "Could not update your profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="sf-page">
      <header className="sf-page-header">
        <span className="sf-eyebrow">YOUR PERSONAL SPACE</span>
        <h1>Profile settings</h1>
        <p>Keep your career information accurate and up to date.</p>
      </header>

      <form className="sf-panel sf-profile-form" onSubmit={submit}>
        <div className="sf-profile-heading">
          <div className="sf-avatar"><UserRound size={27} /></div>
          <div>
            <h2>{form.full_name || "Your profile"}</h2>
            <p>{form.email || "No email available"}</p>
          </div>
        </div>

        <label>
          Full name
          <input required value={form.full_name}
            onChange={e => update("full_name", e.target.value)} />
        </label>

        <label>
          Email address
          <input type="email" value={form.email} disabled />
          <small>Email changes should be handled through a verified account flow.</small>
        </label>

        <label>
          Professional headline
          <input placeholder="e.g. Computer Science Student | Aspiring Developer"
            value={form.headline}
            onChange={e => update("headline", e.target.value)} />
        </label>

        <label>
          Location
          <input placeholder="City or region" value={form.location}
            onChange={e => update("location", e.target.value)} />
        </label>

        {message && <p className="sf-success">{message}</p>}
        {error && <p className="sf-error">{error}</p>}

        <button className="sf-save" disabled={loading}>
          <Save size={16} /> {loading ? "Saving..." : "Save changes"}
        </button>
      </form>

      <style>{`
        .sf-page{color:#edf1ed;font-family:Inter,system-ui,sans-serif}
        .sf-page-header{margin-bottom:25px}.sf-eyebrow{color:#a7d985;font-size:10px;letter-spacing:1.4px;font-weight:700}
        .sf-page-header h1{font-size:32px;letter-spacing:-1px;margin:10px 0}
        .sf-page-header p,.sf-profile-heading p{color:#9ba79d;font-size:12px;line-height:1.8}
        .sf-panel{padding:24px;border:1px solid #29342b;border-radius:12px;background:#111715}
        .sf-profile-form{display:grid;gap:19px;max-width:650px}
        .sf-profile-heading{display:flex;align-items:center;gap:14px;padding-bottom:20px;border-bottom:1px solid #29342b}
        .sf-avatar{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:#243320;color:#b8ed8a}
        .sf-profile-heading h2{margin:0;font-size:18px}.sf-profile-heading p{margin:5px 0}
        .sf-profile-form label{display:grid;gap:8px;color:#cbd7ca;font-size:11px}
        .sf-profile-form input{box-sizing:border-box;width:100%;padding:12px;border:1px solid #344036;border-radius:7px;background:#0e1410;color:#edf1ed;outline:none}
        .sf-profile-form input:focus{border-color:#8dbd70}.sf-profile-form input:disabled{opacity:.65}
        .sf-profile-form small{color:#879388;font-size:10px}
        .sf-save{display:flex;justify-content:center;align-items:center;gap:8px;padding:12px;border:0;border-radius:8px;background:#b8ed8a;color:#14200f;font-weight:700;cursor:pointer}
        .sf-success{color:#b8ed8a;font-size:12px}.sf-error{color:#ffc2b4;font-size:12px}
      `}</style>
    </main>
  );
}
