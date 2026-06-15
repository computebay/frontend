"use client";
import React from 'react';
import { 
    Shield, Zap, Layers, Lock, Box, Activity,
    ArrowLeft, Globe, ArrowRightLeft, Gauge
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SparklesCore } from '../components/SparklesCore';
import { WaitlistForm } from '../components/WaitlistForm';

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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                <button 
                    onClick={() => navigate('/')}
                    className="mb-10 sm:mb-12 flex items-center gap-2 text-[9px] sm:text-[10px] uppercase text-slate-500 hover:text-emerald-400 transition-colors"
                >
                    <ArrowLeft size={12} className="sm:w-4 sm:h-4" /> System_Root
                </button>

                {/* LAYER 01: THE MANIFESTO (HOW IT HELPS) */}
                <section className="mb-20 sm:mb-24 space-y-8 sm:space-y-12">
                    <div className="max-w-3xl space-y-4 sm:space-y-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
                            System <br /> <span className="text-emerald-500">Overview</span>.
                        </h1>
                        <div className="text-sm leading-relaxed text-slate-400 uppercase tracking-tight space-y-4">
                            <p>ComputeBay connects developers with a global network of idle consumer hardware.</p>
                            <p>
                                Running small services and parallel tasks shouldn't require navigating the complexity and high margins of hyperscale providers. We manage a fleet of idle consumer electronics worldwide, securely orchestrating workloads across them.
                            </p>
                            <p className="text-emerald-400 font-bold">
                                You get the simplicity of a PaaS with the cost-efficiency of bare metal. We handle the distributed execution, security, and hardware matching.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { t: "Global Idle Compute", d: "Tap into a worldwide fleet of consumer hardware, vastly cheaper than hyperscaler VMs.", i: Gauge },
                            { t: "Secure Sandboxing", d: "Zero-trust execution environment utilizing gVisor to isolate every workload.", i: Shield },
                            { t: "Fault Tolerance", d: "Automated job resumption and stateless worker matching via Consul-backed discovery.", i: Lock }
                        ].map((feat, i) => (
                            <div key={i} className="p-4 sm:p-6 border border-white/5 bg-[#050505]/50 backdrop-blur-sm">
                                {React.createElement(feat.i, { size: 16, className: "text-emerald-500 mb-3 sm:mb-4" })}
                                <h3 className="text-xs font-bold text-white uppercase mb-1 sm:mb-2">{feat.t}</h3>
                                <p className="text-[9px] sm:text-[10px] text-slate-500 leading-relaxed uppercase">{feat.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* LAYER 02: THE USER FLOW (DETAILED JOURNEYS) */}
                <section className="mb-20 sm:mb-24 py-12 sm:py-16 border-y border-white/5 bg-[#030303]/50">
                    <div className="mb-10 sm:mb-12 text-center">
                        <h2 className="text-[9px] sm:text-[10px] text-emerald-500 tracking-[0.5em] uppercase font-bold mb-1 sm:mb-2">Protocol_Journeys</h2>
                        <p className="text-lg sm:text-xl font-black text-white uppercase italic">Two roles. One unified ledger.</p>
                    </div>

                    <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
                        {/* Submitter Track */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="h-1 bg-emerald-500 w-8 sm:w-12" />
                                <h3 className="text-base sm:text-lg font-black text-white uppercase italic tracking-widest">Job_Submitter (Dev)</h3>
                            </div>
                            <div className="grid gap-3 sm:gap-4 grid-cols-1">
                                <StepCard 
                                    number="PHASE_01" 
                                    title="Account & Credits" 
                                    steps={["Secure OAuth2 Registration", "Deposit Credits via Stripe", "Real-time Ledger Sync"]} 
                                />
                                <StepCard 
                                    number="PHASE_02" 
                                    title="Job Definition" 
                                    steps={["Upload Container/Code", "Define CPU/GPU Requirements", "Map S3/URL Dependencies"]} 
                                />
                                <StepCard 
                                    number="PHASE_03" 
                                    title="Submission & Results" 
                                    steps={["Automatic Node Scheduling", "Live Log Streaming", "Output Retrieval & Atomic Debit"]} 
                                />
                            </div>
                        </div>

                        {/* Contributor Track */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="h-1 bg-sky-500 w-8 sm:w-12" />
                                <h3 className="text-base sm:text-lg font-black text-white uppercase italic tracking-widest">Compute_Contributor</h3>
                            </div>
                            <div className="grid gap-3 sm:gap-4 grid-cols-1">
                                <StepCard 
                                    number="PHASE_01" 
                                    title="Node Registration" 
                                    steps={["Install lightweight Worker Agent", "Automatic Resource Benchmarking", "Identity Verification"]} 
                                />
                                <StepCard 
                                    number="PHASE_02" 
                                    title="Orchestration" 
                                    steps={["Maintain Heartbeat via Consul", "Poll Job Queue for Tasks", "Secure Handshake with Scheduler"]} 
                                />
                                <StepCard 
                                    number="PHASE_03" 
                                    title="Execution & Payout" 
                                    steps={["Launch Isolated Docker Container", "Stream Logs & Metrics", "Earn Credits for Compute Used"]} 
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* LAYER 03: THE ORCHESTRATION LAYER (TECH SPECS) */}
                <section className="mb-20 sm:mb-24 space-y-8 sm:space-y-12">
                    <div className="border-l-2 border-emerald-500 pl-3 sm:pl-4">
                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tighter">03. Orchestration_Engine</h2>
                        <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest mt-1">Underlying system design and services.</p>
                    </div>

                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { t: "API Gateway", d: "Single entry point handling routing, auth, and load balancing.", i: Globe },
                            { t: "Job & Scheduler Services", i: Layers, d: "Manages metadata in Postgres and assigns jobs to nodes via RabbitMQ/Kafka." },
                            { t: "Credit Ledger", i: Zap, d: "Transactional database ensuring atomic credit debits and payouts." },
                            { t: "Worker Agents", i: Box, d: "Daemon running isolated Docker containers on contributor hardware." }
                        ].map((svc, i) => (
                            <div key={i} className="p-4 sm:p-6 border border-white/5 bg-[#080808]">
                                <svc.i size={16} className="text-emerald-500 mb-3 sm:mb-4 opacity-50" />
                                <h4 className="text-[10px] sm:text-[11px] font-bold text-white uppercase mb-1 sm:mb-2">{svc.t}</h4>
                                <p className="text-[9px] sm:text-[10px] font-mono text-slate-600 leading-relaxed uppercase">{svc.d}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 sm:p-8 border border-white/5 bg-[#050505] space-y-4 sm:space-y-6">
                        <h4 className="text-xs font-bold text-white uppercase flex items-center gap-2">
                            <Activity size={14} className="sm:w-4 sm:h-4 text-emerald-500" /> System_Integrity_Checks
                        </h4>
                        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase">
                            <div className="space-y-1 sm:space-y-2">
                                <span className="text-slate-300 block">Atomic Settlement</span>
                                <p>Double-entry ledger prevents double-spending and ensures auditability.</p>
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <span className="text-slate-300 block">Idempotent Execution</span>
                                <p>If a worker drops, unique Task IDs ensure jobs are re-routed without duplication.</p>
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <span className="text-slate-300 block">Strict Isolation</span>
                                <p>gVisor, Linux namespaces, and cgroups strictly limit CPU, memory, and network access.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA / FOOTER */}
                <footer className="text-center py-10 sm:py-12 border-t border-white/5">
                    <p className="text-[9px] sm:text-[10px] text-slate-600 uppercase tracking-[0.5em] mb-4 sm:mb-6">Join Early Access</p>
                    <div className="flex justify-center max-w-md mx-auto">
                        <WaitlistForm />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default About;