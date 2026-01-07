import React from 'react';

interface GlassButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

const ThemedGlassButton: React.FC<GlassButtonProps> = ({ 
  text = "Sign up", 
  onClick,
  className = "" 
}) => {
  return (
    <div className={`button-wrap relative z-10 bg-transparent pointer-events-none ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @property --angle-1 {
          syntax: "<angle>";
          inherits: false;
          initial-value: -75deg;
        }

        @property --angle-2 {
          syntax: "<angle>";
          inherits: false;
          initial-value: -45deg;
        }

        .glass-button-themed {
          /* Darker hardware base to match Computebay black */
          background: linear-gradient(-75deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05));
          background-color: #000;
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.4),
            inset 0 -0.125em 0.125em rgba(16, 185, 129, 0.3),
            0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.5),
            0 0 0.1em 0.25em rgba(16, 185, 129, 0.1) inset;
          backdrop-filter: blur(4px);
          transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1);
          border-radius: 0px; /* Sharp corners for industrial feel */
        }

        .glass-button-themed:hover {
          transform: scale(0.98);
          background-color: #050505;
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.4),
            inset 0 -0.125em 0.125em rgba(16, 185, 129, 0.5),
            0 0.15em 0.05em -0.1em rgba(0, 0, 0, 0.6),
            0 0 0.05em 0.1em rgba(16, 185, 129, 0.4) inset;
        }

        .glass-button-themed:active {
          transform: scale(0.96) rotate3d(1, 0, 0, 15deg);
        }

        .button-text-themed {
          color: #10b981; /* Emerald-500 */
          font-family: ui-monospace, monospace;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
          transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .glass-button-themed:hover .button-text-themed {
          color: #34d399; /* Emerald-400 */
          text-shadow: 0 0 12px rgba(16, 185, 129, 0.6);
        }

        /* Border Stroke Effect */
        .glass-button-themed::after {
          content: '';
          position: absolute;
          inset: 0;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
          top: -1px;
          left: -1px;
          padding: 1px;
          box-sizing: border-box;
          background:
            conic-gradient(from var(--angle-1) at 50% 50%, #064e3b, transparent 5% 40%, #10b981 50%, transparent 60% 95%, #064e3b),
            linear-gradient(180deg, rgba(16, 185, 129, 0.2), rgba(0, 0, 0, 0.5));
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1), --angle-1 500ms ease;
        }

        .glass-button-themed:hover::after {
          --angle-1: -125deg;
        }

        /* Inner Shine */
        .button-shine-themed {
          position: absolute;
          inset: 0;
          width: calc(100% - 1px);
          height: calc(100% - 1px);
          top: 0.5px;
          left: 0.5px;
          background: linear-gradient(var(--angle-2), rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.2) 40% 50%, rgba(16, 185, 129, 0) 55%);
          mix-blend-mode: screen;
          pointer-events: none;
          background-size: 200% 200%;
          background-position: 0% 50%;
          transition: background-position 500ms cubic-bezier(0.25, 1, 0.5, 1), --angle-2 500ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .glass-button-themed:hover .button-shine-themed {
          background-position: 25% 50%;
        }
      ` }} />
      
      <button 
        onClick={onClick}
        className="glass-button-themed all-unset cursor-pointer relative pointer-events-auto z-30 outline-none focus:outline-none"
      >
        <span className="button-text-themed relative block select-none px-8 py-3.5 text-sm">
          {text}
        </span>
        <div className="button-shine-themed"></div>
      </button>
    </div>
  );
};

export default ThemedGlassButton;