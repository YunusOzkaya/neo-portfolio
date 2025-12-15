import React, { useState, useEffect } from 'react';
import SystemGraph from './components/SystemGraph';
import Overlay from './components/Overlay';
import SignalWidget from './components/SignalWidget';
import BioWidget from './components/BioWidget';
import ContactDock from './components/ContactDock';
import { INITIAL_NODES, INITIAL_LINKS, getTodaysSignal } from './constants';
import { GraphData, GraphNode } from './types';

const App: React.FC = () => {
  const [data] = useState<GraphData>({
    nodes: JSON.parse(JSON.stringify(INITIAL_NODES)), 
    links: JSON.parse(JSON.stringify(INITIAL_LINKS))
  });

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isIntro, setIsIntro] = useState(true);
  const signal = getTodaysSignal();

  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNodeSelect = (node: GraphNode) => {
    setSelectedNode(node);
  };

  const handleCloseOverlay = () => {
    setSelectedNode(null);
  };

  return (
    <div className="w-full h-full relative overflow-hidden font-sans bg-[#050810]">
      
      <div className="absolute inset-0 z-0">
        <SystemGraph data={data} onNodeSelect={handleNodeSelect} />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] mix-blend-screen">
          <img 
            src="/images/pp.png" 
            alt="" 
            className="w-full h-full object-cover grayscale contrast-150" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
      </div>

      <div className="absolute top-2 md:top-6 left-0 right-0 z-40 flex justify-center pointer-events-none px-6">
         <p className="text-slate-400/40 text-[10px] md:text-xs font-light italic tracking-widest text-center font-serif drop-shadow-lg max-w-xl leading-relaxed">
            "A developer who builds systems, reflects on failure, and designs meaning."
         </p>
      </div>

      <div 
        className={`z-50 absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 ${isIntro ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="text-4xl md:text-6xl font-thin tracking-[0.2em] text-white mb-4 uppercase text-center drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] ">
          Nasuhan Yunus Özkaya
        </h1>
        <p className="text-slate-500 font-mono text-sm tracking-widest border-t border-slate-800 pt-4 mt-2">
          ENTROPY TO ORDER
        </p>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none p-4 md:p-0">
        
        {/* Left Widget Stack - Added gap for spacing */}
        <div className="flex flex-col gap-6 md:absolute md:top-8 md:left-8 w-full md:w-auto md:max-h-[85vh] mt-8 md:mt-0">
           <SignalWidget signal={signal} />
           <BioWidget />
        </div>

        {/* Right Overlay Stack */}
        <div className="absolute top-0 right-0 h-full">
            <Overlay selectedNode={selectedNode} onClose={handleCloseOverlay} />
        </div>
        
        {/* Bottom Contact Dock */}
        <ContactDock />
      </div>

    </div>
  );
};

export default App;
