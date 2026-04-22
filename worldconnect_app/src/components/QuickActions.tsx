import React from 'react';
import { AppSettings } from '../types';

interface QuickActionsProps {
  setCurrentView: (view: 'home' | 'translate' | 'emergency' | 'negotiate' | 'settings') => void;
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
      id: 'transport',
      icon: 'directions_car',
      text: settings.language === 'es' ? 'Transporte' : settings.language === 'fr' ? 'Transport' : 'Transport',
      color: 'primary',
      action: () => setCurrentView('translate')
    },
    {
      id: 'food',
      icon: 'restaurant',
      text: settings.language === 'es' ? 'Comida' : settings.language === 'fr' ? 'Nourriture' : 'Food',
      color: 'primary',
      action: () => setCurrentView('translate')
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

  return (
    <div className="quick-actions">
      <h2 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '20px', fontWeight: '700', color: 'var(--color-text)' }}>
        {settings.language === 'es' ? 'Accesos Rápidos' : 
         settings.language === 'fr' ? 'Accès Rapides' : 
         'Quick Actions'}
      </h2>
      
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

      <div className="feature-highlights" style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '15px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>
          {settings.language === 'es' ? 'Características Principales' : 
           settings.language === 'fr' ? 'Caractéristiques Principales' : 
           'Key Features'}
        </h3>
        
        <div className="feature-list">
          <div className="feature-item" style={{ 
            background: 'var(--color-surface)', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '10px' 
          }}>
            <div style={{ fontWeight: '600', marginBottom: '5px', fontSize: getFontSize() }}>
              <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1.2rem' }}>wifi_off</span>
              {settings.language === 'es' ? 'Modo Offline' : 
               settings.language === 'fr' ? 'Mode Hors Ligne' : 
               'Offline Mode'}
            </div>
            <div style={{ fontSize: getFontSize(), color: 'var(--color-text-secondary)' }}>
              {settings.language === 'es' ? 'Funciona sin internet' : 
               settings.language === 'fr' ? 'Fonctionne sans internet' : 
               'Works without internet'}
            </div>
          </div>
          
          <div className="feature-item" style={{ 
            background: 'var(--color-surface)', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '10px' 
          }}>
            <div style={{ fontWeight: '600', marginBottom: '5px', fontSize: getFontSize() }}>
              <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1.2rem' }}>vibration</span>
              {settings.language === 'es' ? 'Verificación Instantánea' : 
               settings.language === 'fr' ? 'Vérification Instantanée' : 
               'Instant Verification'}
            </div>
            <div style={{ fontSize: getFontSize(), color: 'var(--color-text-secondary)' }}>
              {settings.language === 'es' ? 'Confirmación por vibración' : 
               settings.language === 'fr' ? 'Confirmation par vibration' : 
               'Vibration confirmation'}
            </div>
          </div>
          
          <div className="feature-item" style={{ 
            background: 'var(--color-surface)', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '10px' 
          }}>
            <div style={{ fontWeight: '600', marginBottom: '5px', fontSize: getFontSize() }}>
              <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1.2rem' }}>chat</span>
              {settings.language === 'es' ? 'Jerga Local' : 
               settings.language === 'fr' ? 'Argot Local' : 
               'Local Slang'}
            </div>
            <div style={{ fontSize: getFontSize(), color: 'var(--color-text-secondary)' }}>
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
