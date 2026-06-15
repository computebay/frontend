import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemedGlassButton from '../ThemedGlassButton'; // Adjust path as needed

const TopNav = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex w-full items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 py-4">
        
        {/* Logo Section - Redirects to '/' */}
        <a 
          href="/" 
          className="group flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80"
        >
          <div className="relative h-6 w-6 sm:h-7 sm:w-7 bg-emerald-500 flex items-center justify-center">
             <div className="absolute inset-0 bg-emerald-500 animate-pulse blur-sm opacity-50" />
             <span className="relative text-[9px] sm:text-[10px] font-black text-black">CB</span>
          </div>
          <div className="leading-none">
            <div className="text-xs sm:text-sm font-black tracking-tighter text-white uppercase">
              Computebay
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-slate-400">
          <button 
            onClick={() => navigate('/about')}
            className="hover:text-emerald-400 transition-colors"
          >
            About
          </button>
          
          {/* Integrated Themed Glass Button */}
          <ThemedGlassButton 
            text="Join Waitlist" 
            onClick={() => navigate('/earlyAccess')} 
          />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-emerald-400 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
          <div className="px-4 sm:px-6 py-4 space-y-4">
            <button 
              onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left font-mono text-[11px] uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition-colors py-2"
            >
              About
            </button>
            <div className="pt-2">
              <ThemedGlassButton 
                text="Join Waitlist" 
                onClick={() => {
                  navigate('/earlyAccess');
                  setIsMenuOpen(false);
                }}
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;