import { Outlet, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const auth = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (auth && auth.loading) {
    return (
      <div className="sf-layout-loading">
        <div className="sf-layout-spinner" />
        <p>Loading your workspace...</p>

        <style>{`
          .sf-layout-loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 14px;
            color: #b8ed8a;
            background: #0c100e;
            font-family: Inter, system-ui, sans-serif;
          }
          .sf-layout-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid #28342a;
            border-top-color: #b8ed8a;
            border-radius: 50%;
            animation: sf-spin 0.8s linear infinite;
          }
          @keyframes sf-spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (auth && !auth.user) {
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
