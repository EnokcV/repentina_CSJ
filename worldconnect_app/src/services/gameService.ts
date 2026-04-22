import { 
  GameState, 
  GameScore, 
  GameReward, 
  GameLevel, 
  LEVEL_CONFIG,
  REWARDS,
  getScoreStorageKey,
  getRewardsStorageKey
} from '../types/game';
import phraseGenerator from './phraseGenerator';

const INITIAL_SCORE: GameScore = {
  totalPoints: 0,
  streak: 0,
  maxStreak: 0,
  correctAnswers: 0,
  totalAttempts: 0,
  level: 'principiante',
  lastPlayed: 0
};

const INITIAL_STATE: GameState = {
  score: INITIAL_SCORE,
  currentQuestion: null,
  questionNumber: 0,
  totalQuestions: 0,
  isPlaying: false,
  showResult: false,
  lastAnswerCorrect: false,
  rewards: REWARDS.map(r => ({ ...r, unlocked: false }))
};

function loadScore(): GameScore {
  try {
    const saved = localStorage.getItem(getScoreStorageKey());
    if (saved) {
      return { ...INITIAL_SCORE, ...JSON.parse(saved) };
    }
  } catch {}
  return INITIAL_SCORE;
}

function saveScore(score: GameScore): void {
  try {
    localStorage.setItem(getScoreStorageKey(), JSON.stringify(score));
  } catch {}
}

function loadRewards(): GameReward[] {
  try {
    const saved = localStorage.getItem(getRewardsStorageKey());
    if (saved) {
      const savedRewards = JSON.parse(saved);
      return REWARDS.map(r => {
        const saved = savedRewards.find((sr: GameReward) => sr.id === r.id);
        return saved ? { ...r, unlocked: saved.unlocked, unlockedAt: saved.unlockedAt } : { ...r, unlocked: false };
      });
    }
  } catch {}
  return REWARDS.map(r => ({ ...r, unlocked: false }));
}

function saveRewards(rewards: GameReward[]): void {
  try {
    localStorage.setItem(getRewardsStorageKey(), JSON.stringify(rewards));
  } catch {}
}

function checkLevelUp(score: GameScore): GameLevel {
  const { totalPoints } = score;
  
  if (totalPoints >= 1000) return 'avanzado';
  if (totalPoints >= 300) return 'intermedio';
  return 'principiante';
}

function checkNewRewards(score: GameScore, currentRewards: GameReward[]): GameReward[] {
  const newRewards = [...currentRewards];
  let changed = false;

  newRewards.forEach(reward => {
    if (reward.unlocked) return;

    let shouldUnlock = false;

    switch (reward.id) {
      case 'first_correct':
        shouldUnlock = score.correctAnswers >= 1;
        break;
      case 'streak_3':
        shouldUnlock = score.maxStreak >= 3;
        break;
      case 'streak_5':
        shouldUnlock = score.maxStreak >= 5;
        break;
      case 'perfect_round':
        shouldUnlock = score.totalAttempts >= 10 && score.correctAnswers === score.totalAttempts;
        break;
      case 'dedicated_learner':
        shouldUnlock = score.totalPoints >= 500;
        break;
      case 'polyglot':
        shouldUnlock = checkLevelUp(score) === 'avanzado';
        break;
      case 'master':
        shouldUnlock = score.totalPoints >= 2000;
        break;
    }

    if (shouldUnlock) {
      reward.unlocked = true;
      reward.unlockedAt = Date.now();
      changed = true;
    }
  });

  if (changed) {
    saveRewards(newRewards);
  }

  return newRewards;
}

class GameService {
  private state: GameState;

  constructor() {
    this.state = {
      ...INITIAL_STATE,
      score: loadScore(),
      rewards: loadRewards()
    };
  }

  getState(): GameState {
    return this.state;
  }

