import React from 'react';
import { SignalQuote, NodeType } from '../types';
import { COLORS } from '../constants';
import { Radio } from 'lucide-react';

interface SignalWidgetProps {
  signal: SignalQuote;
}

const SignalWidget: React.FC<SignalWidgetProps> = ({ signal }) => {
  const color = COLORS[NodeType.SIGNAL];
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col w-[300px] md:w-[380px] font-mono text-xs select-none pointer-events-auto">
      
      {/* Top Bar (LCARS style) */}
      <div className="flex items-end h-8 mb-1">
        <div className="bg-amber-500/80 w-24 h-full rounded-tr-xl mr-1 flex items-center justify-center text-slate-900 font-bold tracking-tighter">
          SIG-01
        </div>
        <div className="bg-amber-500/40 h-2 flex-1 mr-1"></div>
        <div className="bg-amber-500/20 h-2 w-12"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex bg-slate-900/50 backdrop-blur-sm border-l-8 border-amber-500/80 rounded-bl-xl pl-4 py-4 pr-4 shadow-lg">
        <div className="flex flex-col gap-2 w-full">
          
          {/* Header Row */}
          <div className="flex justify-between items-center border-b border-amber-500/30 pb-2 mb-2">
            <div className="flex items-center gap-2 text-amber-400">
              <Radio size={14} className="animate-pulse" />
              <span className="tracking-widest uppercase">Daily Signal</span>
            </div>
            <span className="text-amber-500/50">{today.toUpperCase()}</span>
          </div>

          {/* Quote */}
          <div className="relative">
             <p className="text-amber-100 text-sm md:text-base leading-relaxed italic">
               "{signal.text}"
             </p>
             <div className="mt-3 flex justify-end">
                <span className="bg-amber-500/10 text-amber-300 px-2 py-1 rounded text-[10px] uppercase tracking-wider border border-amber-500/20">
                  Ref: {signal.author}
                </span>
             </div>
          </div>

          {/* Technical Footer */}
          <div className="flex gap-1 mt-2 pt-2 border-t border-dashed border-amber-500/20 opacity-50">
             <div className="h-1 w-4 bg-amber-500"></div>
             <div className="h-1 w-2 bg-amber-500"></div>
             <div className="h-1 w-1 bg-amber-500"></div>
             <div className="flex-1"></div>
             <div className="text-[9px] text-amber-500">TRANSMISSION_RECEIVED</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalWidget;