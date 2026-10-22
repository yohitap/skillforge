
import { LoaderCircle } from "lucide-react";

export default function Loading({
  message = "Loading...",
  fullScreen = false,
  size = 24
}) {
  return (
    <div
      className={`loading-container ${
        fullScreen ? "loading-fullscreen" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className="loading-spinner"
        size={size}
        aria-hidden="true"
      />
      <span>{message}</span>

      <style>{`
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 32px 16px;
          color: #929d95;
          font-size: 14px;
        }

        .loading-fullscreen {
          min-height: 100vh;
          flex-direction: column;
          background: #0b0f0e;
        }

        .loading-spinner {
          flex-shrink: 0;
          color: #b8ed8a;
          animation: skillforge-spin 1s linear infinite;
        }

        @keyframes skillforge-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-spinner {
            animation-duration: 3s;
          }
        }
      `}</style>
    </div>
  );
}
