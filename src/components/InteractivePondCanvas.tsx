import React, { useState } from 'react';
import { POND_MAIN_IMAGE, FROG_STAGES, OBSERVATION_TARGETS } from '../data/frogData';
import { FrogStage, ObservationTarget } from '../types/frog';
import { Maximize2, Sparkles, Compass, Eye, Check } from 'lucide-react';
import { playWaterDrop, playFireflyChime } from '../utils/soundEffects';

interface InteractivePondCanvasProps {
  selectedStage: FrogStage | null;
  onSelectStage: (stage: FrogStage) => void;
  isObservationMode: boolean;
  onToggleObservationMode: () => void;
  observationTargets: ObservationTarget[];
  onTargetFound: (targetId: string) => void;
}

export const InteractivePondCanvas: React.FC<InteractivePondCanvasProps> = ({
  selectedStage,
  onSelectStage,
  isObservationMode,
  onToggleObservationMode,
  observationTargets,
  onTargetFound,
}) => {
  const [filterZone, setFilterZone] = useState<'all' | 'underwater' | 'surface'>('all');
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isObservationMode) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    let hit = false;
    for (const target of observationTargets) {
      if (
        !target.found &&
        clickX >= target.hitbox.xMin &&
        clickX <= target.hitbox.xMax &&
        clickY >= target.hitbox.yMin &&
        clickY <= target.hitbox.yMax
      ) {
        onTargetFound(target.id);
        playFireflyChime();
        setToastMessage(target.discoveredText);
        setTimeout(() => setToastMessage(null), 4000);
        hit = true;
        break;
      }
    }

    if (!hit) {
      playWaterDrop();
    }
  };

  const visibleStages = FROG_STAGES.filter((s) => {
    if (filterZone === 'all') return true;
    if (filterZone === 'underwater') return s.zone === 'underwater';
    if (filterZone === 'surface') return s.zone === 'shore' || s.zone === 'surface';
    return true;
  });

  const foundCount = observationTargets.filter((t) => t.found).length;

  return (
    <div className="relative w-full rounded-2xl border border-emerald-900/40 bg-slate-900/90 shadow-2xl overflow-hidden">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-950/60 bg-slate-950/80 px-4 py-2.5 sm:px-6">
        {/* Layer Filters as functional segmented buttons */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setFilterZone('all')}
            className={`rounded-md px-3 py-1.5 transition-colors whitespace-nowrap ${
              filterZone === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vue d'Ensemble
          </button>
          <button
            onClick={() => setFilterZone('underwater')}
            className={`rounded-md px-3 py-1.5 transition-colors whitespace-nowrap ${
              filterZone === 'underwater'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sous l'Eau (Œufs & Têtards)
          </button>
          <button
            onClick={() => setFilterZone('surface')}
            className={`rounded-md px-3 py-1.5 transition-colors whitespace-nowrap ${
              filterZone === 'surface'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Surface & Berge
          </button>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleObservationMode}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              isObservationMode
                ? 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>Mode Découverte {isObservationMode && `(${foundCount}/${observationTargets.length})`}</span>
          </button>

          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              showHotspots
                ? 'bg-slate-800 text-slate-200'
                : 'bg-slate-900 text-slate-500'
            }`}
            title="Afficher/masquer les repères interactifs"
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Repères</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors whitespace-nowrap"
            title="Plein écran / Agrandir"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Agrandir</span>
          </button>
        </div>
      </div>

      {/* Observation Mode Banner */}
      {isObservationMode && (
        <div className="bg-amber-950/40 border-b border-amber-900/40 px-4 py-2.5 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
            <span>
              <strong>Défi Observateur Nocturne :</strong> Clique sur l'illustration pour dénicher les 5 éléments secrets de l'étang !
            </span>
          </div>
          <div className="flex items-center gap-3">
            {observationTargets.map((target) => (
              <span
                key={target.id}
                className={`flex items-center gap-1 text-[11px] ${
                  target.found ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {target.found ? <Check className="h-3 w-3" /> : '○'}
                {target.title.split(' ')[1] || target.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Artwork Stage */}
      <div
        onClick={handleCanvasClick}
        className={`relative w-full aspect-16/9 overflow-hidden select-none ${
          isObservationMode ? 'cursor-crosshair' : 'cursor-default'
        } ${isFullscreen ? 'fixed inset-0 z-50 aspect-auto h-screen bg-black flex items-center justify-center' : ''}`}
      >
        {/* Background artwork with CSS fallback */}
        <img
          src={POND_MAIN_IMAGE}
          alt="Illustration nocturne magique du cycle de vie de la grenouille dans un étang"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500"
        />

        {/* Bioluminescent Waterline Split Indicator (Subtle Atmospheric Ribbon) */}
        <div
          className="absolute left-0 right-0 pointer-events-none border-b border-cyan-400/20"
          style={{ top: '48%' }}
        >
          <div className="relative w-full flex justify-between px-4 -top-3 text-[10px] tracking-wider uppercase text-cyan-300/50 font-semibold">
            <span>Surface & Ciel Nocturne ↑</span>
            <span>↓ Monde Sous-Marin</span>
          </div>
        </div>

        {/* Interactive Hotspot Pins */}
        {showHotspots &&
          visibleStages.map((stage) => {
            const isSelected = selectedStage?.id === stage.id;
            return (
              <button
                key={stage.id}
                onClick={(e) => {
                  e.stopPropagation();
                  playWaterDrop();
                  onSelectStage(stage);
                }}
                style={{ left: `${stage.pin.x}%`, top: `${stage.pin.y}%` }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 focus:outline-hidden ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                }`}
                aria-label={`Étape ${stage.stepNumber}: ${stage.name}`}
              >
                {/* Outer pulsing beacon ring */}
                <span
                  className={`absolute -inset-2 rounded-full transition-opacity ${
                    isSelected
                      ? 'bg-emerald-400/30 animate-ping'
                      : 'bg-emerald-500/20 group-hover:opacity-100 opacity-60'
                  }`}
                />

                {/* Hotspot Core Disc */}
                <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all shadow-lg ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950 ring-4 ring-emerald-300/50 shadow-emerald-400/50'
                      : 'bg-slate-900/90 text-emerald-300 border border-emerald-400/60 hover:bg-emerald-500 hover:text-slate-950 shadow-black/80'
                  }`}
                >
                  {stage.stepNumber}
                </div>

                {/* Floating tooltip label */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200 whitespace-nowrap ${
                    stage.pin.y > 70 ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
                  } ${
                    isSelected
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`}
                >
                  <div className="rounded-lg bg-slate-950/95 border border-emerald-500/40 px-2.5 py-1 text-xs text-emerald-200 shadow-xl backdrop-blur-md flex items-center gap-1.5">
                    <span className="font-semibold text-emerald-400">Étape {stage.stepNumber}:</span>
                    <span>{stage.name}</span>
                  </div>
                </div>
              </button>
            );
          })}

        {/* Close Fullscreen Button */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 z-50 rounded-xl bg-slate-900/90 border border-slate-700 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Fermer le plein écran
          </button>
        )}

        {/* Discovery Toast */}
        {toastMessage && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-[90%] rounded-xl bg-emerald-950/95 border border-emerald-500/60 p-3.5 shadow-2xl backdrop-blur-md text-center text-xs text-emerald-200 animate-in fade-in slide-in-from-bottom-2">
            <div className="font-semibold text-emerald-300 mb-0.5">Élément Découvert !</div>
            <div>{toastMessage}</div>
          </div>
        )}
      </div>

      {/* Stage Step Indicator Strip */}
      <div className="bg-slate-950 px-4 py-3 sm:px-6 border-t border-slate-900">
        <div className="grid grid-cols-5 gap-2">
          {FROG_STAGES.map((s) => {
            const isSelected = selectedStage?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  playWaterDrop();
                  onSelectStage(s);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 shadow-sm'
                    : 'bg-slate-900/50 border border-slate-800/60 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <span className="text-[10px] text-slate-500 font-medium">Étape {s.stepNumber}</span>
                <span className="text-xs font-semibold truncate max-w-full">{s.name.split(' ')[1] || s.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
