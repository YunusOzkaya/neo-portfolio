import React from 'react';

const IdentityCard: React.FC = () => {
  return (
    <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-md border-l-4 border-amber-500 rounded-r-lg p-4 shadow-2xl max-w-[90vw] md:max-w-md pointer-events-auto select-none mt-2 md:mt-0">
      
      <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border border-slate-700 group">
        <img 
          src="/images/pp.png" 
          alt="Nasuhan Yunus Özkaya" 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay"></div>
        
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500/50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500/50"></div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] md:text-[10px] text-sky-500 font-mono uppercase tracking-widest">
                Manifesto // Sys.Reflect
            </span>
        </div>
        <p className="text-slate-200 text-xs md:text-sm font-light leading-relaxed italic border-l-2 border-slate-700 pl-3">
          "A developer who builds systems, reflects on failure, and designs meaning — not just interfaces."
        </p>
      </div>

    </div>
  );
};

export default IdentityCard;