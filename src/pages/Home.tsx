import React from 'react';
import { motion } from 'framer-motion';
import {
    Cpu,
    Globe,
    Zap,
    Terminal,
    Shield,
    Activity,
    BarChart3,
    Server,
    Layers,
    User,
    WalletCards,
    LucideIcon
} from 'lucide-react';
import ShinyButton from '../components/ShinyButton';
import { useNavigate } from 'react-router-dom';
import { SparklesCore } from '../components/SparklesCore';

// --- Local WorkloadCard Component ---
interface WorkloadCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    colorClass: string;
    accentColor: string;
}

const WorkloadCard = ({ icon: Icon, title, description, colorClass, accentColor }: WorkloadCardProps) => {
    return (
        <div className="relative group p-[1px] rounded-none overflow-hidden h-full">
            {/* 1. Outer Gradient Border Glow */}
            <div
                className="absolute inset-0 z-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 0% 0%, ${accentColor}, transparent)` }}
            />

            {/* 2. Moving Dot Animation */}
            <div
                className="dot absolute w-[4px] aspect-square rounded-full z-20"
                style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 10px ${accentColor}`,
                    animation: 'moveDot 6s linear infinite'
                }}
            />

            {/* 3. Internal Card Body */}
            <div className="relative z-10 flex flex-col h-full bg-[#050505] p-8 space-y-4 border border-white/5 transition-colors group-hover:border-white/10">
                {/* Ray Effect */}
                <div
                    className="absolute blur-[40px] top-0 left-0 opacity-0 group-hover:opacity-20 w-[240px] h-[80px] rounded-full rotate-[35deg] pointer-events-none transition-opacity duration-500"
                    style={{ backgroundColor: accentColor, boxShadow: `0 0 60px ${accentColor}`, transformOrigin: '10%' }}
                />

                <div className={`inline-flex h-12 w-12 items-center justify-center bg-${colorClass}-500/10 border border-${colorClass}-500/30`}>
                    <Icon size={20} className={
                        colorClass === 'emerald' ? 'text-emerald-400' :
                            colorClass === 'sky' ? 'text-sky-400' : 'text-amber-400'
                    } />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">
                        {title}
                    </h3>
                    <p className="text-xs font-mono leading-relaxed text-slate-500 group-hover:text-slate-400 transition-colors">
                        {description}
                    </p>
                </div>

                {/* Industrial Grid Lines */}
                <div className="absolute top-4 left-0 w-full h-[1px] bg-white/[0.02]" />
                <div className="absolute top-0 left-4 w-[1px] h-full bg-white/[0.02]" />
            </div>
        </div>
    );
};

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="pb-32">
            {/* Global Animation Styles for the moving dot */}
            <style>{`
                @keyframes moveDot {
                    0%, 100% { top: 0%; left: 0%; }
                    25% { top: 0%; left: calc(100% - 4px); }
                    50% { top: calc(100% - 4px); left: calc(100% - 4px); }
                    75% { top: calc(100% - 4px); left: 0%; }
                }
            `}</style>
            <div className="fixed inset-0 z-0 w-full h-full">
                <SparklesCore
                    id="tsparticleshome"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={150}
                    className="w-full h-full"
                    particleColor="#10b981" // Emerald Green
                    speed={0.5}
                />
                {/* Radial Mask to prevent overwhelming the UI and keep text readable */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
            </div>


            {/* 1. HERO SECTION */}
            <section className="relative pt-16 pb-32">
                <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div className="inline-flex items-center gap-3 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            Grid_Status: Optimal // 62.4 TFLOPS Available
                        </div>

                        <h1 className="text-7xl font-black leading-[0.85] tracking-tighter text-white sm:text-9xl uppercase">
                            The <span className="text-emerald-500">Compute</span> <br /> Marketplace.
                        </h1>

                        <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                            Stop overpaying for idle hyperscaler capacity. Computebay leverages a global fleet of
                            <span className="text-white font-bold underline decoration-emerald-500 underline-offset-4 mx-1 text-xl">consumer hardware</span>
                            to deliver batch and simulation power at 1/10th the cost.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <ShinyButton
                                text='Launch Developer Console'
                                onClick={() => navigate('/earlyAccess')}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative border border-white/10 bg-[#050505] p-1 shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]"
                    >
                        <div className="flex items-center justify-between border-b border-white/5 bg-[#111] px-4 py-3">
                            <div className="flex gap-2">
                                <div className="h-2.5 w-2.5 bg-red-500/20 border border-red-500/40" />
                                <div className="h-2.5 w-2.5 bg-amber-500/20 border border-amber-500/40" />
                                <div className="h-2.5 w-2.5 bg-emerald-500/20 border border-emerald-500/40" />
                            </div>
                            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">Active_Jobs_v4.0.1</span>
                        </div>
                        <div className="p-5 space-y-4 font-mono text-[11px]">
                            <div className="flex items-center justify-between border border-emerald-500/20 bg-emerald-500/5 p-4 group hover:bg-emerald-500/10 transition-colors">
                                <span className="text-emerald-400 flex items-center gap-2">
                                    <Activity size={14} /> job_7f23: scarpe_order_lists
                                </span>
                                <span className="text-emerald-500 font-bold">ACTIVE [128 vCPUs]</span>
                            </div>
                            <div className="flex items-center justify-between border border-sky-500/20 bg-sky-500/5 p-4 group hover:bg-sky-500/10 transition-colors">
                                <span className="text-sky-400 flex items-center gap-2">
                                    <Server size={14} /> job_8aa1: Flux_Image_Batch
                                </span>
                                <span className="text-sky-300 font-bold">QUEUED [RTX 4090 x 64]</span>
                            </div>
                            <div className="space-y-1 p-3 text-slate-500 text-[10px] bg-black/40 border border-white/5">
                                <div className="flex justify-between"><span>{`> BOOTING_SANDBOX...`}</span><span className="text-emerald-500">READY</span></div>
                                <div className="flex justify-between"><span>{`> VRAM_ALLOC_24GB...`}</span><span className="text-emerald-500">SUCCESS</span></div>
                                <div className="flex items-center gap-1 mt-2 text-emerald-400">
                                    {`> MONITORING_STREAM`}
                                    <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="h-3.5 w-2 bg-emerald-500" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. USE CASES SECTION (INTEGRATED WITH WORKLOADCARD) */}
            <section id="use-cases" className="mb-24">
                <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-slate-500 border-l-2 border-emerald-500 pl-4">Workloads we like</h2>
                        <p className="mt-2 text-m text-slate-400 max-w-xl font-mono">
                            Computebay is tuned for long-running, embarrassingly parallel jobs where throughput matters more than single-request latency.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <WorkloadCard
                        icon={Cpu}
                        title="Batch & simulations"
                        description="Monte Carlo, risk engines, backtests, scientific sweeps—anything that can be split into thousands of independent trials."
                        colorClass="emerald"
                        accentColor="#10b981"
                    />
                    <WorkloadCard
                        icon={Server}
                        title="GPU-heavy inference"
                        description="Image generation, TTS/STT, computer vision, and custom model inference that benefits from many affordable consumer GPUs."
                        colorClass="sky"
                        accentColor="#0ea5e9"
                    />
                    <WorkloadCard
                        icon={BarChart3}
                        title="Offline data pipelines"
                        description="ETL, rendering queues, and log crunching where you care about finishing the batch, not serving a single request in 50ms."
                        colorClass="amber"
                        accentColor="#f59e0b"
                    />
                </div>
            </section>

            {/* 4. DUAL AUDIENCE SECTION */}
            <section id="for-developers" className="grid gap-1 md:grid-cols-2 mb-24">
                <div className="group border border-white/10 bg-[#080808] p-12 transition-all hover:bg-[#0A0A0A] hover:border-emerald-500/50">
                    <div className="mb-8 flex h-14 w-14 items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <Terminal size={28} />
                    </div>
                    <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-emerald-500">Marketplace_Demands</h3>
                    <h2 className="mb-6 text-4xl font-bold uppercase tracking-tighter text-white leading-none">Access Global <br /> Scale.</h2>
                    <p className="mb-8 text-base leading-relaxed text-slate-400">Deploy dockerized workloads instantly. We handle the hardware matching, sandboxing, and job resumption so you can focus on building.</p>
                    <ul className="grid grid-cols-1 gap-4 font-mono text-[11px] uppercase tracking-tight text-slate-300">
                        <li className="flex items-center gap-3 bg-white/5 p-3 border border-white/5"><Shield size={14} className="text-emerald-500" /> Hardened gVisor Isolation</li>
                        <li className="flex items-center gap-3 bg-white/5 p-3 border border-white/5"><Zap size={14} className="text-emerald-500" /> Instant Failover Logic</li>
                        <li className="flex items-center gap-3 bg-white/5 p-3 border border-white/5"><BarChart3 size={14} className="text-emerald-500" /> Credit-Based Metering</li>
                    </ul>
                </div>

                <div className="group border border-white/10 bg-[#080808] p-12 transition-all hover:bg-[#0A0A0A] hover:border-sky-500/50">
                    <div className="mb-8 flex h-14 w-14 items-center justify-center bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        <Globe size={28} />
                    </div>
                    <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-sky-500">Marketplace_Supply</h3>
                    <h2 className="mb-6 text-4xl font-bold uppercase tracking-tighter text-white leading-none">Monetize Your <br /> Hardware.</h2>
                    <p className="mb-8 text-base leading-relaxed text-slate-400">Turn your idle GPUs and CPUs into a recurring stream of platform credits. Non-invasive, secure, and fully automated background operation.</p>
                    <ul className="grid grid-cols-1 gap-4 font-mono text-[11px] uppercase tracking-tight text-slate-300">
                        <li className="flex items-center gap-3 bg-white/5 p-3 border border-white/5"><Layers size={14} className="text-sky-500" /> One-Click Agent Install</li>
                        <li className="flex items-center gap-3 bg-white/5 p-3 border border-white/5"><Activity size={14} className="text-sky-500" /> Real-time Earnings Tracker</li>
                        <li className="flex items-center gap-3 bg-white/5 p-3 border border-white/5"><Shield size={14} className="text-sky-500" /> zero-access security</li>
                    </ul>
                </div>
            </section>

            {/* 5. EXECUTION FLOW */}
            <section id="how-it-works" className="py-24 border-t border-white/5">
                <div className="mb-20">
                    <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500 text-center mb-4">
                        End-to-end flow
                    </h2>
                    <h3 className="text-5xl font-black text-white text-center uppercase tracking-tighter">
                        From job idea to settled credits
                    </h3>
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                    {[
                        { n: '01', t: 'Define the job', d: 'Developer creates a batch or simulation job, picks CPU/GPU shape, and funds it with platform credits.' },
                        { n: '02', t: 'Schedule & route', d: 'Scheduler queues work, then routes tasks onto the best-value contributor nodes based on health and price.' },
                        { n: '03', t: 'Run in sandbox', d: 'A lightweight agent spins up an isolated container, streams logs back to the control plane, and tears everything down.' },
                        { n: '04', t: 'Settle credits', d: 'Actual CPU/GPU time is measured, credits are debited from the submitter, and contributors earn based on usage.' },
                    ].map((step, i) => (
                        <div key={i} className="group relative border border-white/5 bg-[#050505] p-8 transition-all hover:bg-white/5">
                            <span className="absolute top-6 left-8 font-mono text-5xl font-black text-white/[0.03] group-hover:text-emerald-500/10 transition-colors">
                                {step.n}
                            </span>
                            <div className="h-1 w-12 bg-emerald-500 mb-6" />
                            <h4 className="mb-3 font-bold uppercase tracking-widest text-white text-sm">{step.t}</h4>
                            <p className="text-xs leading-relaxed text-slate-500 group-hover:text-slate-400">{step.d}</p>
                            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] text-slate-600 uppercase">
                                <span className="h-1 w-1 rounded-full bg-slate-700" /> Verification_Step
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. TEXTUAL OVERVIEW / ROLES */}
            {/* 6. TEXTUAL OVERVIEW / ROLES */}
            <section className="py-24 border-t border-white/5 w-full">
                {/* This wrapper keeps the content centered and readable while the border above stays full-width */}
                <div className="mx-auto max-w-7xl px-10">
                    <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] items-start">

                        {/* Left Column: Overview */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2">
                                    <span className="h-[1px] w-8 bg-emerald-500/50" />
                                    Overview
                                </h2>
                                <h3 className="text-4xl font-black text-white tracking-tight italic uppercase leading-none">
                                    A marketplace <br /> for compute
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-400 font-mono max-w-md">
                                    Computebay connects developers who need batch power with contributors running idle hardware. Jobs are micro-orchestrated and settled in credits.
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-3">
                                {[
                                    { t: 'Reliability', d: 'Health checks and resumable workloads.' },
                                    { t: 'Security', d: 'Hardened isolated containers.' },
                                    { t: 'Payments', d: 'Unified credit ledger system.' }
                                ].map((feat, i) => (
                                    <div key={i} className="group">
                                        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-bold underline decoration-white/10 underline-offset-8 transition-all group-hover:decoration-emerald-500/50">
                                            {feat.t}
                                        </div>
                                        <p className="mt-3 text-slate-500 font-mono text-[10px] leading-tight group-hover:text-slate-400">
                                            {feat.d}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Roles */}
                        <div className="relative space-y-10 border-l border-white/5 pl-12">
                            {/* Job Submitter Role */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 flex items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-md font-black text-white uppercase italic tracking-tighter">Job submitter</h4>
                                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-0.5">Demand Side</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-[11px] text-slate-400 font-mono uppercase tracking-tight">
                                    <li className="flex items-center gap-2 text-slate-500"><span className="text-emerald-500">→</span> Create resource specs & SLAs</li>
                                    <li className="flex items-center gap-2 text-slate-500"><span className="text-emerald-500">→</span> Real-time log streaming</li>
                                    <li className="flex items-center gap-2 text-slate-500"><span className="text-emerald-500">→</span> Detailed usage reporting</li>
                                </ul>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                            {/* Contributor Role */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 flex items-center justify-center bg-sky-500/10 text-sky-400 border border-sky-500/20">
                                        <WalletCards size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-md font-black text-white uppercase italic tracking-tighter">Compute contributor</h4>
                                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-0.5">Supply Side</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-[11px] text-slate-400 font-mono uppercase tracking-tight">
                                    <li className="flex items-center gap-2 text-slate-500"><span className="text-sky-500">→</span> Secure one-click registry</li>
                                    <li className="flex items-center gap-2 text-slate-500"><span className="text-sky-500">→</span> Uptime & health heartbeat</li>
                                    <li className="flex items-center gap-2 text-slate-500"><span className="text-sky-500">→</span> Instant credit withdrawal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;