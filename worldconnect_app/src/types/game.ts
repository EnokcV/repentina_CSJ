export type GameLevel = 'principiante' | 'intermedio' | 'avanzado';

export type GameMode = 'quiz' | 'match' | 'type';

export interface GameQuestion {
  id: string;
  phrase: string;
  correctAnswer: string;
  options?: string[];
  difficulty: GameLevel;
  category: string;
  type: GameMode;
}

export interface GameScore {
  totalPoints: number;
  streak: number;
  maxStreak: number;
  correctAnswers: number;
  totalAttempts: number;
  level: GameLevel;
  lastPlayed: number;
}

export interface GameReward {
  id: string;
  name: string;
  nameKey: string;
  description: string;
  icon: string;
  requiredPoints: number;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface GameState {
  score: GameScore;
  currentQuestion: GameQuestion | null;
  questionNumber: number;
  totalQuestions: number;
  isPlaying: boolean;
  showResult: boolean;
  lastAnswerCorrect: boolean;
  rewards: GameReward[];
  questions?: GameQuestion[];
}

export interface PhraseTemplate {
  template: string;
  variables: string[];
  difficulty: GameLevel;
  category: string;
}

export interface PhraseGenerator {
  id: string;
  generate: (difficulty: GameLevel) => Promise<GameQuestion>;
}

export const LEVEL_CONFIG: Record<GameLevel, {
  name: string;
  questionsPerRound: number;
  pointsPerCorrect: number;
  streakBonus: number;
  description: string;
}> = {
  principiante: {
    name: 'Principiante',
    questionsPerRound: 5,
    pointsPerCorrect: 10,
    streakBonus: 2,
    description: 'Frases básicas y comunes'
  },
  intermedio: {
    name: 'Intermedio',
    questionsPerRound: 7,
    pointsPerCorrect: 20,
    streakBonus: 5,
    description: 'Frases de conversación diaria'
  },
  avanzado: {
    name: 'Avanzado',
    questionsPerRound: 10,
    pointsPerCorrect: 35,
    streakBonus: 10,
    description: 'Expresiones complejas y slang'
  }
};

export const REWARDS: Omit<GameReward, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first_correct',
    name: 'Primera Correcta',
    nameKey: 'first_correct',
    description: 'Responde correctamente tu primera pregunta',
    icon: 'star',
    requiredPoints: 10
  },
  {
    id: 'streak_3',
    name: 'Racha de 3',
    nameKey: 'streak_3',
    description: 'Consigue 3 respuestas correctas seguidas',
    icon: 'local_fire_department',
    requiredPoints: 30
  },
  {
    id: 'streak_5',
    name: 'Racha de 5',
    nameKey: 'streak_5',
    description: 'Consigue 5 respuestas correctas seguidas',
    icon: 'whatshot',
    requiredPoints: 75
  },
  {
    id: 'perfect_round',
    name: 'Ronda Perfecta',
    nameKey: 'perfect_round',
    description: 'Completa una ronda sin errores',
    icon: 'military_tech',
    requiredPoints: 100
  },
  {
    id: 'dedicated_learner',
    name: 'Estudiante Dedicado',
    nameKey: 'dedicated_learner',
    description: 'Acumula 500 puntos',
    icon: 'school',
    requiredPoints: 500
  },
  {
    id: 'polyglot',
    name: 'Políglota',
    nameKey: 'polyglot',
    description: 'Alcanza el nivel Avanzado',
    icon: 'language',
    requiredPoints: 1000
  },
  {
    id: 'master',
    name: 'Maestro del Idioma',
    nameKey: 'master',
    description: 'Acumula 2000 puntos',
    icon: 'emoji_events',
    requiredPoints: 2000
  }
];

export const PHRASE_CATEGORIES = [
  'saludos',
  'comida',
  'transporte',
  'emergencia',
  'fútbol',
  'compras',
  'direcciones',
  'social'
];

export function getStorageKey(level: GameLevel): string {
  return `worldconnect_game_${level}`;
}

export function getScoreStorageKey(): string {
  return 'worldconnect_game_score';
}

export function getRewardsStorageKey(): string {
  return 'worldconnect_game_rewards';
}