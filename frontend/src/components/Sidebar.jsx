
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Network,
  BriefcaseBusiness,
  FolderKanban,
  ClipboardCheck,
  Route,
  TrendingUp,
  FileUser,
  Github,
  BookOpen,
  Settings,
  UserRound,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const navigationGroups = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { label: "Skill Map", path: "/skill-map", icon: Network },
      { label: "My Skills", path: "/skills", icon: BookOpen },
      { label: "Career Roles", path: "/roles", icon: BriefcaseBusiness }
    ]
  },
  {
    title: "CAREER TOOLS",
    items: [
      { label: "Job Opportunities", path: "/jobs", icon: BriefcaseBusiness },
      { label: "Projects", path: "/projects", icon: FolderKanban },
      { label: "Assessments", path: "/assessments", icon: ClipboardCheck },
      { label: "Learning Roadmap", path: "/roadmap", icon: Route },
      { label: "My Progress", path: "/progress", icon: TrendingUp }
    ]
  },
  {
    title: "MY PROFILE",
    items: [
      { label: "Resume Analysis", path: "/resume", icon: FileUser },
      { label: "GitHub Analysis", path: "/github", icon: Github },
      { label: "Profile", path: "/profile", icon: UserRound },
      { label: "Settings", path: "/settings", icon: Settings }
    ]
  }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sf-sidebar ${collapsed ? "sf-sidebar-collapsed" : ""}`}>
      <div className="sf-sidebar-top">
        {!collapsed && (
          <span className="sf-sidebar-heading">YOUR SPACE</span>
        )}

        <button
          type="button"
          className="sf-sidebar-toggle"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={17} />
          ) : (
            <ChevronLeft size={17} />
          )}
        </button>
      </div>

      <nav className="sf-sidebar-nav" aria-label="Sidebar navigation">
        {navigationGroups.map((group) => (
          <div className="sf-sidebar-group" key={group.title}>
            {!collapsed && (
              <p className="sf-sidebar-group-title">{group.title}</p>
            )}

            {group.items.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                title={collapsed ? label : undefined}
                aria-label={label}
                className={({ isActive }) =>
                  `sf-sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={18} strokeWidth={1.8} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="sf-sidebar-tip">
          <div className="sf-sidebar-tip-icon">
            <TrendingUp size={19} />
          </div>
          <h4>Small steps. Real progress.</h4>
          <p>Keep building skills that move you closer to your goals.</p>
        </div>
      )}

      <style>{`
        .sf-sidebar {
          position: sticky;
          top: 72px;
          display: flex;
          width: 250px;
          height: calc(100vh - 72px);
          flex: 0 0 250px;
          flex-direction: column;
          padding: 20px 13px;
          overflow-y: auto;
          border-right: 1px solid #27312b;
          background: #0d120f;
          transition: width 180ms ease, flex-basis 180ms ease;
        }

        .sf-sidebar-collapsed {
          width: 76px;
          flex-basis: 76px;
        }

        .sf-sidebar-top {
          display: flex;
          min-height: 35px;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 0 7px 13px;
        }

        .sf-sidebar-heading,
        .sf-sidebar-group-title {
          color: #77847a;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
        }

        .sf-sidebar-toggle {
          display: grid;
          width: 29px;
          height: 29px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #27312b;
          border-radius: 8px;
          color: #aab5ac;
          background: #111715;
          cursor: pointer;
        }

        .sf-sidebar-toggle:hover {
          color: #b8ed8a;
          border-color: #465c45;
        }

        .sf-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .sf-sidebar-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .sf-sidebar-group-title {
          margin: 0 8px 8px;
        }

        .sf-sidebar-link {
          position: relative;
          display: flex;
          min-height: 43px;
          align-items: center;
          gap: 12px;
          padding: 0 12px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: 9px;
          color: #929d95;
          font-size: 13px;
          white-space: nowrap;
          transition:
            color 160ms ease,
            background 160ms ease,
            border-color 160ms ease;
        }

        .sf-sidebar-link svg {
          flex-shrink: 0;
        }

        .sf-sidebar-link:hover {
          color: #edf1ed;
          background: #151c17;
        }

        .sf-sidebar-link.active {
          border-color: #2d4029;
          color: #b8ed8a;
          background: #192319;
        }

        .sf-sidebar-link.active::before {
          position: absolute;
          top: 9px;
          bottom: 9px;
          left: 0;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: #b8ed8a;
          content: "";
        }

        .sf-sidebar-collapsed .sf-sidebar-top {
          justify-content: center;
          padding-right: 0;
          padding-left: 0;
        }

        .sf-sidebar-collapsed .sf-sidebar-link {
          justify-content: center;
          padding: 0;
        }

        .sf-sidebar-tip {
          margin-top: auto;
          padding: 17px 14px;
          border: 1px solid #2b3829;
          border-radius: 12px;
          background: linear-gradient(145deg, #172018, #101611);
        }

        .sf-sidebar-tip-icon {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border-radius: 9px;
          color: #b8ed8a;
          background: #253322;
        }

        .sf-sidebar-tip h4 {
          margin: 13px 0 7px;
          color: #e5ece5;
          font-size: 12px;
        }

        .sf-sidebar-tip p {
          margin: 0;
          color: #929d95;
          font-size: 11px;
          line-height: 1.7;
        }

        @media (max-width: 780px) {
          .sf-sidebar {
            position: relative;
            top: auto;
            width: 100%;
            height: auto;
            flex: none;
            padding: 12px;
            border-right: 0;
            border-bottom: 1px solid #27312b;
          }

          .sf-sidebar-top,
          .sf-sidebar-tip {
            display: none;
          }

          .sf-sidebar-nav {
            flex-direction: row;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 3px;
          }

          .sf-sidebar-group {
            flex-direction: row;
            gap: 5px;
          }

          .sf-sidebar-group-title {
            display: none;
          }

          .sf-sidebar-link {
            min-height: 38px;
            padding: 0 10px;
            font-size: 12px;
          }

          .sf-sidebar-link.active::before {
            display: none;
          }

          .sf-sidebar-collapsed {
            width: 100%;
            flex-basis: auto;
          }
        }
      `}</style>
    </aside>
  );
}
