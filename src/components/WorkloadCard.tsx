import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface WorkloadCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass: string; // e.g., 'emerald', 'sky', 'amber'
  accentColor: string; // Hex for the dot and glow
}

const WorkloadCard = ({ icon: Icon, title, description, colorClass, accentColor }: WorkloadCardProps) => {
  return (
    <div className="relative group p-[1px] rounded-xl overflow-hidden h-full">
      {/* 1. The Outer Gradient Border */}
      <div 
        className="absolute inset-0 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 0% 0%, ${accentColor}, transparent)` }}
      />

      {/* 2. The Moving Dot (Animation defined in CSS below) */}
      <div 
        className="dot absolute w-[4px] aspect-square rounded-full z-20"
        style={{ 
          backgroundColor: accentColor, 
          boxShadow: `0 0 10px ${accentColor}`,
          animation: 'moveDot 6s linear infinite' 
        }}
      />

      {/* 3. The Internal Card */}
      <div className="relative z-10 flex flex-col h-full bg-[#050505] p-6 space-y-3 rounded-[11px] border border-white/10 group-hover:border-white/20 transition-colors">
        
        {/* The Animated Ray Effect */}
        <div 
          className="absolute blur-[30px] top-0 left-0 opacity-10 group-hover:opacity-20 w-[200px] h-[60px] rounded-full rotate-[35deg] pointer-events-none transition-opacity"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 50px ${accentColor}`, transformOrigin: '10%' }}
        />

        {/* Card Content */}
        <div className={`inline-flex h-10 w-10 items-center justify-center bg-${colorClass}-500/10 text-${colorClass}-400 border border-${colorClass}-500/30`}>
          <Icon size={18} />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-xs font-mono leading-relaxed text-slate-500 group-hover:text-slate-400 transition-colors">
          {description}
        </p>

        {/* Decorative Grid Lines */}
        <div className="absolute top-4 left-0 w-full h-[1px] bg-white/5" />
        <div className="absolute top-0 left-4 w-[1px] h-full bg-white/5" />
      </div>
    </div>
  );
};