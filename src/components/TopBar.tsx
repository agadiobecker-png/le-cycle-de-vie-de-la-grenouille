import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface TopBarProps {
  activeTab: 'pond' | 'lifecycle' | 'puzzle' | 'quiz';
  onSelectTab: (tab: 'pond' | 'lifecycle' | 'puzzle' | 'quiz') => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  isAudioActive,
  onToggleAudio,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/40 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('pond')}
          className="text-left font-display text-xl font-bold tracking-tight text-emerald-300 hover:text-emerald-200 transition-colors whitespace-nowrap shrink-0"
        >
          L’Étang Magique
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('pond')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'pond'
                ? 'text-emerald-400 border-b-2 border-emerald-400 pb-0.5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Étang Interactif
          </button>
          <button
            onClick={() => onSelectTab('lifecycle')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'lifecycle'
                ? 'text-emerald-400 border-b-2 border-emerald-400 pb-0.5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cycle de Vie
          </button>
          <button
            onClick={() => onSelectTab('puzzle')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'puzzle'
                ? 'text-emerald-400 border-b-2 border-emerald-400 pb-0.5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Puzzle Métamorphose
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'quiz'
                ? 'text-emerald-400 border-b-2 border-emerald-400 pb-0.5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Quiz Naturaliste
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
              isAudioActive
                ? 'bg-emerald-900/60 text-emerald-200 ring-1 ring-emerald-500/50 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 ring-1 ring-slate-800'
            }`}
            title="Activer ou couper l'ambiance sonore nocturne"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span>Ambiance Active</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4 text-slate-400" />
                <span>Ambiance Silencieuse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
