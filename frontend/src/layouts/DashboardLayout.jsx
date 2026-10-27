import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <Loading
        message="Loading your workspace..."
        fullScreen
        size={30}
      />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="sf-dashboard-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="sf-layout-main">
        <Navbar onMenuClick={() => setSidebarOpen((open) => !open)} />

        <main className="sf-layout-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        .sf-dashboard-layout {
          min-height: 100vh;
          display: flex;
          color: #edf1ed;
          background: #0c100e;
          font-family: Inter, system-ui, -apple-system, sans-serif;
        }

        .sf-layout-main {
          flex: 1;
          min-width: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .sf-layout-content {
          width: 100%;
          max-width: 1600px;
          flex: 1;
          box-sizing: border-box;
          margin: 0 auto;
          padding: 30px;
        }

        @media (max-width: 768px) {
          .sf-layout-content {
            padding: 20px 15px;
          }
        }
      `}</style>
    </div>
  );
}
