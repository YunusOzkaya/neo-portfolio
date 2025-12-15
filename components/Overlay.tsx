import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, BookOpen, AlertTriangle, Activity, Brain, Star, GitFork, Clock, Code2, Globe } from 'lucide-react';
import { GraphNode, NodeType } from '../types';
import { COLORS } from '../constants';

interface OverlayProps {
  selectedNode: GraphNode | null;
  onClose: () => void;
}

const IconMap = {
  [NodeType.SYSTEM]: Activity,
  [NodeType.DATA]: Brain,
  [NodeType.THOUGHT]: BookOpen,
  [NodeType.FAILURE]: AlertTriangle,
  [NodeType.SIGNAL]: Activity,
};

// Sub-component for GitHub Project Card
const ProjectCard = ({ node }: { node: GraphNode }) => (
  <div className="mt-6 mb-8 bg-slate-950 border border-slate-800 rounded-lg p-5 relative overflow-hidden group shadow-lg">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-blue-600"></div>
    
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2 text-sky-400">
        <Github size={20} />
        <span className="font-mono text-xs uppercase tracking-wider">Repository</span>
      </div>
      {node.stars !== undefined && (
        <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-500" />
            <span>{node.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={12} />
            <span>{Math.floor(node.stars * 0.3)}</span>
          </div>
        </div>
      )}
    </div>

    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
      {node.label}
    </h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-4">
      {node.description}
    </p>

    <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-4">
      <div className="flex items-center gap-2">
         {node.language && (
            <>
                <Code2 size={14} className="text-slate-500" />
                <span className="text-xs font-mono text-slate-300">{node.language}</span>
            </>
         )}
      </div>
      <div className="flex items-center gap-2">
        <Globe size={12} className="text-slate-600" />
        <span className="text-[10px] font-mono text-slate-600 uppercase">Public Access</span>
      </div>
    </div>
  </div>
);

// Sub-component for Medium Article Card
const ArticleCard = ({ node }: { node: GraphNode }) => (
  <div className="mt-6 mb-8 bg-slate-100/5 border border-slate-700 rounded-lg p-5 relative shadow-lg">
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-slate-700/20 to-transparent rounded-tr-lg"></div>
    
    <div className="flex items-center gap-2 text-slate-400 mb-3">
      <BookOpen size={16} />
      <span className="font-mono text-xs uppercase tracking-wider">Thought Stream</span>
    </div>

    <h3 className="text-xl font-serif text-white mb-3 leading-snug">
      {node.label}
    </h3>

    <div className="flex items-center gap-4 text-xs text-slate-500 font-mono mb-4">
       {node.readTime && (
           <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{node.readTime}</span>
           </div>
       )}
       <span className="w-1 h-1 rounded-full bg-slate-600"></span>
       <span>{new Date().getFullYear()}</span>
    </div>

    <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-slate-600 pl-3">
      {node.description}
    </p>
  </div>
);

const Overlay: React.FC<OverlayProps> = ({ selectedNode, onClose }) => {
  if (!selectedNode) return null;

  const Icon = IconMap[selectedNode.type];
  const color = COLORS[selectedNode.type];

  const isProject = selectedNode.type === NodeType.SYSTEM || selectedNode.type === NodeType.DATA;
  const isThought = selectedNode.type === NodeType.THOUGHT;

  return (
    <AnimatePresence>
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom easing
          className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-slate-950/90 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-50 flex flex-col pointer-events-auto"
        >
          {/* Technical Header Line */}
          <div className="h-1 w-full bg-slate-800">
             <div className="h-full bg-slate-600" style={{ width: '40%', backgroundColor: color }}></div>
          </div>

          <div className="p-8 flex flex-col h-full overflow-hidden">
            {/* Nav Header */}
            <div className="flex justify-between items-start mb-6 shrink-0">
               <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-1">
                    SYS.ID: {selectedNode.id.split('-')[1]?.toUpperCase() || 'UNKNOWN'}
                  </span>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }}></span>
                     <span className="font-mono text-xs text-slate-300 uppercase">{selectedNode.type}</span>
                  </div>
               </div>
               <button 
                onClick={onClose}
                className="group p-2 rounded-full border border-slate-800 hover:bg-slate-800 transition-colors"
               >
                <X size={20} className="text-slate-400 group-hover:text-white" />
               </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              
              {/* Specialized Cards or Default Header */}
              {isProject ? (
                <ProjectCard node={selectedNode} />
              ) : isThought ? (
                <ArticleCard node={selectedNode} />
              ) : (
                 <div className="mb-8">
                    <div 
                      className="inline-flex p-3 rounded-xl mb-4"
                      style={{ backgroundColor: `${color}15`, color: color }}
                    >
                      <Icon size={32} />
                    </div>
                    <h2 className="text-3xl font-light text-white leading-tight">
                      {selectedNode.label}
                    </h2>
                 </div>
              )}

              {/* General Description for Non-Specialized Nodes */}
              {!isProject && !isThought && (
                 <div className="prose prose-invert prose-sm mb-8">
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {selectedNode.description}
                    </p>
                 </div>
              )}

              {/* Detailed Content / Metadata */}
              {selectedNode.content && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50 mb-8">
                  <h4 className="text-[10px] font-mono uppercase text-slate-500 mb-3 tracking-wider">
                     Extended Data
                  </h4>
                  <div className="whitespace-pre-wrap font-sans text-slate-300 text-sm leading-6">
                    {selectedNode.content}
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedNode.tags && (
                <div className="mb-8">
                   <h4 className="text-[10px] font-mono uppercase text-slate-500 mb-3 tracking-wider">
                     Semantic Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-[10px] uppercase tracking-wider rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action */}
            {selectedNode.url && (
              <div className="mt-6 pt-6 border-t border-slate-800 shrink-0">
                <a 
                  href={selectedNode.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between w-full py-4 px-6 bg-white hover:bg-slate-200 text-slate-950 rounded-lg transition-all"
                >
                  <div className="flex flex-col items-start">
                     <span className="text-xs font-mono uppercase tracking-wider text-slate-500 group-hover:text-slate-600">Access Link</span>
                     <span className="font-bold text-sm">Open External Resource</span>
                  </div>
                  <ExternalLink size={20} />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;