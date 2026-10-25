import React from 'react';
import { FROG_STAGES } from '../data/frogData';
import { FrogStage } from '../types/frog';
import { Clock, Wind, Utensils, Sparkles, ChevronRight } from 'lucide-react';
import { playWaterDrop } from '../utils/soundEffects';

interface LifecycleTimelineProps {
  onSelectStage: (stage: FrogStage) => void;
}

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({ onSelectStage }) => {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="rounded-2xl border border-emerald-900/40 bg-slate-900/80 p-6 shadow-xl">
        <h3 className="font-display text-xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-400" />
          <span>La Métamorphose Complète de la Grenouille</span>
        </h3>
        <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
          En l’espace de quelques semaines, un amphibie passe d’une vie exclusivement aquatique, nageant et respirant comme un poisson avec des branchies, à une vie d’amphibien capable de sauter sur la terre ferme et de chasser les insectes. Découvre ci-dessous les 5 étapes clefs.
        </p>
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        {FROG_STAGES.map((stage) => {
          return (
            <div
              key={stage.id}
              onClick={() => {
                playWaterDrop();
                onSelectStage(stage);
              }}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-200 cursor-pointer shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Stage Artwork Thumbnail */}
                <div className="md:col-span-3 aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={stage.image}
                    alt={stage.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Main Content */}
                <div className="md:col-span-8 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold">
                      {stage.stepNumber}
                    </span>
                    <h4 className="font-display text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {stage.name}
                    </h4>
                    <span className="text-xs font-mono text-emerald-400">
                      ({stage.scientificTerm})
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Metadata tags */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-emerald-400" />
                      {stage.duration}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1">
                      <Wind className="h-3 w-3 text-teal-400" />
                      {stage.respiration}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1">
                      <Utensils className="h-3 w-3 text-amber-400" />
                      {stage.alimentation}
                    </span>
                  </div>
                </div>

                {/* Arrow CTA */}
                <div className="hidden md:flex md:col-span-1 justify-end">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 group-hover:bg-emerald-600 group-hover:text-white text-slate-400 transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
