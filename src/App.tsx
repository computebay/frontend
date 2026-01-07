import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EarlyAccess from './pages/EarlyAccess';
import TopNav from './components/layout/TopNav';
import SmoothScroll from './components/layout/SmoothScroll';
import About from './pages/About';
const App = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-black text-slate-200 selection:bg-emerald-500 selection:text-black">
        {/* Blueprint Grid Overlay */}
        <div
          className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <TopNav />

        <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/earlyAccess" element={<EarlyAccess />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="relative z-10 border-t border-white/5 bg-black py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-6 sm:gap-8 md:flex-row md:items-center">
              <div>
                <div className="text-base sm:text-lg font-black uppercase tracking-tighter text-white">Computebay</div>
                <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mt-1">Systems_Global // v1.0.4</p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500">
                <span className="flex items-center gap-1 sm:gap-2">
                  <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Network_Operational
                </span>
                <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
};

export default App;