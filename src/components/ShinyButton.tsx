import React from 'react';

interface ShinyButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

const ShinyButton: React.FC<ShinyButtonProps> = ({ 
  text = "Launch Developer Console", 
  onClick,
  className = "" 
}) => {
  return (
    <div className={`inline-block bg-transparent ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .shiny-cta-themed {
          --gradient-angle: 0deg;
          --gradient-angle-offset: 0deg;
          --gradient-shine: #10b981; /* Emerald-500 */
          position: relative;
          overflow: hidden;
          /* Sharp industrial corners to match your theme */
          border-radius: 0px; 
          padding: 1rem 2rem;
          font-size: 0.75rem;
          line-height: 1.2;
          font-weight: 900;
          color: #ffffff;
          /* Black background with Emerald glowing conic border */
          background: linear-gradient(#000000, #000000) padding-box, 
                      conic-gradient(from calc(var(--gradient-angle) - var(--gradient-angle-offset)), 
                      transparent 0%, #064e3b 5%, var(--gradient-shine) 15%, #064e3b 30%, 
                      transparent 40%, transparent 100%) border-box;
          border: 1px solid transparent;
          box-shadow: inset 0 0 0 1px #111;
          outline: none;
          cursor: pointer;
          isolation: isolate;
          /* Technical Monospace Font */
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          z-index: 0;
          animation: border-spin 3s linear infinite;
        }

        @keyframes border-spin {
          to { --gradient-angle: 360deg; }
        }

        .shiny-cta-themed:active {
          transform: translateY(1px);
        }

        /* The Grid/Dot pattern inside the button */
        .shiny-cta-themed::before {
          content: '';
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          --size: calc(100% - 4px);
          --position: 2px;
          --space: 6px;
          width: var(--size);
          height: var(--size);
          background: radial-gradient(circle at var(--position) var(--position), #10b981 0.5px, transparent 0) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(from calc(var(--gradient-angle) + 45deg), black, transparent 10% 90%, black);
          opacity: 0.2;
        }

        /* Bottom "glow" breath effect */
        .shiny-cta-themed span::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          width: 100%;
          height: 100%;
          box-shadow: 0 0 1.5rem 2px rgba(16, 185, 129, 0.2);
          opacity: 0;
          transition: opacity 500ms;
        }

        .shiny-cta-themed:hover span::before {
          opacity: 1;
        }

        .shiny-cta-themed span {
          position: relative;
          z-index: 2;
          display: inline-block;
        }
      ` }} />
      <button 
        className="shiny-cta-themed focus:outline-none" 
        onClick={onClick}
      >
        <span>{text}</span>
      </button>
    </div>
  );
};

export default ShinyButton;