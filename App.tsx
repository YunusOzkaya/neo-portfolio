import React, { useState, useEffect } from 'react';
import SystemGraph from './components/SystemGraph';
import Overlay from './components/Overlay';
import SignalWidget from './components/SignalWidget';
import BioWidget from './components/BioWidget';
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
    <div className="w-full h-full relative overflow-hidden font-sans bg-slate-900">
      
      <div className="absolute inset-0 z-0">
        <SystemGraph data={data} onNodeSelect={handleNodeSelect} />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.25] mix-blend-screen">
          <img 
            src="Images/pp.png" 
            alt="" 
            className="w-full h-full object-cover grayscale contrast-125" 
          />
      </div>

      <div className="absolute top-2 md:top-6 left-0 right-0 z-40 flex justify-center pointer-events-none px-6">
         <p className="text-slate-200/60 text-[10px] md:text-xs font-light italic tracking-widest text-center font-serif drop-shadow-lg max-w-xl leading-relaxed">
            "A developer who builds systems, reflects on failure, and designs meaning — not just interfaces."
         </p>
      </div>

      <div 
        className={`z-50 absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 ${isIntro ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="text-4xl md:text-6xl font-thin tracking-[0.2em] text-white mb-4 uppercase text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ">
          Nasuhan Yunus Özkaya
        </h1>
        <p className="text-slate-400 font-mono text-sm tracking-widest">
          ENTROPY TO ORDER
        </p>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none p-4 md:p-0">
        
        <div className="flex flex-col gap-2 md:absolute md:top-8 md:left-8 w-full md:w-auto md:max-h-[90vh] mt-8 md:mt-0">
           <SignalWidget signal={signal} />
           <BioWidget />
        </div>

        <div className="absolute top-0 right-0 h-full">
            <Overlay selectedNode={selectedNode} onClose={handleCloseOverlay} />
        </div>
      </div>

    </div>
  );
};

export default App;
