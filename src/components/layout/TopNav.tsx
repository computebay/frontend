import { useNavigate } from 'react-router-dom';
import ThemedGlassButton from '../ThemedGlassButton'; // Adjust path as needed

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-8xlitems-center justify-between px-8 py-4">
        
        {/* Logo Section - Redirects to '/' */}
        <a 
          href="/" 
          className="group flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="relative h-7 w-7 bg-emerald-500 flex items-center justify-center">
             <div className="absolute inset-0 bg-emerald-500 animate-pulse blur-sm opacity-50" />
             <span className="relative text-[10px] font-black text-black">CB</span>
          </div>
          <div className="leading-none">
            <div className="text-sm font-black tracking-tighter text-white uppercase">
              Computebay
            </div>
          </div>
        </a>

        {/* Navigation - Monospaced & Sharp */}
        <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-slate-400 md:flex">
          
          
          {/* Integrated Themed Glass Button */}
          <ThemedGlassButton 
            text="Join Waitlist" 
            onClick={() => navigate('/earlyAccess')} 
          />
        </nav>
      </div>
    </header>
  );
};

export default TopNav;