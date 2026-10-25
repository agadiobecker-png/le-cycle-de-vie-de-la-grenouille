import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { InteractivePondCanvas } from './components/InteractivePondCanvas';
import { StageModalOrDrawer } from './components/StageModalOrDrawer';
import { LifecycleTimeline } from './components/LifecycleTimeline';
import { MiniGameChronology } from './components/MiniGameChronology';
import { QuizPond } from './components/QuizPond';
import { FROG_STAGES, OBSERVATION_TARGETS } from './data/frogData';
import { FrogStage, ObservationTarget } from './types/frog';
import { toggleNightAmbience, playWaterDrop } from './utils/soundEffects';
import { Moon, Sparkles, BookOpen, Compass, Award, Download, FileCode, X, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'pond' | 'lifecycle' | 'puzzle' | 'quiz'>('pond');
  const [selectedStage, setSelectedStage] = useState<FrogStage | null>(null);
  const [isObservationMode, setIsObservationMode] = useState<boolean>(false);
  const [observationTargets, setObservationTargets] = useState<ObservationTarget[]>(OBSERVATION_TARGETS);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  const handleToggleAudio = () => {
    toggleNightAmbience((state) => setIsAudioActive(state));
  };

  const handleTargetFound = (targetId: string) => {
    setObservationTargets((prev) =>
      prev.map((t) => (t.id === targetId ? { ...t, found: true } : t))
    );
  };

  const handleTabChange = (tab: 'pond' | 'lifecycle' | 'puzzle' | 'quiz') => {
    playWaterDrop();
    setActiveTab(tab);
  };

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showStandaloneModal, setShowStandaloneModal] = useState<boolean>(false);

  const handleDownloadStandalone = async () => {
    try {
      setIsDownloading(true);
      playWaterDrop();
      const res = await fetch('/standalone.html');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'etang-magique-cycle-grenouille.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/standalone.html', '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Subtle magical ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-900/15 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-cyan-900/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-teal-900/15 blur-3xl" />
      </div>

      {/* Top Bar following Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-8">
        {/* Hero Title Section */}
        <section className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
            <Moon className="h-3.5 w-3.5 text-cyan-300" />
            <span>Illustration 2D Nocturne & Jeu Ludo-Éducatif</span>
            <span aria-hidden="true">·</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Le Monde des Amphibiens</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100 text-balance">
            Le Mystérieux Voyage de la Grenouille
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Sous une lune argentée et la danse des lucioles dorées, plonge dans la coupe transversale d'un étang féerique pour découvrir chaque étape de la métamorphose.
          </p>

          {/* Standalone Single-File Export Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownloadStandalone}
              disabled={isDownloading}
              className="flex items-center gap-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-semibold shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
              title="Télécharger le jeu en un fichier HTML 100% autonome"
            >
              <Download className="h-3.5 w-3.5" />
              <span>
                {isDownloading ? 'Téléchargement...' : 'Télécharger le Fichier HTML Autonome (.html)'}
              </span>
            </button>

            <button
              onClick={() => {
                playWaterDrop();
                setShowStandaloneModal(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer"
            >
              <FileCode className="h-3.5 w-3.5 text-emerald-400" />
              <span>Détails & Hébergement Facile</span>
            </button>
          </div>
        </section>

        {/* Tab 1: Pond Exploration */}
        {activeTab === 'pond' && (
          <section className="space-y-6">
            <InteractivePondCanvas
              selectedStage={selectedStage}
              onSelectStage={(stage) => setSelectedStage(stage)}
              isObservationMode={isObservationMode}
              onToggleObservationMode={() => {
                playWaterDrop();
                setIsObservationMode(!isObservationMode);
              }}
              observationTargets={observationTargets}
              onTargetFound={handleTargetFound}
            />

            {/* Educational Cross-Section Guide Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <Compass className="h-4 w-4" />
                  <span>1. Monde Sous-Marin (Gauche)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dans les profondeurs turquoise, les œufs translucides flottent attachés aux plantes. Plus au centre, les têtards nagent près des algues bioluminescentes et développent leurs branchies.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <BookOpen className="h-4 w-4" />
                  <span>2. Rive & Berge Moussue (Droite)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sur les rochers couverts de mousse, la jeune grenouillette grimpe hors de l’eau. Sa queue est progressivement résorbée pour lui fournir l'énergie nécessaire à ses premiers sauts.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Award className="h-4 w-4" />
                  <span>3. Surface & Nénuphar (Haut)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sur un grand nénuphar éclairé par le croissant de lune, la grenouille adulte trône en maîtresse des lieux. Les lucioles illuminent la scène d’une lueur féerique dorée.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Lifecycle step-by-step breakdown */}
        {activeTab === 'lifecycle' && (
          <section>
            <LifecycleTimeline onSelectStage={(stage) => setSelectedStage(stage)} />
          </section>
        )}

        {/* Tab 3: Chronology Puzzle */}
        {activeTab === 'puzzle' && (
          <section>
            <MiniGameChronology />
          </section>
        )}

        {/* Tab 4: Naturalist Quiz */}
        {activeTab === 'quiz' && (
          <section>
            <QuizPond />
          </section>
        )}
      </main>

      {/* Stage Detail Modal */}
      <StageModalOrDrawer
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
        onSelectStage={(stage) => setSelectedStage(stage)}
      />

      {/* Standalone HTML Info Modal */}
      {showStandaloneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-emerald-500/40 bg-slate-900 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <FileCode className="h-5 w-5 text-emerald-400" />
                <h3 className="font-display text-lg font-bold text-slate-100">
                  Version Fichier Unique (Single-File HTML)
                </h3>
              </div>
              <button
                onClick={() => setShowStandaloneModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Le fichier <strong>standalone.html</strong> regroupe l'intégralité du code en un seul fichier HTML autonome :
              styles CSS, graphismes vectoriels SVG haute fidélité, synthétiseur audio Web Audio API, jeu d'exploration, puzzle de métamorphose et quiz.
            </p>

            <div className="space-y-3 rounded-xl bg-slate-950/70 p-4 border border-slate-800 text-xs">
              <h4 className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Comment l'héberger ou l'utiliser facilement ?</span>
              </h4>
              <ul className="space-y-2 text-slate-400 list-disc list-inside">
                <li>
                  <strong className="text-slate-200">En local sans serveur :</strong> Télécharge le fichier et double-clique dessus ; il s'ouvre instantanément dans n'importe quel navigateur web (Chrome, Safari, Firefox, Edge).
                </li>
                <li>
                  <strong className="text-slate-200">Hébergement gratuit en 1 clic :</strong> Glisse-dépose le fichier sur <em>Netlify Drop</em>, <em>Vercel</em>, ou <em>GitHub Pages</em> (en renommant le fichier en <code>index.html</code>).
                </li>
                <li>
                  <strong className="text-slate-200">Intégration iFrame / CMS :</strong> Compatible avec WordPress, Moodle, sites scolaires ou intranets sans aucune dépendance npm ni serveur Node.js.
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href="/standalone.html"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 text-xs font-medium transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Tester la version autonome</span>
              </a>

              <button
                onClick={handleDownloadStandalone}
                disabled={isDownloading}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Télécharger (.html)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clean quiet footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 mt-12 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>L’Étang Magique</span>
            <span aria-hidden="true">·</span>
            <span>Jeu ludo-éducatif 2D</span>
            <span aria-hidden="true">·</span>
            <span>Métamorphose de la Grenouille</span>
          </div>
          <div>
            Palette féerique : Bleu nuit, turquoise & vert émeraude
          </div>
        </div>
      </footer>
    </div>
  );
}
