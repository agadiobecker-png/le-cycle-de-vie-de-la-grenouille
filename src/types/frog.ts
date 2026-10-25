export interface FrogStage {
  id: string;
  stepNumber: number;
  name: string;
  subtitle: string;
  scientificTerm: string;
  duration: string;
  habitat: string;
  respiration: string;
  alimentation: string;
  keyFeature: string;
  description: string;
  pin: {
    x: number; // percentage from left
    y: number; // percentage from top
  };
  zone: 'underwater' | 'shore' | 'surface';
  image: string;
  didYouKnow: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact: string;
}

export interface ObservationTarget {
  id: string;
  title: string;
  clue: string;
  hitbox: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  };
  found: boolean;
  discoveredText: string;
}
