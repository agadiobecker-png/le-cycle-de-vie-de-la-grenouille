import React, { useState } from 'react';
import { FrogStage } from '../types/frog';
import { X, ChevronLeft, ChevronRight, Volume2, Sparkles, Clock, MapPin, Wind, Utensils } from 'lucide-react';
import { FROG_STAGES } from '../data/frogData';
import { playWaterDrop, playFrogCroak, playFireflyChime } from '../utils/soundEffects';

interface StageModalOrDrawerProps {
  stage: FrogStage | null;
  onClose: () => void;
  onSelectStage: (stage: FrogStage) => void;
}

export const StageModalOrDrawer: React.FC<StageModalOrDrawerProps> = ({
  stage,
  onClose,
  onSelectStage,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'anatomy' | 'secret'>('info');

  if (!stage) return null;

  const currentIndex = FROG_STAGES.findIndex((s) => s.id === stage.id);
  const prevStage = currentIndex > 0 ? FROG_STAGES[currentIndex - 1] : null;
  const nextStage = currentIndex < FROG_STAGES.length - 1 ? FROG_STAGES[currentIndex + 1] : null;

  const handlePlaySound = () => {
    if (stage.id === 'grenouille_adulte') {
      playFrogCroak();
    } else if (stage.id === 'oeufs') {
      playFireflyChime();
    } else {
      playWaterDrop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-emerald-950/60 bg-slate-950/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950 text-xs font-bold">
              {stage.stepNumber}
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>{stage.name}</span>
                <span className="text-xs font-mono font-normal text-emerald-400">
                  ({stage.scientificTerm})
                </span>
              </h2>
              <p className="text-xs text-slate-400">{stage.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlaySound}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-900/60 transition-colors"
              title="Écouter l'effet sonore de ce stade"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>Son</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Grid: Artwork Card & Core Bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Close-up Illustration Card */}
            <div className="relative rounded-xl overflow-hidden border border-emerald-900/60 bg-slate-950 aspect-4/3 flex items-center justify-center">
              <img
                src={stage.image}
                alt={stage.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-3 text-xs text-emerald-200">
                <span className="font-semibold text-emerald-300">Stade {stage.stepNumber} sur 5</span> · {stage.duration}
              </div>
            </div>

            {/* Core Info & Biological Metrics */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <p className="text-sm leading-relaxed text-slate-300">
                  {stage.description}
                </p>
              </div>

              {/* Biological Specs Grid */}
              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <div className="flex items-start gap-2.5 rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <Clock className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-medium">Durée du stade : </span>
                    <span className="text-slate-200 font-semibold">{stage.duration}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-medium">Habitat naturel : </span>
                    <span className="text-slate-200">{stage.habitat}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <Wind className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-medium">Mode respiratoire : </span>
                    <span className="text-slate-200">{stage.respiration}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <Utensils className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-medium">Alimentation : </span>
                    <span className="text-slate-200">{stage.alimentation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Fun Fact / Did you know? */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                Le Secret de l’Étang (Le Savais-tu ?)
              </h4>
              <p className="text-xs leading-relaxed text-emerald-100/90">
                {stage.didYouKnow}
              </p>
            </div>
          </div>

          {/* Section: Anatomical Marvel */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Adaptation Anatomique Majeure
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {stage.keyFeature}
            </p>
          </div>
        </div>

        {/* Modal Footer with Previous / Next navigation */}
        <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950 px-6 py-3.5">
          {prevStage ? (
            <button
              onClick={() => {
                playWaterDrop();
                onSelectStage(prevStage);
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Étape précédente ({prevStage.name.split(' ')[1] || prevStage.name})</span>
            </button>
          ) : (
            <div />
          )}

          {nextStage ? (
            <button
              onClick={() => {
                playWaterDrop();
                onSelectStage(nextStage);
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Étape suivante ({nextStage.name.split(' ')[1] || nextStage.name})</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
