import React, { useState, useEffect, useCallback } from 'react';
import { AppSettings } from '../types';
import { GameLevel, GameQuestion, GameScore, GameReward, LEVEL_CONFIG } from '../types/game';
import gameService from '../services/gameService';

interface LearnPanelProps {
  settings: AppSettings;
}

type GameView = 'menu' | 'playing' | 'results';

const LearnPanel: React.FC<LearnPanelProps> = ({ settings }) => {
  const [gameView, setGameView] = useState<GameView>('menu');
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>('principiante');
  const [score, setScore] = useState<GameScore>(gameService.getState().score);
  const [rewards, setRewards] = useState<GameReward[]>(gameService.getState().rewards);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [newReward, setNewReward] = useState<GameReward | null>(null);

  useEffect(() => {
    const state = gameService.getState();
    setScore(state.score);
    setRewards(state.rewards);
  }, [gameView]);

  const getText = useCallback((key: string): string => {
    const texts: Record<string, Record<string, string>> = {
      title: { es: 'Aprende Jugando', fr: 'Apprendre en Jouant', en: 'Learn Through Play' },
      selectLevel: { es: 'Selecciona tu Nivel', fr: 'Sélectionnez Votre Niveau', en: 'Select Your Level' },
      principiante: { es: 'Principiante', fr: 'Débutant', en: 'Beginner' },
      intermedio: { es: 'Intermedio', fr: 'Intermédiaire', en: 'Intermediate' },
      avanzado: { es: 'Avanzado', fr: 'Avancé', en: 'Advanced' },
      startGame: { es: 'Comenzar', fr: 'Commencer', en: 'Start' },
      points: { es: 'Puntos', fr: 'Points', en: 'Points' },
      streak: { es: 'Racha', fr: 'Série', en: 'Streak' },
      level: { es: 'Nivel', fr: 'Niveau', en: 'Level' },
      pregunta: { es: 'Pregunta', fr: 'Question', en: 'Question' },
      traducir: { es: 'Traduce:', fr: 'Traduisez:', en: 'Translate:' },
      verificar: { es: 'Verificar', fr: 'Vérifier', en: 'Check' },
      correcto: { es: '¡Correcto!', fr: 'Correct!', en: 'Correct!' },
      incorrecto: { es: 'Incorrecto', fr: 'Incorrect', en: 'Wrong' },
      sigPregunta: { es: 'Siguiente', fr: 'Suivant', en: 'Next' },
      resultados: { es: 'Resultados', fr: 'Résultats', en: 'Results' },
      totalPuntos: { es: 'Puntos Totales', fr: 'Points Totaux', en: 'Total Points' },
      respuestasCorrectas: { es: 'Respuestas Correctas', fr: 'Réponses Correctes', en: 'Correct Answers' },
      mejorRacha: { es: 'Mejor Racha', fr: 'Meilleure Série', en: 'Best Streak' },
      volverJugar: { es: 'Volver a Jugar', fr: 'Rejouer', en: 'Play Again' },
      menuPrincipal: { es: 'Menú Principal', fr: 'Menu Principal', en: 'Main Menu' },
      recompensas: { es: 'Recompensas', fr: 'Récompenses', en: 'Rewards' },
      logros: { es: 'Logros', fr: 'Succès', en: 'Achievements' },
      continuar: { es: 'Continuar', fr: 'Continuer', en: 'Continue' },
      escribeTraduccion: { es: 'Escribe la traducción', fr: 'Écrivez la traduction', en: 'Write the translation' },
      seleccionaOpcion: { es: 'Selecciona la opción correcta', fr: 'Sélectionnez la bonne réponse', en: 'Select the correct answer' },
      loading: { es: 'Cargando...', fr: 'Chargement...', en: 'Loading...' },
      tuPuntuacion: { es: 'Tu Puntuación', fr: 'Votre Score', en: 'Your Score' },
      preguntaDe: { es: 'de', fr: 'de', en: 'of' },
    };
    return texts[key]?.[settings.language] || key;
  }, [settings.language]);

  const handleStartGame = async () => {
    setLoading(true);
    try {
      const state = await gameService.startGame(selectedLevel);
      setCurrentQuestion(state.currentQuestion);
      setQuestionNumber(state.questionNumber);
      setTotalQuestions(state.totalQuestions);
      setScore(state.score);
      setGameView('playing');
      setShowResult(false);
      setSelectedAnswer(null);
      setUserInput('');
    } catch (error) {
      console.error('Error starting game:', error);
    }
    setLoading(false);
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion || showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);
    
    const newState = gameService.answerQuestion(answer);
    setScore(newState.score);
    setRewards(newState.rewards);
    
    const unlockedReward = newState.rewards.find((r: GameReward) => r.unlocked && !rewards.find((pr: GameReward) => pr.id === r.id));
    if (unlockedReward) {
      setNewReward(unlockedReward);
    }
  };

  const handleInputSubmit = () => {
    if (!currentQuestion || showResult || !userInput.trim()) return;
    
    setSelectedAnswer(userInput);
    const correct = userInput.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);
    
    const newState = gameService.answerQuestion(userInput);
    setScore(newState.score);
    setRewards(newState.rewards);
  };

  const handleNextQuestion = async () => {
    setNewReward(null);
    setLoading(true);
    const newState = await gameService.nextQuestion();
    
    if (!newState.isPlaying) {
      setGameView('results');
    } else {
      setCurrentQuestion(newState.currentQuestion);
      setQuestionNumber(newState.questionNumber);
      setScore(newState.score);
    }
    
    setShowResult(false);
    setSelectedAnswer(null);
    setUserInput('');
    setLoading(false);
  };

  const handleBackToMenu = () => {
    setGameView('menu');
    const state = gameService.getState();
    setScore(state.score);
    setRewards(state.rewards);
  };

  const getLevelColor = (level: GameLevel): string => {
    switch (level) {
      case 'principiante': return '#4CAF50';
      case 'intermedio': return '#FF9800';
      case 'avanzado': return '#f44336';
    }
  };

  const getLevelIcon = (level: GameLevel): string => {
    switch (level) {
      case 'principiante': return 'emoji_nature';
      case 'intermedio': return 'trending_up';
      case 'avanzado': return 'whatshot';
    }
  };

  const renderRewardPopup = () => {
    if (!newReward) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s'
      }} onClick={() => setNewReward(null)}>
        <div style={{
          background: 'linear-gradient(135deg, #FFD700, #FFA500)',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          maxWidth: '300px',
          animation: 'bounce 0.5s'
        }}>
          <span className="material-icons" style={{ fontSize: '60px', color: '#fff' }}>
            {newReward.icon === 'star' ? 'star' : 
             newReward.icon === 'local_fire_department' ? 'local_fire_department' :
             newReward.icon === 'whatshot' ? 'whatshot' :
             newReward.icon === 'military_tech' ? 'military_tech' :
             newReward.icon === 'school' ? 'school' :
             newReward.icon === 'language' ? 'language' : 'emoji_events'}
          </span>
          <h3 style={{ color: '#fff', marginTop: '15px', fontSize: '1.5rem' }}>
            {getText('logros')}!
          </h3>
          <p style={{ color: '#fff', fontSize: '1.1rem' }}>{newReward.name}</p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{newReward.description}</p>
          <button 
            className="btn btn-primary" 
            style={{ marginTop: '20px', background: '#fff', color: '#FFA500' }}
            onClick={() => setNewReward(null)}
          >
            {getText('continuar')}
          </button>
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        `}</style>
      </div>
    );
  };

  const renderMenu = () => (
    <div className="game-menu">
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <span className="material-icons" style={{ fontSize: '60px', color: 'var(--color-primary)' }}>
          sports_esports
        </span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '10px' }}>{getText('title')}</h2>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: '#666' }}>{getText('points')}</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: 'var(--color-primary)' }}>
            {score.totalPoints}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#666' }}>{getText('streak')}</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: score.streak > 0 ? '#FF5722' : '#666' }}>
            {score.streak} 🔥
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px', color: '#333' }}>{getText('selectLevel')}</h3>
        
        {(['principiante', 'intermedio', 'avanzado'] as GameLevel[]).map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            style={{
              width: '100%',
              padding: '15px 20px',
              marginBottom: '10px',
              border: `2px solid ${selectedLevel === level ? getLevelColor(level) : '#ddd'}`,
              borderRadius: '12px',
              background: selectedLevel === level ? `${getLevelColor(level)}15` : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span className="material-icons" style={{ 
                fontSize: '30px', 
                color: getLevelColor(level) 
              }}>
                {getLevelIcon(level)}
              </span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
                  {getText(level)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  {LEVEL_CONFIG[level].description}
                </div>
              </div>
            </div>
            <div style={{ 
              background: getLevelColor(level), 
              color: 'white', 
              padding: '5px 12px', 
              borderRadius: '20px',
              fontSize: '0.85rem'
            }}>
              +{LEVEL_CONFIG[level].pointsPerCorrect} pts
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleStartGame}
        disabled={loading}
        className="btn btn-primary"
        style={{ 
          width: '100%', 
          padding: '15px',
          fontSize: '1.1rem'
        }}
      >
        {loading ? getText('loading') : getText('startGame')}
      </button>

      {rewards.filter(r => r.unlocked).length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>{getText('recompensas')}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {rewards.filter(r => r.unlocked).map(r => (
              <div key={r.id} style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                padding: '10px 15px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span className="material-icons" style={{ fontSize: '20px', color: 'white' }}>
                  {r.icon === 'star' ? 'star' : 
                   r.icon === 'local_fire_department' ? 'local_fire_department' :
                   r.icon === 'whatshot' ? 'whatshot' :
                   r.icon === 'military_tech' ? 'military_tech' :
                   r.icon === 'school' ? 'school' :
                   r.icon === 'language' ? 'language' : 'emoji_events'}
                </span>
                <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 'bold' }}>{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderPlaying = () => {
    if (!currentQuestion) return null;

    return (
      <div className="game-playing">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          background: 'white',
          padding: '15px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{getText('pregunta')}</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              {questionNumber} {getText('preguntaDe')} {totalQuestions}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{getText('points')}</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
              {score.totalPoints}
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '10px' }}>
            {getText('traducir')}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {currentQuestion.phrase}
          </div>
          <div style={{ 
            marginTop: '15px', 
            fontSize: '0.9rem', 
            opacity: 0.8,
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 15px',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            {currentQuestion.type === 'quiz' ? getText('seleccionaOpcion') : 
             getText('escribeTraduccion')}
          </div>
        </div>

        {showResult && (
          <div style={{
            background: isCorrect ? '#E8F5E9' : '#FFEBEE',
            border: `2px solid ${isCorrect ? '#4CAF50' : '#f44336'}`,
            borderRadius: '12px',
            padding: '15px',
            marginBottom: '20px',
            textAlign: 'center',
            animation: 'slideIn 0.3s'
          }}>
            <span className="material-icons" style={{ 
              fontSize: '40px', 
              color: isCorrect ? '#4CAF50' : '#f44336',
              verticalAlign: 'middle',
              marginRight: '10px'
            }}>
              {isCorrect ? 'check_circle' : 'cancel'}
            </span>
            <span style={{ 
              fontSize: '1.3rem', 
              fontWeight: 'bold',
              color: isCorrect ? '#4CAF50' : '#f44336'
            }}>
              {isCorrect ? getText('correcto') : getText('incorrecto')}
            </span>
            {!isCorrect && (
              <div style={{ marginTop: '10px', color: '#666' }}>
                {getText('level')}: <strong>{currentQuestion.correctAnswer}</strong>
              </div>
            )}
          </div>
        )}

        {currentQuestion.type === 'quiz' && currentQuestion.options ? (
          <div style={{ display: 'grid', gap: '10px' }}>
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                style={{
                  padding: '15px',
                  border: `2px solid ${
                    showResult 
                      ? option === currentQuestion.correctAnswer 
                        ? '#4CAF50' 
                        : selectedAnswer === option 
                          ? '#f44336' 
                          : '#ddd'
                      : 'var(--color-primary)'
                  }`,
                  borderRadius: '12px',
                  background: showResult && option === currentQuestion.correctAnswer 
                    ? '#E8F5E9' 
                    : selectedAnswer === option && showResult 
                      ? '#FFEBEE' 
                      : 'white',
                  fontSize: '1rem',
                  cursor: showResult ? 'default' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showResult}
              placeholder={getText('escribeTraduccion')}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: `2px solid ${
                  showResult 
                    ? isCorrect 
                      ? '#4CAF50' 
                      : '#f44336'
                    : '#ddd'
                }`,
                borderRadius: '12px',
                marginBottom: '15px',
                textAlign: 'center'
              }}
              onKeyPress={(e) => e.key === 'Enter' && !showResult && handleInputSubmit()}
            />
            {!showResult && (
              <button
                onClick={handleInputSubmit}
                disabled={!userInput.trim()}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {getText('verificar')}
              </button>
            )}
          </div>
        )}

        {showResult && (
          <button
            onClick={handleNextQuestion}
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '20px' }}
          >
            {questionNumber < totalQuestions ? getText('sigPregunta') : getText('resultados')}
          </button>
        )}

        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '5px'
        }}>
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '30px',
                height: '6px',
                borderRadius: '3px',
                background: idx < questionNumber - 1 
                  ? '#4CAF50' 
                  : idx === questionNumber - 1 
                    ? 'var(--color-primary)' 
                    : '#ddd'
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  };

  const renderResults = () => {
    const correctPercent = totalQuestions > 0 
      ? Math.round((score.correctAnswers / score.totalAttempts) * 100) 
      : 0;

    return (
      <div className="game-results">
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <span className="material-icons" style={{ 
            fontSize: '80px', 
            color: correctPercent >= 70 ? '#FFD700' : '#FF9800' 
          }}>
            {correctPercent >= 70 ? 'emoji_events' : 'sentiment_satisfied'}
          </span>
          <h2 style={{ fontSize: '2rem', marginTop: '15px' }}>{getText('resultados')}</h2>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '1rem', color: '#666' }}>{getText('tuPuntuacion')}</div>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: 'var(--color-primary)' 
            }}>
              {score.totalPoints}
            </div>
            <div style={{ 
              fontSize: '2rem', 
              color: score.streak > 0 ? '#FF5722' : '#666',
              marginTop: '5px'
            }}>
              🔥 {score.streak}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{
              background: '#E8F5E9',
              padding: '15px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>
                {score.correctAnswers}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>
                {getText('respuestasCorrectas')}
              </div>
            </div>
            <div style={{
              background: '#FFF3E0',
              padding: '15px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9800' }}>
                {score.maxStreak}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>
                {getText('mejorRacha')}
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            background: '#f5f5f5',
            borderRadius: '12px',
            padding: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
              Precisión
            </div>
            <div style={{ 
              height: '20px', 
              background: '#ddd', 
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${correctPercent}%`,
                height: '100%',
                background: correctPercent >= 70 ? '#4CAF50' : '#FF9800',
                transition: 'width 0.5s'
              }} />
            </div>
            <div style={{ marginTop: '5px', fontWeight: 'bold' }}>{correctPercent}%</div>
          </div>
        </div>

        {rewards.filter(r => r.unlocked).length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            borderRadius: '12px',
            padding: '15px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{ color: 'white', marginBottom: '10px', fontWeight: 'bold' }}>
              {getText('logros')} Desbloqueados
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {rewards.filter(r => r.unlocked).map(r => (
                <span key={r.id} className="material-icons" style={{ color: 'white', fontSize: '30px' }}>
                  {r.icon === 'star' ? 'star' : 
                   r.icon === 'local_fire_department' ? 'local_fire_department' :
                   r.icon === 'whatshot' ? 'whatshot' :
                   r.icon === 'military_tech' ? 'military_tech' :
                   r.icon === 'school' ? 'school' :
                   r.icon === 'language' ? 'language' : 'emoji_events'}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleBackToMenu}
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '10px' }}
        >
          {getText('volverJugar')}
        </button>
      </div>
    );
  };

  const fs = settings.fontSize === 'small' ? '0.9rem' : 
             settings.fontSize === 'large' ? '1.2rem' : '1rem';

  return (
    <div className="learn-panel" style={{ fontSize: fs }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        textAlign: 'center', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <span className="material-icons" style={{ verticalAlign: 'middle' }}>school</span>
        {settings.language === 'es' ? 'Aprendizaje' : 
         settings.language === 'fr' ? 'Apprentissage' : 
         'Learning'}
      </h2>

      {gameView === 'menu' && renderMenu()}
      {gameView === 'playing' && renderPlaying()}
      {gameView === 'results' && renderResults()}

      {renderRewardPopup()}

      <style>{`
        .game-menu, .game-playing, .game-results {
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LearnPanel;