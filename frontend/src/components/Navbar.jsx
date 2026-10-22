
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, LogOut, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Skill Map", to: "/skill-map" },
  { label: "Jobs", to: "/jobs" },
  { label: "Projects", to: "/projects" },
  { label: "Roadmap", to: "/roadmap" }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="sf-navbar">
      <Link to="/dashboard" className="sf-navbar-brand">
        <span className="sf-navbar-logo">S</span>
        <span>SkillForge</span>
      </Link>

      <button
        type="button"
        className="sf-mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <nav
        className={`sf-navbar-links ${menuOpen ? "sf-navbar-open" : ""}`}
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `sf-navbar-link ${isActive ? "active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}

        <Link
          to="/profile"
          className="sf-navbar-profile"
          onClick={() => setMenuOpen(false)}
        >
          <UserRound size={17} />
          <span>{user?.full_name || user?.name || "My profile"}</span>
        </Link>

        <button
          type="button"
          className="sf-navbar-logout"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </nav>

      <style>{`
        .sf-navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 0 5%;
          border-bottom: 1px solid #27312b;
          background: rgba(11, 15, 14, 0.94);
          backdrop-filter: blur(18px);
        }

        .sf-navbar-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #edf1ed;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.6px;
          white-space: nowrap;
        }

        .sf-navbar-logo {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border-radius: 10px;
          color: #10170d;
          background: #b8ed8a;
          font-size: 18px;
          font-weight: 800;
        }

        .sf-navbar-links {
          display: flex;
          align-items: center;
          gap: 23px;
        }

        .sf-navbar-link {
          color: #929d95;
          font-size: 13px;
          transition: color 160ms ease;
        }

        .sf-navbar-link:hover,
        .sf-navbar-link.active {
          color: #b8ed8a;
        }

        .sf-navbar-profile {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          max-width: 180px;
          color: #c5cec6;
          font-size: 13px;
        }

        .sf-navbar-profile span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sf-navbar-logout,
        .sf-mobile-menu {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 12px;
          border: 1px solid #303a33;
          border-radius: 9px;
          color: #dce4dd;
          background: #111715;
          font-size: 12px;
          cursor: pointer;
        }

        .sf-navbar-logout:hover {
          border-color: #b8ed8a;
        }

        .sf-mobile-menu {
          display: none;
        }

        @media (max-width: 1000px) {
          .sf-navbar {
            padding: 0 24px;
          }

          .sf-navbar-links {
            gap: 14px;
          }
        }

        @media (max-width: 780px) {
          .sf-mobile-menu {
            display: inline-flex;
          }

          .sf-navbar-links {
            position: absolute;
            top: 71px;
            left: 0;
            right: 0;
            display: none;
            align-items: stretch;
            flex-direction: column;
            gap: 0;
            padding: 12px 24px 20px;
            border-bottom: 1px solid #27312b;
            background: #0b0f0e;
          }

          .sf-navbar-links.sf-navbar-open {
            display: flex;
          }

          .sf-navbar-link,
          .sf-navbar-profile,
          .sf-navbar-logout {
            min-height: 44px;
            display: flex;
            align-items: center;
          }

          .sf-navbar-logout {
            justify-content: flex-start;
          }
        }
      `}</style>
    </header>
  );
}
