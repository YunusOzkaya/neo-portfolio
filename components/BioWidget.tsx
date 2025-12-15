import React from 'react';
import { User, GraduationCap, Briefcase, Cpu, Database, BrainCircuit, Terminal } from 'lucide-react';

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-2 mb-2 border-b border-amber-500/30 pb-1 mt-4 first:mt-0">
    <Icon size={14} className="text-amber-400" />
    <span className="text-amber-500 font-bold tracking-widest text-[10px] uppercase">{title}</span>
  </div>
);

const DataRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col mb-2">
    <span className="text-[9px] text-slate-500 uppercase tracking-wider">{label}</span>
    <span className="text-slate-300 text-[11px] leading-tight font-medium">{value}</span>
  </div>
);

const SkillTag = ({ text }: { text: string }) => (
  <span className="inline-block bg-slate-800/80 border border-slate-700 text-slate-300 px-1.5 py-0.5 rounded-[2px] text-[9px] mr-1 mb-1 font-mono hover:border-amber-500/50 transition-colors">
    {text}
  </span>
);

const BioWidget: React.FC = () => {
  return (
    <div className="flex flex-col w-full md:w-[380px] font-mono select-none pointer-events-auto mt-2 md:mt-4 max-h-[40vh] md:max-h-[60vh] transition-all">
      
      {/* Top Bar (LCARS style aesthetic) */}
      <div className="flex items-end h-6 mb-1">
        <div className="bg-sky-600/80 w-16 h-full rounded-tr-lg mr-1 flex items-center justify-center text-slate-900 font-bold text-[10px]">
          BIO-DAT
        </div>
        <div className="bg-sky-600/40 h-1.5 flex-1 mr-1"></div>
        <div className="bg-sky-600/20 h-1.5 w-8"></div>
      </div>

      {/* Main Content Container */}
      <div className="flex bg-slate-950/80 backdrop-blur-md border-l-4 border-sky-600/80 rounded-bl-xl shadow-2xl overflow-hidden flex-col h-full">
        
        {/* Static Header (Image Removed) */}
        <div className="p-3 md:p-4 bg-slate-900/50 border-b border-slate-800 flex flex-col justify-center">
             <h2 className="text-lg md:text-xl text-white font-thin uppercase tracking-[0.15em] leading-none mb-1.5">
                Nasuhan Yunus Özkaya
             </h2>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-sky-400 text-[9px] tracking-widest uppercase">Systems Engineer // Level 4</span>
             </div>
        </div>

        {/* Scrollable Data Stream */}
        <div className="overflow-y-auto p-3 md:p-4 custom-scrollbar space-y-4 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#0ea5e9 #0f172a' }}>
            
            {/* IDENTITY */}
            <div>
                <SectionHeader icon={User} title="Core Identity" />
                <div className="grid grid-cols-2 gap-2">
                     <DataRow label="Role" value="Software Engineer" />
                     <DataRow label="Focus" value="Systems Thinking" />
                </div>
            </div>

            {/* EDUCATION */}
            <div>
                <SectionHeader icon={GraduationCap} title="Education Module" />
                <div className="mb-2">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Institution</span>
                    <span className="text-white text-xs font-bold block border-l-2 border-sky-500 pl-2">Iskenderun Technical University</span>
                </div>
                <DataRow label="Degree" value="B.S. Computer Engineering" />
                <div className="flex flex-wrap mt-1">
                    {['Software Eng. Fundamentals', 'Data Structures & Algo', 'Computational Thinking'].map(s => <SkillTag key={s} text={s} />)}
                </div>
            </div>

            {/* INTERNSHIP */}
            <div>
                <SectionHeader icon={Briefcase} title="Experience Log" />
                <div className="mb-2">
                    <span className="text-white text-xs font-bold block">Ministry of Justice (Turkey)</span>
                    <span className="text-slate-500 text-[9px] uppercase">Big Data & AI Bureau // Intern</span>
                </div>
                <ul className="list-disc list-inside text-[10px] text-slate-400 marker:text-sky-500 space-y-1">
                    <li>Large-scale Excel & structured data processing</li>
                    <li>Data cleaning & normalization pipelines</li>
                    <li>Analytics reporting (Python/Streamlit)</li>
                    <li>System design under institutional constraints</li>
                </ul>
            </div>

            {/* SKILLS */}
            <div>
                <SectionHeader icon={Terminal} title="Technical Matrix" />
                
                <div className="mb-2">
                    <span className="text-[9px] text-sky-500 block mb-1">LANGUAGES</span>
                    {['JavaScript (ES6+)', 'TypeScript', 'Python', 'C#'].map(s => <SkillTag key={s} text={s} />)}
                </div>

                <div className="mb-2">
                    <span className="text-[9px] text-sky-500 block mb-1">FRONTEND & VIS</span>
                    {['React', 'Vite', 'React Three Fiber', 'D3.js', 'Tailwind'].map(s => <SkillTag key={s} text={s} />)}
                </div>

                <div className="mb-2">
                    <span className="text-[9px] text-sky-500 block mb-1">DATA & SYSTEMS</span>
                    {['Pandas', 'NumPy', 'Streamlit', 'Node.js', 'MongoDB', 'Firebase'].map(s => <SkillTag key={s} text={s} />)}
                </div>
            </div>

            {/* CONCEPTUAL */}
            <div>
                 <SectionHeader icon={BrainCircuit} title="Conceptual Drivers" />
                 <p className="text-[10px] text-slate-400 italic border-l-2 border-amber-500 pl-2 py-1">
                    "Visualization as understanding, not decoration."
                 </p>
                 <div className="grid grid-cols-2 gap-2 mt-2">
                     <DataRow label="Methodology" value="Entropy → Order Modeling" />
                     <DataRow label="Growth" value="Learning through Failure" />
                 </div>
            </div>

        </div>

        {/* Decorative Footer */}
        <div className="h-4 bg-slate-900 border-t border-sky-600/30 flex items-center px-2 justify-between shrink-0">
             <div className="flex gap-1">
                <div className="w-1 h-1 bg-sky-500/50"></div>
                <div className="w-1 h-1 bg-sky-500/30"></div>
             </div>
             <span className="text-[8px] text-sky-700 font-mono">END_OF_LOG</span>
        </div>

      </div>
    </div>
  );
};

export default BioWidget;