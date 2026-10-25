import React, { useState, useEffect } from 'react';
import { FROG_STAGES } from '../data/frogData';
import { FrogStage } from '../types/frog';
import { CheckCircle2, RotateCcw, ArrowRight, Sparkles, Award } from 'lucide-react';
import { playWaterDrop, playSuccessChime } from '../utils/soundEffects';

export const MiniGameChronology: React.FC = () => {
  const [items, setItems] = useState<FrogStage[]>([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [showError, setShowError] = useState<boolean>(false);

  // Initialize with shuffled stages
  const shuffleStages = () => {
    const shuffled = [...FROG_STAGES].sort(() => Math.random() - 0.5);
    // Ensure it's not accidentally already solved
    if (shuffled.every((stage, idx) => stage.stepNumber === idx + 1)) {
      const temp = shuffled[0];
      shuffled[0] = shuffled[1];
      shuffled[1] = temp;
    }
    setItems(shuffled);
    setSelectedSlotIndex(null);
    setIsCompleted(false);
    setShowError(false);
  };

  useEffect(() => {
    shuffleStages();
  }, []);

  const handleCardClick = (index: number) => {
    playWaterDrop();
    if (selectedSlotIndex === null) {
      setSelectedSlotIndex(index);
    } else {
      if (selectedSlotIndex !== index) {
        // Swap items
        const newItems = [...items];
        const temp = newItems[selectedSlotIndex];
        newItems[selectedSlotIndex] = newItems[index];
        newItems[index] = temp;
        setItems(newItems);
      }
      setSelectedSlotIndex(null);
      setShowError(false);
    }
  };

  const handleVerify = () => {
    setAttempts((prev) => prev + 1);
    const correct = items.every((stage, idx) => stage.stepNumber === idx + 1);
    if (correct) {
      setIsCompleted(true);
      setShowError(false);
      playSuccessChime();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-slate-900/80 p-6 shadow-xl space-y-6">
      {/* Title & Instructions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <span>Le Puzzle de la Métamorphose</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Clique sur deux cartes pour échanger leur place et reconstituer le cycle biologique dans le bon ordre chronologique.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playWaterDrop();
              shuffleStages();
            }}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Mélanger</span>
          </button>

          {!isCompleted && (
            <button
              onClick={handleVerify}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 shadow-md transition-colors"
            >
              <span>Vérifier l’Ordre</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/40 p-4 text-emerald-200 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <Award className="h-7 w-7 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-semibold text-sm text-emerald-300">
                Félicitations, jeune naturaliste !
              </h4>
              <p className="text-xs text-emerald-200/90">
                Tu as parfaitement reconstitué les 5 étapes de la métamorphose de la grenouille. L’écosystème de l’étang prospère grâce à toi !
              </p>
            </div>
          </div>
          <button
            onClick={shuffleStages}
            className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 transition-colors shrink-0"
          >
            Rejouer
          </button>
        </div>
      )}

      {/* Error notification */}
      {showError && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-3 text-xs text-amber-200 text-center animate-shake">
          Certaines étapes ne sont pas encore au bon endroit. Regarde bien les indices anatomiques (queue, branchies, pattes) !
        </div>
      )}

      {/* Slots & Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {items.map((stage, index) => {
          const isSelected = selectedSlotIndex === index;
          const isCorrectPosition = isCompleted || (stage.stepNumber === index + 1 && isCompleted);

          return (
            <div
              key={stage.id}
              onClick={() => handleCardClick(index)}
              className={`group relative flex flex-col rounded-xl overflow-hidden border p-3 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-950/50 ring-2 ring-emerald-400/50 scale-102 shadow-lg'
                  : isCompleted
                  ? 'border-emerald-600/60 bg-emerald-950/20'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {/* Slot Number Tag */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-medium text-slate-500">
                  Emplacement {index + 1}
                </span>
                {isCompleted && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                )}
                {isSelected && (
                  <span className="text-[10px] uppercase font-semibold text-emerald-400">
                    Sélectionné
                  </span>
                )}
              </div>

              {/* Card Image */}
              <div className="relative rounded-lg overflow-hidden aspect-4/3 mb-2 bg-slate-900">
                <img
                  src={stage.image}
                  alt={stage.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Key trait */}
              <div className="mt-auto">
                <h4 className="font-semibold text-xs text-slate-200 leading-snug">
                  {stage.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {stage.keyFeature}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
