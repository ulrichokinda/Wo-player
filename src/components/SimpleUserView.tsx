import React from 'react';
import { Tv, Copy, ArrowRight } from 'lucide-react';
import { Card } from './ui';
import { Logo } from './Logo';

interface SimpleUserViewProps {
  macAddress: string;
  channels: any[];
  onNotify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const SimpleUserView: React.FC<SimpleUserViewProps> = ({ macAddress, onNotify }) => {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8 flex-1">
        
        {/* Header/Logo Section */}
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 py-4">
          <Logo size={80} />
          
          <div className="flex flex-col items-center gap-2 bg-zinc-900/50 px-6 py-4 rounded-2xl border border-zinc-800 w-full max-w-sm">
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Adresse MAC</span>
            <div className="flex items-center gap-3">
              <span className="text-lg md:text-xl font-mono font-bold text-white tracking-wider">{macAddress}</span>
              <button 
                onClick={() => { navigator.clipboard.writeText(macAddress); onNotify('MAC copiée !', 'success'); }} 
                className="text-primary hover:text-white p-1.5 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-4 border-t border-zinc-900 flex justify-center">
          <a 
            href="/dashboard"
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark px-8 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all tv-focus"
          >
            Devenir Revendeur <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
