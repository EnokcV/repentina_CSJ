import React, { useState } from 'react';
import verificationService from '../services/verificationService';
import { AppSettings } from '../types';

interface EmergencyPanelProps {
  settings: AppSettings;
}

const EmergencyPanel: React.FC<EmergencyPanelProps> = ({ settings }) => {
  const [selectedEmergency, setSelectedEmergency] = useState<string>('');
  const [translatedMessage, setTranslatedMessage] = useState<string>('');

  const emergencyCategories = [
    {
      id: 'medical',
      icon: 'local_hospital',
      color: '#f44336',
      bgColor: 'rgba(244, 67, 54, 0.1)'
    },
    {
      id: 'lost',
      icon: 'location_disabled',
      color: '#ff9800',
      bgColor: 'rgba(255, 152, 0, 0.1)'
    },
    {
      id: 'safety',
      icon: 'shield',
      color: '#4caf50',
      bgColor: 'rgba(76, 175, 80, 0.1)'
    }
  ];

  const emergencyPhrases: Record<string, Record<'es' | 'fr', string[]>> = {
    medical: {
      es: ['Necesito un médico', 'Es una emergencia médica', 'Llame a una ambulancia'],
      fr: ['J\'ai besoin d\'un médecin', 'C\'est une urgence médicale', 'Appelez une ambulance']
    },
    lost: {
      es: ['Estoy perdido/a', 'No encuentro mi camino', 'Necesito ayuda para encontrar'],
      fr: ['Je suis perdu(e)', 'Je ne trouve pas mon chemin', 'J\'ai besoin d\'aide pour trouver']
    },
    safety: {
      es: ['Necesito ayuda', 'Llame a la policía', 'Me siento inseguro/a'],
      fr: ['J\'ai besoin d\'aide', 'Appelez la police', 'Je ne me sens pas en sécurité']
    }
  };

  type EmergencyLang = 'es' | 'fr';

  const getCurrentLang = (): EmergencyLang => {
    return settings.language === 'es' ? 'es' : 'fr';
  };

  const getTargetLang = (): EmergencyLang => {
    return settings.language === 'es' ? 'fr' : 'es';
  };

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '1rem';
      case 'large': return '1.8rem';
      default: return '1.4rem';
    }
  };

  const handleShowCard = (phrase: string, targetPhrase: string) => {
    setTranslatedMessage(targetPhrase);
    
    if (settings.vibrationEnabled) {
      verificationService.signalMessageReceived();
    }
  };

  const getCategoryLabel = (categoryId: string) => {
    const labels: Record<string, Record<'es' | 'fr', string>> = {
      medical: { es: 'Médico', fr: 'Médical' },
      lost: { es: 'Perdido', fr: 'Perdu' },
      safety: { es: 'Seguridad', fr: 'Sécurité' }
    };
    return labels[categoryId]?.[getCurrentLang()] || categoryId;
  };

  const getLabel = (key: string) => {
    const labels: Record<string, Record<'es' | 'fr', string>> = {
      title: { es: 'MODO EMERGENCIA', fr: 'MODE URGENCE' },
      subtitle: { es: 'Tarjetas visuales para comunicación rápida', fr: 'Cartes visuels pour communication rapide' },
      selectType: { es: 'Selecciona tipo de emergencia', fr: 'Sélectionnez le type d\'urgence' },
      selectMessage: { es: 'Selecciona mensaje específico', fr: 'Sélectionnez le message spécifique' },
      confirm: { es: 'Confirmar Entendido', fr: 'Confirmer Compris' },
      close: { es: 'Cerrar', fr: 'Fermer' },
      tipsTitle: { es: 'Consejos de Emergencia', fr: 'Conseils d\'Urgence' },
      tip1: { es: 'Muestra esta tarjeta a las autoridades', fr: 'Montrez cette carte aux autorités' },
      tip2: { es: 'Mantén la calma y señala el mensaje', fr: 'Restez calme et pointez le message' },
      tip3: { es: 'Usa gestos si la verbalización falla', fr: 'Utilisez des gestes si la verbalisation échoue' },
      showCard: { es: 'MOSTRAR TARJETA', fr: 'AFFICHER LA CARTE' }
    };
    return labels[key]?.[getCurrentLang()] || key;
  };

  return (
    <div className="emergency-panel">
      <div className="emergency-mode">
        <h2>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>emergency</span>
          {getLabel('title')}
        </h2>
        <p style={{ fontSize: getFontSize(), opacity: 0.9 }}>
          {getLabel('subtitle')}
        </p>
      </div>

      <div className="emergency-categories" style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '20px', color: 'var(--color-text-secondary)' }}>
          {getLabel('selectType')}
        </h3>
        
        <div className="category-buttons" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px'
        }}>
          {emergencyCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedEmergency(category.id)}
              className={`category-btn ${selectedEmergency === category.id ? 'active' : ''}`}
              style={{
                borderLeft: `8px solid ${category.color}`,
                background: selectedEmergency === category.id ? category.bgColor : 'var(--surface-container-lowest)'
              }}
            >
              <div 
                className="category-icon" 
                style={{ background: category.bgColor, color: category.color }}
              >
                <span className="material-icons">{category.icon}</span>
              </div>
              <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                {getCategoryLabel(category.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedEmergency && (
        <div className="emergency-phrases" style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '20px', color: 'var(--color-text-secondary)' }}>
            {getLabel('selectMessage')}
          </h3>
          
          <div className="phrase-buttons" style={{ gap: '16px' }}>
            {emergencyPhrases[selectedEmergency]?.[getCurrentLang()]?.map((phrase, index) => {
              const targetPhrase = emergencyPhrases[selectedEmergency]?.[getTargetLang()]?.[index] || '';
              return (
                <button
                  key={index}
                  onClick={() => handleShowCard(phrase, targetPhrase)}
                  className="phrase-btn"
                  style={{
                    padding: '24px',
                    background: 'var(--surface-container-lowest)',
                    borderRadius: 'var(--radius-default)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ 
                    fontWeight: '700', 
                    fontSize: getFontSize(), 
                    marginBottom: '16px',
                    color: 'var(--color-text)'
                  }}>
                    {phrase}
                  </div>
                  <div style={{ 
                    color: 'var(--color-text-secondary)', 
                    fontSize: getFontSize(),
                    padding: '12px',
                    background: 'var(--surface-container-high)',
                    borderRadius: '8px',
                    fontStyle: 'italic'
                  }}>
                    {targetPhrase}
                  </div>
                  <div style={{
                    marginTop: '16px',
                    padding: '8px 16px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    display: 'inline-block'
                  }}>
                    {getLabel('showCard')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {translatedMessage && (
        <div className="emergency-display" style={{ marginBottom: '32px' }}>
          <div className="emergency-message" style={{ fontSize: '2.5rem', fontWeight: '800' }}>
            {translatedMessage}
          </div>
          
          <div className="visual-indicators" style={{ display: 'flex', gap: '16px', margin: '24px 0' }}>
            <div className="indicator-circle" style={{ 
              background: 'rgba(255,255,255,0.2)',
              animation: 'indicatorPulse 1.5s ease-in-out infinite'
            }}>
              <span className="material-icons">help</span>
            </div>
            <div className="indicator-circle" style={{ 
              background: 'rgba(255,255,255,0.15)',
              animation: 'indicatorPulse 1.5s ease-in-out infinite 0.5s'
            }}>
              <span className="material-icons">warning</span>
            </div>
          </div>
          
          <div className="emergency-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                if (settings.vibrationEnabled) {
                  verificationService.confirmMessage('emergency');
                }
                setTranslatedMessage('');
              }}
              className="btn btn-secondary btn-lg"
            >
              <span className="material-icons">check</span>
              {getLabel('confirm')}
            </button>
            
            <button
              onClick={() => {
                setTranslatedMessage('');
                setSelectedEmergency('');
              }}
              className="btn btn-ghost"
            >
              <span className="material-icons">close</span>
              {getLabel('close')}
            </button>
          </div>
        </div>
      )}

      <div className="emergency-tips-container">
        <h4 style={{ 
          fontSize: getFontSize(), 
          marginBottom: '16px', 
          color: 'var(--on-surface)',
          fontWeight: '800',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span className="material-icons" style={{ color: '#ff9800' }}>lightbulb</span>
          {getLabel('tipsTitle')}
        </h4>
        
        <div className="tips-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          <div className="tip-card">
            <div className="tip-number">1</div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text)' }}>
              {getLabel('tip1')}
            </p>
          </div>

          <div className="tip-card">
            <div className="tip-number">2</div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text)' }}>
              {getLabel('tip2')}
            </p>
          </div>

          <div className="tip-card">
            <div className="tip-number">3</div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text)' }}>
              {getLabel('tip3')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;