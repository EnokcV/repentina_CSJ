import React, { useState, useEffect } from 'react';
import offlineService from '../services/offlineService';
import verificationService from '../services/verificationService';
import { AppSettings } from '../types';

interface EmergencyPanelProps {
  settings: AppSettings;
}

const EmergencyPanel: React.FC<EmergencyPanelProps> = ({ settings }) => {
  const [selectedEmergency, setSelectedEmergency] = useState<string>('');
  const [translatedMessage, setTranslatedMessage] = useState<string>('');
  const [isFlashing, setIsFlashing] = useState(false);

  const emergencyCategories = [
    {
      id: 'medical',
      icon: 'medical_services',
      color: '#f44336',
      phrases: ['medical', 'help', 'police']
    },
    {
      id: 'lost',
      icon: 'location_off',
      color: '#ff9800',
      phrases: ['lost']
    },
    {
      id: 'safety',
      icon: 'security',
      color: '#4caf50',
      phrases: ['help', 'police']
    }
  ];

  const emergencyPhrases = {
    medical: {
      es: ['Necesito un médico', 'Es una emergencia médica', 'Llame a una ambulancia'],
      fr: ['J\'ai besoin d\'un médecin', 'C\'est une urgence médicale', 'Appelez une ambulance'],
      en: ['I need a doctor', 'This is a medical emergency', 'Call an ambulance']
    },
    lost: {
      es: ['Estoy perdido/a', 'No encuentro mi camino', 'Necesito ayuda para encontrar'],
      fr: ['Je suis perdu(e)', 'Je ne trouve pas mon chemin', 'J\'ai besoin d\'aide pour trouver'],
      en: ['I\'m lost', 'I can\'t find my way', 'I need help finding']
    },
    safety: {
      es: ['Necesito ayuda', 'Llame a la policía', 'Me siento inseguro/a'],
      fr: ['J\'ai besoin d\'aide', 'Appelez la police', 'Je ne me sens pas en sécurité'],
      en: ['I need help', 'Call the police', 'I feel unsafe']
    }
  };

  const getTargetLanguage = () => {
    if (settings.language === 'es') return 'fr';
    if (settings.language === 'fr') return 'es';
    return 'fr';
  };

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '1rem';
      case 'large': return '1.8rem';
      default: return '1.4rem';
    }
  };

  const getLargeFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '1.4rem';
      case 'large': return '2.5rem';
      default: return '2rem';
    }
  };

  const handleEmergencySelect = (category: string, phrase: string) => {
    setSelectedEmergency(category);
    const targetLang = getTargetLanguage();
    const translated = offlineService.translate(phrase, settings.language, targetLang);
    setTranslatedMessage(translated);
    
    if (settings.vibrationEnabled) {
      verificationService.signalMessageReceived();
    }
    
    startFlashing();
  };

  const startFlashing = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 5000);
  };

  const handleShowCard = (message: string) => {
    const targetLang = getTargetLanguage();
    const translated = offlineService.translate(message, settings.language, targetLang);
    setTranslatedMessage(translated);
    
    if (settings.vibrationEnabled) {
      verificationService.signalMessageReceived();
    }
    
    startFlashing();
  };

  const getEmergencyMessage = (category: string) => {
    const phrases = emergencyPhrases[category as keyof typeof emergencyPhrases];
    if (phrases && phrases[settings.language]) {
      return phrases[settings.language][0];
    }
    return '';
  };

  useEffect(() => {
    if (selectedEmergency) {
      const message = getEmergencyMessage(selectedEmergency);
      if (message) {
        handleEmergencySelect(selectedEmergency, message);
      }
    }
  }, [selectedEmergency]);

  return (
    <div className="emergency-panel">
<div className="emergency-mode">
        <h2>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>emergency</span>
          {settings.language === 'es' ? 'MODO EMERGENCIA' : 
           settings.language === 'fr' ? 'MODE URGENCE' : 
           'EMERGENCY MODE'}
        </h2>
        <p style={{ fontSize: getFontSize() }}>
          {settings.language === 'es' ? 'Tarjetas visuales para comunicación rápida' : 
           settings.language === 'fr' ? 'Cartes visuels pour communication rapide' : 
           'Visual cards for quick communication'}
        </p>
      </div>

      <div className="emergency-categories">
        <h3 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '20px' }}>
          {settings.language === 'es' ? 'Selecciona tipo de emergencia' : 
           settings.language === 'fr' ? 'Sélectionnez le type d\'urgence' : 
           'Select emergency type'}
        </h3>
        
        <div className="category-buttons">
          {emergencyCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedEmergency(category.id)}
              className={`category-btn ${selectedEmergency === category.id ? 'active' : ''}`}
            >
              <div className="category-icon">
                <span className="material-icons">
                  {category.id === 'medical' && 'local_hospital'}
                  {category.id === 'lost' && 'location_disabled'}
                  {category.id === 'safety' && 'shield'}
                </span>
              </div>
              {settings.language === 'es' ? 
                (category.id === 'medical' ? 'Médico' : 
                 category.id === 'lost' ? 'Perdido' : 'Seguridad') :
               settings.language === 'fr' ? 
               (category.id === 'medical' ? 'Médical' : 
                category.id === 'lost' ? 'Perdu' : 'Sécurité') :
               (category.id === 'medical' ? 'Medical' : 
                category.id === 'lost' ? 'Lost' : 'Safety')}
            </button>
          ))}
        </div>
      </div>

      <div className="emergency-categories" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '20px' }}>
          {settings.language === 'es' ? 'Selecciona tipo de emergencia' : 
           settings.language === 'fr' ? 'Sélectionnez le type d\'urgence' : 
           'Select emergency type'}
        </h3>
        
        <div className="category-buttons" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          {emergencyCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedEmergency(category.id)}
              style={{
                background: selectedEmergency === category.id ? category.color : 'white',
                color: selectedEmergency === category.id ? 'white' : category.color,
                border: `2px solid ${category.color}`,
                padding: '20px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: getFontSize(),
                fontWeight: '600',
                minWidth: '120px'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                {category.icon}
              </div>
              {settings.language === 'es' ? 
                (category.id === 'medical' ? 'Médico' : 
                 category.id === 'lost' ? 'Perdido' : 'Seguridad') :
                settings.language === 'fr' ? 
                (category.id === 'medical' ? 'Médical' : 
                 category.id === 'lost' ? 'Perdu' : 'Sécurité') :
                (category.id === 'medical' ? 'Medical' : 
                 category.id === 'lost' ? 'Lost' : 'Safety')
              }
            </button>
          ))}
        </div>
      </div>

      {selectedEmergency && (
        <div className="emergency-phrases">
          <h3 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '20px' }}>
            {settings.language === 'es' ? 'Selecciona mensaje específico' : 
             settings.language === 'fr' ? 'Sélectionnez le message spécifique' : 
             'Select specific message'}
          </h3>
          
          <div className="phrase-buttons">
            {emergencyPhrases[selectedEmergency as keyof typeof emergencyPhrases][settings.language].map((phrase, index) => (
              <button
                key={index}
                onClick={() => handleShowCard(phrase)}
                className="phrase-btn"
              >
                <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: getFontSize() }}>
                  {phrase}
                </div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: getFontSize() }}>
                  {offlineService.translate(phrase, settings.language, getTargetLanguage())}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {translatedMessage && (
        <div className="emergency-display">
          <div className="emergency-message">
            {translatedMessage}
          </div>
          
          <div className="visual-indicators">
            <div className="indicator-circle">
              <span className="material-icons">help</span>
            </div>
            
            <div className="indicator-circle">
              <span className="material-icons">warning</span>
            </div>
          </div>
          
          <div className="emergency-actions">
            <button
              onClick={() => {
                if (settings.vibrationEnabled) {
                  verificationService.confirmMessage('emergency');
                }
              }}
              className="btn btn-secondary btn-lg"
            >
              <span className="material-icons">check</span>
              {settings.language === 'es' ? 'Confirmar Entendido' : 
               settings.language === 'fr' ? 'Confirmer Compris' : 
               'Confirm Understood'}
            </button>
            
            <button
              onClick={() => {
                setTranslatedMessage('');
                setSelectedEmergency('');
                setIsFlashing(false);
              }}
              className="btn btn-ghost"
              style={{ background: 'var(--color-text-muted)', color: 'white' }}
            >
              <span className="material-icons">close</span>
              {settings.language === 'es' ? 'Cerrar' : 
               settings.language === 'fr' ? 'Fermer' : 
               'Close'}
            </button>
          </div>
        </div>
      )}

      <div className="emergency-tips" style={{
        background: '#fff3e0',
        border: '2px solid #ff9800',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ fontSize: getFontSize(), marginBottom: '15px', color: '#ff9800' }}>
          {settings.language === 'es' ? 'Consejos de Emergencia' : 
           settings.language === 'fr' ? 'Conseils d\'Urgence' : 
           'Emergency Tips'}
        </h4>
        
        <ul style={{ fontSize: getFontSize(), paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            {settings.language === 'es' ? 'Muestra esta tarjeta a las autoridades' : 
             settings.language === 'fr' ? 'Montrez cette carte aux autorités' : 
             'Show this card to authorities'}
          </li>
          <li style={{ marginBottom: '10px' }}>
            {settings.language === 'es' ? 'Mantén la calma y señala el mensaje' : 
             settings.language === 'fr' ? 'Restez calme et pointez le message' : 
             'Stay calm and point to the message'}
          </li>
          <li style={{ marginBottom: '10px' }}>
            {settings.language === 'es' ? 'Usa gestos si la verbalización falla' : 
             settings.language === 'fr' ? 'Utilisez des gestes si la verbalisation échoue' : 
             'Use gestures if verbal communication fails'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyPanel;
