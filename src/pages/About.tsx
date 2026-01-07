"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
    Cpu, Shield, Zap, Database, Layers, Network, 
    Terminal, Lock, Coins, Box, Activity,
    ArrowLeft, Server, Globe, Workflow, CpuIcon,
    ArrowRightLeft, Gauge, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SparklesCore } from '../components/SparklesCore';

const StepCard = ({ number, title, steps }: { number: string, title: string, steps: string[] }) => (
    <div className="bg-[#080808] border border-white/5 p-6 space-y-4 hover:border-emerald-500/20 transition-all">
        <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-emerald-500 tracking-[0.3em] font-bold">{number}</span>
            <h4 className="text-xs font-black text-white uppercase italic">{title}</h4>
        </div>
        <div className="space-y-3">
            {steps.map((step, i) => (
                <div key={i} className="flex gap-3 items-start group">
                    <span className="text-emerald-500/30 font-mono text-[10px] mt-0.5">[{i + 1}]</span>
                    <p className="text-[10px] font-mono text-slate-500 leading-tight uppercase group-hover:text-slate-300 transition-colors">
                        {step}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-black text-slate-200 selection:bg-emerald-500 selection:text-black font-mono">
            {/* Background Layer */}
            <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
                <SparklesCore id="tsparticlesabout" background="transparent" minSize={0.4} maxSize={1} particleDensity={50} className="w-full h-full" particleColor="#10b981" speed={0.2} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <button 
                    onClick={() => navigate('/')}
                    className="mb-12 flex items-center gap-2 text-[10px] uppercase text-slate-500 hover:text-emerald-400 transition-colors"
                >
                    <ArrowLeft size={14} /> System_Root
                </button>

                {/* LAYER 01: THE MANIFESTO (HOW IT HELPS) */}
                <section className="mb-24 space-y-12">
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
                            Decentralized <br /> <span className="text-emerald-500">Compute</span> Architecture.
                        </h1>
                        <p className="text-sm leading-relaxed text-slate-400 uppercase tracking-tight">
                            Computebay is a distributed marketplace designed to solve the "Idle Capacity Problem." 
                            Traditional cloud providers maintain massive overhead; we tap into the 
                            <span className="text-white mx-1">global fleet of high-performance consumer hardware</span> 
                            to provide a redundant, cost-effective grid for embarrassingly parallel workloads.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            { t: "Cost Efficiency", d: "1/10th the price of AWS/Azure by eliminating hyperscaler margin and idle-state costs.", i: Gauge },
                            { t: "Native Isolation", d: "Zero-trust execution environment utilizing gVisor to intercept system calls at the kernel level.", i: Shield },
                            { t: "Fault Tolerance", d: "Automated job resumption and stateless worker matching via Consul-backed discovery.", i: Lock }
                        ].map((feat, i) => (
                            <div key={i} className="p-6 border border-white/5 bg-[#050505]/50 backdrop-blur-sm">
                                {React.createElement(feat.i, { size: 20, className: "text-emerald-500 mb-4" })}
                                <h3 className="text-xs font-bold text-white uppercase mb-2">{feat.t}</h3>
                                <p className="text-[10px] text-slate-500 leading-relaxed uppercase">{feat.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* LAYER 02: THE USER FLOW (DETAILED JOURNEYS) */}
                <section className="mb-24 py-16 border-y border-white/5 bg-[#030303]/50">
                    <div className="mb-12 text-center">
                        <h2 className="text-[10px] text-emerald-500 tracking-[0.5em] uppercase font-bold mb-2">Protocol_Journeys</h2>
                        <p className="text-xl font-black text-white uppercase italic">Two roles. One unified ledger.</p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Submitter Track */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-1 bg-emerald-500 w-12" />
                                <h3 className="text-lg font-black text-white uppercase italic tracking-widest">Job_Submitter (Dev)</h3>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-1">
                                <StepCard 
                                    number="PHASE_01" 
                                    title="Onboarding & Credits" 
                                    steps={["OAuth2/JWT Secure Auth", "Credit purchase via Stripe/PayPal", "Real-time balance synchronization"]} 
                                />
                                <StepCard 
                                    number="PHASE_02" 
                                    title="Job Definition" 
                                    steps={["Container Image/Code Upload", "Resource Spec (VRAM/CPU Shape)", "I/O Reference Mapping (S3/URLs)"]} 
                                />
                                <StepCard 
                                    number="PHASE_03" 
                                    title="Submission & Monitoring" 
                                    steps={["Job Validation & Enqueuing", "Live Log Streaming via Control Plane", "Artifact Retrieval & Final Debit"]} 
                                />
                            </div>
                        </div>

                        {/* Contributor Track */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-1 bg-sky-500 w-12" />
                                <h3 className="text-lg font-black text-white uppercase italic tracking-widest">Compute_Contributor</h3>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-1">
                                <StepCard 
                                    number="PHASE_01" 
                                    title="Node Registration" 
                                    steps={["Lightweight Worker Agent Install", "Identity Verification (KYC Ready)", "Resource Discovery & Benchmarking"]} 
                                />
                                <StepCard 
                                    number="PHASE_02" 
                                    title="Orchestration" 
                                    steps={["Consul/etcd Discovery Sync", "Task Polling & State Heartbeats", "Secure Handshake with Scheduler"]} 
                                />
                                <StepCard 
                                    number="PHASE_03" 
                                    title="Execution & Payout" 
                                    steps={["Isolated Container Launch", "Usage Telemetry Reporting", "Instant Payout (Fiat or Crypto)"]} 
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* LAYER 03: THE ORCHESTRATION LAYER (TECH SPECS) */}
                <section className="mb-24 space-y-12">
                    <div className="border-l-2 border-emerald-500 pl-4">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">03. Orchestration_Engine</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Underlying system design and services.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { t: "API Gateway", d: "Node.js/TS entry point handling routing, rate limiting, and JWT validation.", i: Globe },
                            { t: "Job Service", i: Layers, d: "Metadata management using Postgres with prioritized retry policies." },
                            { t: "Scheduler", i: Zap, d: "Stateless logic engine for worker matching with Consul leader election." },
                            { t: "Worker Agent", i: Box, d: "Lightweight daemon running isolated gVisor containers on the edge." }
                        ].map((svc, i) => (
                            <div key={i} className="p-6 border border-white/5 bg-[#080808]">
                                <svc.i size={18} className="text-emerald-500 mb-4 opacity-50" />
                                <h4 className="text-[11px] font-bold text-white uppercase mb-2">{svc.t}</h4>
                                <p className="text-[10px] font-mono text-slate-600 leading-relaxed uppercase">{svc.d}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 border border-white/5 bg-[#050505] space-y-6">
                        <h4 className="text-xs font-bold text-white uppercase flex items-center gap-2">
                            <Activity size={16} className="text-emerald-500" /> System_Integrity_Checks
                        </h4>
                        <div className="grid gap-8 md:grid-cols-3 text-[10px] font-mono text-slate-500 uppercase">
                            <div className="space-y-2">
                                <span className="text-slate-300 block">Atomic Settlement</span>
                                <p>Every credit change is logged in a double-entry ledger to prevent double-spending and ensure auditability.</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-slate-300 block">Idempotent Execution</span>
                                <p>Task IDs ensure that if a worker drops, the job is re-routed without duplicating compute effort.</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-slate-300 block">Resource Capping</span>
                                <p>Cgroups and Linux namespaces strictly limit CPU, Memory, and VRAM usage per task.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA / FOOTER */}
                <footer className="text-center py-12 border-t border-white/5">
                    <p className="text-[10px] text-slate-600 uppercase tracking-[0.5em] mb-4">Ready to ship?</p>
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => navigate('/earlyAccess')}
                            className="px-8 py-3 bg-emerald-500 text-black font-black uppercase text-xs hover:bg-emerald-400 transition-all italic"
                        >
                            Request_Console_Access
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default About;