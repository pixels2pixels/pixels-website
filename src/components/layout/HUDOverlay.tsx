'use client';

import { useEffect, useState } from 'react';

export default function HUDOverlay() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Global HUD overlay styles */}
      <style>{`
        .hud-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }

        /* Corner brackets */
        .hud-corner {
          position: absolute;
          width: 28px;
          height: 28px;
        }
        .hud-corner::before,
        .hud-corner::after {
          content: '';
          position: absolute;
          background: #00b4d8;
          opacity: 0.7;
        }
        .hud-corner::before { width: 2px; height: 100%; }
        .hud-corner::after  { width: 100%; height: 2px; }

        .hud-tl { top: 14px; left: 14px; }
        .hud-tl::before { top: 0; left: 0; }
        .hud-tl::after  { top: 0; left: 0; }

        .hud-tr { top: 14px; right: 14px; transform: scaleX(-1); }
        .hud-tr::before { top: 0; left: 0; }
        .hud-tr::after  { top: 0; left: 0; }

        .hud-bl { bottom: 14px; left: 14px; transform: scaleY(-1); }
        .hud-bl::before { top: 0; left: 0; }
        .hud-bl::after  { top: 0; left: 0; }

        .hud-br { bottom: 14px; right: 14px; transform: scale(-1, -1); }
        .hud-br::before { top: 0; left: 0; }
        .hud-br::after  { top: 0; left: 0; }

        /* Thin neon edge lines — top and bottom only, very subtle */
        .hud-edge-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #00b4d8 30%, #00b4d8 70%, transparent 100%);
          opacity: 0.25;
        }
        .hud-edge-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #00b4d8 30%, #00b4d8 70%, transparent 100%);
          opacity: 0.25;
        }

        /* Scan line — single slow-moving line */
        @keyframes hud-scan {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 0.08; }
          95%  { opacity: 0.08; }
          100% { top: 100%; opacity: 0; }
        }
        .hud-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00b4d8 20%, #00b4d8 80%, transparent);
          animation: hud-scan 8s linear infinite;
          opacity: 0;
        }

        /* HUD info text */
        .hud-info {
          position: absolute;
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: #00b4d8;
          opacity: 0.45;
          text-transform: uppercase;
          line-height: 1.6;
        }
        .hud-info-tl { top: 18px; left: 52px; }
        .hud-info-tr { top: 18px; right: 52px; text-align: right; }
        .hud-info-bl { bottom: 18px; left: 52px; }
        .hud-info-br { bottom: 18px; right: 52px; text-align: right; }

        /* Dot pulse in corners */
        @keyframes hud-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 0.15; }
        }
        .hud-dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #00b4d8;
          margin-right: 5px;
          vertical-align: middle;
          animation: hud-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="hud-overlay" aria-hidden="true">
        {/* Edge lines */}
        <div className="hud-edge-top" />
        <div className="hud-edge-bottom" />

        {/* Scan line */}
        <div className="hud-scanline" />

        {/* Corner brackets */}
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />

        {/* HUD info — top left */}
        <div className="hud-info hud-info-tl">
          <span className="hud-dot" />P2P STUDIO
        </div>

        {/* HUD info — top right */}
        <div className="hud-info hud-info-tr">
          SYS: ONLINE
        </div>

        {/* HUD info — bottom left */}
        <div className="hud-info hud-info-bl">
          BGD · SRB · 44°49′N 20°27′E
        </div>

        {/* HUD info — bottom right */}
        <div className="hud-info hud-info-br">
          {time}
        </div>
      </div>
    </>
  );
}
