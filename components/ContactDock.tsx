import React from 'react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

const ContactDock: React.FC = () => {
  const links = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'nasuhan.yunus.ozkaya@gmail.com',
      href: 'mailto:nasuhan.yunus.ozkaya@gmail.com',
      isCopy: false
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      value: 'nyunus-ozkaya',
      href: 'https://www.linkedin.com/in/nyunus-ozkaya/',
      isCopy: false
    },
    { 
      icon: Github, 
      label: 'GitHub', 
      value: 'YunusOzkaya',
      href: 'https://github.com/YunusOzkaya',
      isCopy: false
    }
  ];

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div className="flex items-center gap-4 px-6 py-3 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl pointer-events-auto transform transition-transform hover:scale-105 duration-300">
        
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1 relative p-2 rounded-lg hover:bg-slate-800 transition-all"
            title={link.value}
          >
            <div className="relative">
                <link.icon 
                    size={24} 
                    className="text-slate-400 group-hover:text-amber-400 transition-colors duration-300" 
                />
                <ExternalLink size={10} className="absolute -top-1 -right-2 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 px-2 py-1 rounded border border-slate-700 whitespace-nowrap">
                {link.label}
            </span>
          </a>
        ))}

        <div className="w-px h-8 bg-slate-700 mx-2"></div>

        <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest">Status</span>
            <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] text-emerald-500 font-bold tracking-wider">OPEN TO WORK</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactDock;
