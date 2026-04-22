import React, { useState } from 'react';
import { AppSettings } from '../types';

interface LearnPanelProps {
  settings: AppSettings;
}

interface PhraseCard {
  id: string;
  category: string;
  es: string;
  fr: string;
  en: string;
  learned: boolean;
}

const LearnPanel: React.FC<LearnPanelProps> = ({ settings }) => {
  const [phrases, setPhrases] = useState<PhraseCard[]>(() => {
    const saved = localStorage.getItem('worldconnect_learned_phrases');
    const learnedIds = saved ? JSON.parse(saved) : [];
    
    const allPhrases: PhraseCard[] = [
      { id: '1', category: 'saludo', es: 'Hola', fr: 'Bonjour', en: 'Hello', learned: false },
      { id: '2', category: 'saludo', es: 'Buenos días', fr: 'Bonjour', en: 'Good morning', learned: false },
      { id: '3', category: 'saludo', es: 'Gracias', fr: 'Merci', en: 'Thank you', learned: false },
      { id: '4', category: 'saludo', es: 'Por favor', fr: "S'il vous plaît", en: 'Please', learned: false },
      { id: '5', category: 'saludo', es: 'Adiós', fr: 'Au revoir', en: 'Goodbye', learned: false },
      { id: '6', category: 'comida', es: 'Agua', fr: 'Eau', en: 'Water', learned: false },
      { id: '7', category: 'comida', es: 'Comida', fr: 'Nourriture', en: 'Food', learned: false },
      { id: '8', category: 'comida', es: 'Cerveza', fr: 'Bière', en: 'Beer', learned: false },
      { id: '9', category: 'comida', es: 'La cuenta', fr: "L'addition", en: 'The bill', learned: false },
      { id: '10', category: 'comida', es: 'Está delicioso', fr: 'C\'est délicieux', en: 'It\'s delicious', learned: false },
      { id: '11', category: 'fubol', es: 'Gol', fr: 'But', en: 'Goal', learned: false },
      { id: '12', category: 'fubol', es: 'Vamos', fr: 'Allez', en: 'Let\'s go', learned: false },
      { id: '13', category: 'fubol', es: 'Equipo', fr: 'Équipe', en: 'Team', learned: false },
      { id: '14', category: 'fubol', es: 'Partido', fr: 'Match', en: 'Match', learned: false },
      { id: '15', category: 'fubol', es: 'Ganador', fr: 'Gagnant', en: 'Winner', learned: false },
      { id: '16', category: 'transporte', es: 'Metro', fr: 'Métro', en: 'Subway', learned: false },
      { id: '17', category: 'transporte', es: 'Taxi', fr: 'Taxi', en: 'Taxi', learned: false },
      { id: '18', category: 'transporte', es: '¿Dónde está?', fr: 'Où est?', en: 'Where is?', learned: false },
      { id: '19', category: 'emergencia', es: 'Ayuda', fr: 'Aide', en: 'Help', learned: false },
      { id: '20', category: 'emergencia', es: 'Hospital', fr: 'Hôpital', en: 'Hospital', learned: false },
    ];
    
    return allPhrases.map(p => ({
      ...p,
      learned: learnedIds.includes(p.id)
    }));
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const categories = [
    { id: 'all', es: 'Todos', fr: 'Tous', en: 'All' },
    { id: 'saludo', es: 'Saludos', fr: 'Salutations', en: 'Greetings' },
    { id: 'comida', es: 'Comida', fr: 'Nourriture', en: 'Food' },
    { id: 'fubol', es: 'Fútbol', fr: 'Football', en: 'Football' },
    { id: 'transporte', es: 'Transporte', fr: 'Transport', en: 'Transport' },
    { id: 'emergencia', es: 'Emergencia', fr: 'Urgence', en: 'Emergency' },
  ];

  const filteredPhrases = selectedCategory === 'all' 
    ? phrases 
    : phrases.filter(p => p.category === selectedCategory);

  const currentPhrase = filteredPhrases[currentIndex];
  const learnedCount = phrases.filter(p => p.learned).length;

  const getCurrentText = (phrase: PhraseCard) => {
    switch (settings.language) {
      case 'fr': return { original: phrase.fr, target: phrase.es };
      case 'en': return { original: phrase.en, target: phrase.es };
      default: return { original: phrase.es, target: phrase.fr };
    }
  };

  const markAsLearned = () => {
    const newPhrases = phrases.map(p => 
      p.id === currentPhrase.id ? { ...p, learned: true } : p
    );
    setPhrases(newPhrases);
    localStorage.setItem('worldconnect_learned_phrases', 
      JSON.stringify(newPhrases.filter(p => p.learned).map(p => p.id))
    );
    
    if (currentIndex < filteredPhrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
    }
  };

  const nextCard = () => {
    if (currentIndex < filteredPhrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowTranslation(false);
    }
  };

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '1rem';
      case 'large': return '1.5rem';
      default: return '1.2rem';
    }
  };

  const fs = getFontSize();

  return (
    <div className="learn-panel">
      <h2 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px' }}>
        <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>school</span>
        {settings.language === 'es' ? 'Aprender' : 
         settings.language === 'fr' ? 'Apprendre' : 
         'Learn'}
      </h2>

      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        padding: '15px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: fs, color: '#666' }}>
          {settings.language === 'es' ? 'Frases aprendidas' : 
           settings.language === 'fr' ? 'Phrases apprises' : 
           'Phrases learned'}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
          {learnedCount} / {phrases.length}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '10px'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              setShowTranslation(false);
            }}
            className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ 
              whiteSpace: 'nowrap',
              padding: '8px 16px',
              fontSize: '0.9rem'
            }}
          >
            {cat[settings.language]}
          </button>
        ))}
      </div>

      {filteredPhrases.length > 0 && currentPhrase && (
        <div style={{ marginBottom: '20px' }}>
          <div 
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              color: 'var(--color-primary)',
              marginBottom: '10px'
            }}>
              {getCurrentText(currentPhrase).original}
            </div>
            
            {showTranslation && (
              <div style={{ 
                fontSize: '1.5rem', 
                color: '#666',
                marginTop: '20px',
                borderTop: '1px solid #ddd',
                paddingTop: '20px',
                width: '100%'
              }}>
                <div>{getCurrentText(currentPhrase).target}</div>
              </div>
            )}
            
            {!showTranslation && (
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#999',
                marginTop: '20px'
              }}>
                {settings.language === 'es' ? 'Toca para ver traducción' : 
                 settings.language === 'fr' ? 'Toucher pour voir' : 
                 'Tap to see translation'}
              </div>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginTop: '15px',
            justifyContent: 'center'
          }}>
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              <span className="material-icons">chevron_left</span>
            </button>
            
            <button
              onClick={markAsLearned}
              className="btn btn-primary"
              style={{ flex: 2 }}
              disabled={currentPhrase.learned}
            >
              <span className="material-icons">check_circle</span>
              {currentPhrase.learned 
                ? (settings.language === 'es' ? 'Aprendido' : 
                   settings.language === 'fr' ? 'Appris' : 
                   'Learned')
                : (settings.language === 'es' ? 'Marcar' : 
                   settings.language === 'fr' ? 'Marquer' : 
                   'Mark as learned')}
            </button>
            
            <button
              onClick={nextCard}
              disabled={currentIndex === filteredPhrases.length - 1}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '15px',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            {currentIndex + 1} / {filteredPhrases.length}
          </div>
        </div>
      )}

      {filteredPhrases.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666'
        }}>
          {settings.language === 'es' ? 'No hay frases en esta categoría' : 
           settings.language === 'fr' ? 'Aucune phrase dans cette catégorie' : 
           'No phrases in this category'}
        </div>
      )}
    </div>
  );
};

export default LearnPanel;