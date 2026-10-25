import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/frogData';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, HelpCircle } from 'lucide-react';
import { playWaterDrop, playSuccessChime, playFireflyChime } from '../utils/soundEffects';

export const QuizPond: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    playWaterDrop();
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
      playSuccessChime();
    } else {
      playWaterDrop();
    }
  };

  const handleNextQuestion = () => {
    playWaterDrop();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      playFireflyChime();
    }
  };

  const handleRestartQuiz = () => {
    playWaterDrop();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-slate-900/80 p-6 shadow-xl space-y-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-100 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-emerald-400" />
            <span>Quiz du Naturaliste de l'Étang</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Teste tes connaissances sur la métamorphose et les secrets des amphibiens.
          </p>
        </div>

        {!quizFinished && (
          <div className="text-right">
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              Question {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <div className="text-[11px] text-slate-500">
              Score : {score} point{score > 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      {quizFinished ? (
        /* Quiz Results Card */
        <div className="py-8 text-center space-y-4 max-w-md mx-auto animate-in fade-in">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 mx-auto">
            <Award className="h-8 w-8 text-emerald-400" />
          </div>

          <div>
            <h4 className="font-display text-2xl font-bold text-slate-100">
              {score === QUIZ_QUESTIONS.length
                ? 'Grand Maître des Marais !'
                : score >= 3
                ? 'Naturaliste Émérite !'
                : 'Apprenti Explorateur de l’Étang'}
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              Tu as obtenu <strong className="text-emerald-400">{score}</strong> sur{' '}
              {QUIZ_QUESTIONS.length} bonnes réponses.
            </p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {score === QUIZ_QUESTIONS.length
              ? 'Incroyable ! La vie aquatique et la métamorphose n’ont plus aucun secret pour toi.'
              : 'Bravo pour ta curiosité ! Continue d’observer l’étang magique pour en percer tous les mystères.'}
          </p>

          <button
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-lg"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Recommencer le Quiz</span>
          </button>
        </div>
      ) : (
        /* Question Card */
        <div className="space-y-6">
          <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-4">
            <h4 className="text-base font-semibold text-slate-100 leading-snug">
              {currentQuestion.question}
            </h4>
          </div>

          {/* Options List */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let style =
                'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60';
              if (isSelected && !isAnswerSubmitted) {
                style =
                  'border-emerald-500 bg-emerald-950/50 text-emerald-200 ring-1 ring-emerald-500/50';
              } else if (isAnswerSubmitted) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-950/60 text-emerald-200';
                } else if (isSelected) {
                  style = 'border-rose-500 bg-rose-950/50 text-rose-200';
                } else {
                  style = 'border-slate-800/40 bg-slate-950/20 text-slate-600';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs font-medium transition-all ${style} cursor-pointer`}
                >
                  <span className="flex-1">{option}</span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="h-4 w-4 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Post-Answer Explanation Box */}
          {isAnswerSubmitted && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-semibold text-emerald-300">
                {selectedOption === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Exactement !</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-400" />
                    <span>Pas tout à fait...</span>
                  </>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
              <div className="pt-2 border-t border-emerald-900/40 text-emerald-200/90 italic">
                💡 <strong>Le Savais-tu ?</strong> {currentQuestion.funFact}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex justify-end pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`rounded-xl px-5 py-2 text-xs font-semibold transition-all ${
                  selectedOption !== null
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Valider ma réponse
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-md cursor-pointer"
              >
                <span>
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                    ? 'Question suivante'
                    : 'Voir mes résultats'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
