import React from 'react';
import { AppSettings } from '../types';

interface QuickActionsProps {
  setCurrentView: (view: 'home' | 'translate' | 'emergency' | 'negotiate' | 'settings' | 'map') => void;
  settings: AppSettings;
}

const QuickActions: React.FC<QuickActionsProps> = ({ setCurrentView, settings }) => {
  const quickActions = [
    {
      id: 'emergency',
      icon: 'emergency',
      text: settings.language === 'es' ? 'Ayuda' : settings.language === 'fr' ? 'Aide' : 'Help',
      color: 'emergency',
      action: () => setCurrentView('emergency')
    },
    {
      id: 'translate',
      icon: 'translate',
      text: settings.language === 'es' ? 'Traducir' : settings.language === 'fr' ? 'Traduire' : 'Translate',
      color: 'primary',
      action: () => setCurrentView('translate')
    },
    {
      id: 'map',
      icon: 'map',
      text: settings.language === 'es' ? 'Mapa' : settings.language === 'fr' ? 'Carte' : 'Map',
      color: 'primary',
      action: () => setCurrentView('map')
    },
    {
      id: 'food',
      icon: 'restaurant',
      text: settings.language === 'es' ? 'Comida' : settings.language === 'fr' ? 'Nourriture' : 'Food',
      color: 'primary',
      action: () => setCurrentView('map')
    },
    {
      id: 'football',
      icon: 'sports_soccer',
      text: settings.language === 'es' ? 'Fútbol' : settings.language === 'fr' ? 'Football' : 'Football',
      color: 'primary',
      action: () => setCurrentView('translate')
    },
    {
      id: 'negotiate',
      icon: 'attach_money',
      text: settings.language === 'es' ? 'Negociar' : settings.language === 'fr' ? 'Négocier' : 'Negotiate',
      color: 'primary',
      action: () => setCurrentView('negotiate')
    }
  ];

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '0.9rem';
      case 'large': return '1.4rem';
      default: return '1.2rem';
    }
  };

  const getIconSize = () => {
    switch (settings.fontSize) {
      case 'small': return '2rem';
      case 'large': return '3rem';
      default: return '2.5rem';
    }
  };

  const heroTitle = settings.language === 'es' ? 'Habla Como Local' :
    settings.language === 'fr' ? 'Parle Comme Un Local' :
    'Speak Like A Local';

  return (
    <div className="quick-actions">
      <h2>{heroTitle}</h2>
      
      <div className="main-grid">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className={`quick-action-btn ${action.color}`}
            onClick={action.action}
            style={{ fontSize: getFontSize() }}
          >
            <div className="icon-large" style={{ fontSize: getIconSize() }}>
              <span className="material-icons">{action.icon}</span>
            </div>
            <div className="text-large">{action.text}</div>
          </button>
        ))}
      </div>

      <div className="feature-highlights">
        <h3>
          {settings.language === 'es' ? 'Características Principales' :
           settings.language === 'fr' ? 'Caractéristiques Principales' :
           'Elite Features'}
        </h3>

        <div className="feature-list">
          <div className="feature-item">
            <div className="feature-title">
              <span className="material-icons">wifi_off</span>
              {settings.language === 'es' ? 'Modo Offline' :
               settings.language === 'fr' ? 'Mode Hors Ligne' :
               'Offline Mode'}
            </div>
            <div className="feature-desc">
              {settings.language === 'es' ? 'Funciona sin internet' :
               settings.language === 'fr' ? 'Fonctionne sans internet' :
               'Works without internet'}
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-title">
              <span className="material-icons">vibration</span>
              {settings.language === 'es' ? 'Verificación Instantánea' :
               settings.language === 'fr' ? 'Vérification Instantanée' :
               'Instant Verification'}
            </div>
            <div className="feature-desc">
              {settings.language === 'es' ? 'Confirmación por vibración' :
               settings.language === 'fr' ? 'Confirmation par vibration' :
               'Vibration confirmation'}
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-title">
              <span className="material-icons">chat</span>
              {settings.language === 'es' ? 'Jerga Local' :
               settings.language === 'fr' ? 'Argot Local' :
               'Local Slang'}
            </div>
            <div className="feature-desc">
              {settings.language === 'es' ? 'Traduce expresiones mexicanas' :
               settings.language === 'fr' ? 'Traduit les expressions mexicaines' :
               'Translates Mexican expressions'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