  async startGame(level: GameLevel): Promise<GameState> {
    const config = LEVEL_CONFIG[level];
    const questions = await phraseGenerator.generateQuestions(level, config.questionsPerRound);

    this.state = {
      ...this.state,
      score: {
        ...this.state.score,
        level,
        lastPlayed: Date.now()
      },
      currentQuestion: questions[0] || null,
      questionNumber: 1,
      totalQuestions: questions.length,
      isPlaying: true,
      showResult: false,
      lastAnswerCorrect: false,
      questions
    };

    return this.state;
  }

  async nextQuestion(): Promise<GameState> {
    const { questionNumber, totalQuestions, score } = this.state;
    const questions = this.state.questions;
    
    if (questionNumber >= totalQuestions || !questions) {
      return this.endGame();
    }

    const newScore = {
      ...score,
      totalAttempts: score.totalAttempts + (this.state.showResult ? 0 : 1)
    };

    this.state = {
      ...this.state,
      currentQuestion: questions?.[questionNumber] || null,
      questionNumber: questionNumber + 1,
      showResult: false,
      lastAnswerCorrect: false,
      score: newScore
    };

    return this.state;
  }

  answerQuestion(answer: string): GameState {
    const { currentQuestion, score } = this.state;
    
    if (!currentQuestion) return this.state;

    const isCorrect = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    const config = LEVEL_CONFIG[score.level];
    
    let pointsEarned = 0;
    let newStreak = score.streak;

    if (isCorrect) {
      pointsEarned = config.pointsPerCorrect;
      if (score.streak > 0) {
        pointsEarned += config.streakBonus * score.streak;
      }
      newStreak = score.streak + 1;
    } else {
      newStreak = 0;
    }

    const newScore: GameScore = {
      ...score,
      totalPoints: score.totalPoints + pointsEarned,
      streak: newStreak,
      maxStreak: Math.max(score.maxStreak, newStreak),
      correctAnswers: score.correctAnswers + (isCorrect ? 1 : 0),
      totalAttempts: score.totalAttempts + 1,
      level: checkLevelUp(score)
    };

    const newRewards = checkNewRewards(newScore, this.state.rewards);
    
    saveScore(newScore);

    this.state = {
      ...this.state,
      score: newScore,
      showResult: true,
      lastAnswerCorrect: isCorrect,
      rewards: newRewards
    };

    return this.state;
  }

  endGame(): GameState {
    const { score } = this.state;
    
    const finalScore = {
      ...score,
      lastPlayed: Date.now()
    };

    saveScore(finalScore);

    this.state = {
      ...this.state,
      isPlaying: false,
      currentQuestion: null,
      score: finalScore
    };

    return this.state;
  }

  resetGame(): GameState {
    this.state = {
      ...INITIAL_STATE,
      score: loadScore(),
      rewards: loadRewards()
    };

    return this.state;
  }

  getLeaderboard(): { score: GameScore; rank: number }[] {
    const scores = this.getAllScores();
    scores.sort((a, b) => b.totalPoints - a.totalPoints);
    
    return scores.map((s, i) => ({ score: s, rank: i + 1 }));
  }

  private getAllScores(): GameScore[] {
    try {
      const saved = localStorage.getItem(getScoreStorageKey());
      if (saved) {
        return [JSON.parse(saved)];
      }
    } catch {}
    return [INITIAL_SCORE];
  }

  unlockReward(rewardId: string): GameReward | null {
    const reward = this.state.rewards.find(r => r.id === rewardId);
    if (reward && !reward.unlocked) {
      reward.unlocked = true;
      reward.unlockedAt = Date.now();
      saveRewards(this.state.rewards);
      return reward;
    }
    return null;
  }

  getProgress(): { current: number; required: number; percentage: number } {
    const { score } = this.state;
    const nextLevel = score.level === 'principiante' ? 'intermedio' : 
                      score.level === 'intermedio' ? 'avanzado' : 'avanzado';
    
    const thresholds = { principiante: 0, intermedio: 300, avanzado: 1000 };
    const current = score.totalPoints - thresholds[score.level];
    const required = thresholds[nextLevel] - thresholds[score.level];
    const percentage = Math.min(100, Math.round((current / required) * 100));

    return { current, required, percentage };
  }
}

const gameService = new GameService();
export default gameService;