import type { PropsWithChildren } from 'react';
import TopNav from './TopNav';

const PageShell = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      {/* Sharp, Technical Grid Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
          backgroundSize: '50px 50px' 
        }} 
      />
      
      <TopNav />
      
      {/* Asymmetric Container: Wide but shifted */}
      <main className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:pl-12 lg:pr-6 mx-auto max-w-[1600px]">
        {children}
      </main>

      <footer className="relative z-10 mt-32 sm:mt-40 border-t border-white/5 bg-black py-8 sm:py-12 px-4 sm:px-6 lg:pl-12">
        <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-slate-600">
          Terminal_ID: CB-GLOBAL-OS // {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};