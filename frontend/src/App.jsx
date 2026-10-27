import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Loading from "./components/Loading";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SkillMap from "./pages/SkillMap";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Projects from "./pages/Projects";
import Assessments from "./pages/Assessments";
import Roadmap from "./pages/Roadmap";
import Progress from "./pages/Progress";
import Evidence from "./pages/Evidence";
import Profile from "./pages/Profile";
import PlaceholderPage from "./pages/PlaceholderPage";

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
  const { loading } = useAuth();

  if (loading) {
    return (
      <Loading
        message="Preparing your workspace..."
        fullScreen
        size={34}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skill-map" element={<SkillMap />} />
          <Route path="/skills" element={<SkillMap />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/roles"
            element={
              <PlaceholderPage
                title="Career roles"
                description="Browse target roles and compare required skills. This view will connect to the roles catalog next."
              />
            }
          />
          <Route
            path="/resume"
            element={
              <PlaceholderPage
                title="Resume analysis"
                description="Upload a resume to extract skills and highlight gaps against your target role."
              />
            }
          />
          <Route
            path="/github"
            element={
              <PlaceholderPage
                title="GitHub analysis"
                description="Connect a repository to infer skills from your commits and project structure."
              />
            }
          />
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="Settings"
                description="Account preferences and notification settings will live here."
              />
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
