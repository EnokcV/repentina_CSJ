import React from 'react';
import { AppSettings } from '../types';

interface SettingsPanelProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings }) => {
  
  const handleLanguageChange = (language: 'es' | 'fr' | 'en') => {
    setSettings(prev => ({ ...prev, language }));
  };

  const handleSoundToggle = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleVibrationToggle = () => {
    setSettings(prev => ({ ...prev, vibrationEnabled: !prev.vibrationEnabled }));
  };

  const handleEcoModeToggle = () => {
    setSettings(prev => ({ ...prev, ecoMode: !prev.ecoMode }));
  };

  const handleFontSizeChange = (fontSize: 'small' | 'medium' | 'large') => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '0.9rem';
      case 'large': return '1.4rem';
      default: return '1.1rem';
    }
  };

  const getLargeFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '1.2rem';
      case 'large': return '1.8rem';
      default: return '1.5rem';
    }
  };

  return (
    <div className="settings-panel">
      <h2 style={{ fontSize: getLargeFontSize(), textAlign: 'center', marginBottom: '30px' }}>
        {settings.language === 'es' ? 'Configuración' : 
         settings.language === 'fr' ? 'Paramètres' : 
         'Settings'}
      </h2>

      <div className="settings-sections">
        <div className="setting-section" style={{
          background: 'white',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: getFontSize(), marginBottom: '20px', color: '#2196F3' }}>
            {settings.language === 'es' ? 'Idioma' : 
             settings.language === 'fr' ? 'Langue' : 
             'Language'}
          </h3>
          
          <div className="language-options" style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            gap: '15px'
          }}>
            <button
              onClick={() => handleLanguageChange('es')}
              style={{
                background: settings.language === 'es' ? '#2196F3' : '#f5f5f5',
                color: settings.language === 'es' ? 'white' : '#333',
                border: '2px solid #2196F3',
                padding: '15px 25px',
                borderRadius: '8px',
                fontSize: getFontSize(),
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Español
            </button>
            
            <button
              onClick={() => handleLanguageChange('fr')}
              style={{
                background: settings.language === 'fr' ? '#2196F3' : '#f5f5f5',
                color: settings.language === 'fr' ? 'white' : '#333',
                border: '2px solid #2196F3',
                padding: '15px 25px',
                borderRadius: '8px',
                fontSize: getFontSize(),
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Français
            </button>
            
            <button
              onClick={() => handleLanguageChange('en')}
              style={{
                background: settings.language === 'en' ? '#2196F3' : '#f5f5f5',
                color: settings.language === 'en' ? 'white' : '#333',
                border: '2px solid #2196F3',
                padding: '15px 25px',
                borderRadius: '8px',
                fontSize: getFontSize(),
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              English
            </button>
          </div>
        </div>

        <div className="setting-section" style={{
          background: 'white',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: getFontSize(), marginBottom: '20px', color: '#2196F3' }}>
            {settings.language === 'es' ? 'Notificaciones' : 
             settings.language === 'fr' ? 'Notifications' : 
             'Notifications'}
          </h3>
          
          <div className="notification-settings">
            <div className="setting-item" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div>
                <div style={{ fontSize: getFontSize(), fontWeight: '600', marginBottom: '5px' }}>
                  {settings.language === 'es' ? 'Sonido' : 
                   settings.language === 'fr' ? 'Son' : 
                   'Sound'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {settings.language === 'es' ? 'Activar sonidos de confirmación' : 
                   settings.language === 'fr' ? 'Activer les sons de confirmation' : 
                   'Enable confirmation sounds'}
                </div>
              </div>
              
              <button
                onClick={handleSoundToggle}
                style={{
                  background: settings.soundEnabled ? '#4CAF50' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  minWidth: '60px'
                }}
              >
                {settings.soundEnabled ? 
                 (settings.language === 'es' ? 'ON' : 
                  settings.language === 'fr' ? 'ON' : 'ON') :
                 (settings.language === 'es' ? 'OFF' : 
                  settings.language === 'fr' ? 'OFF' : 'OFF')}
              </button>
            </div>

            <div className="setting-item" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div>
                <div style={{ fontSize: getFontSize(), fontWeight: '600', marginBottom: '5px' }}>
                  {settings.language === 'es' ? 'Vibración' : 
                   settings.language === 'fr' ? 'Vibration' : 
                   'Vibration'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {settings.language === 'es' ? 'Activar vibración de confirmación' : 
                   settings.language === 'fr' ? 'Activer la vibration de confirmation' : 
                   'Enable confirmation vibration'}
                </div>
              </div>
              
              <button
                onClick={handleVibrationToggle}
                style={{
                  background: settings.vibrationEnabled ? '#4CAF50' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  minWidth: '60px'
                }}
              >
                {settings.vibrationEnabled ? 
                 (settings.language === 'es' ? 'ON' : 
                  settings.language === 'fr' ? 'ON' : 'ON') :
                 (settings.language === 'es' ? 'OFF' : 
                  settings.language === 'fr' ? 'OFF' : 'OFF')}
              </button>
            </div>
          </div>
        </div>

        <div className="setting-section" style={{
          background: 'white',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: getFontSize(), marginBottom: '20px', color: '#2196F3' }}>
            {settings.language === 'es' ? 'Apariencia' : 
             settings.language === 'fr' ? 'Apparence' : 
             'Appearance'}
          </h3>
          
          <div className="appearance-settings">
            <div className="setting-item" style={{
              marginBottom: '20px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: getFontSize(), fontWeight: '600', marginBottom: '15px' }}>
                {settings.language === 'es' ? 'Tamaño de Texto' : 
                 settings.language === 'fr' ? 'Taille du Texte' : 
                 'Text Size'}
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleFontSizeChange('small')}
                  style={{
                    background: settings.fontSize === 'small' ? '#2196F3' : '#f5f5f5',
                    color: settings.fontSize === 'small' ? 'white' : '#333',
                    border: '2px solid #2196F3',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: getFontSize(),
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {settings.language === 'es' ? 'Pequeño' : 
                   settings.language === 'fr' ? 'Petit' : 
                   'Small'}
                </button>
                
                <button
                  onClick={() => handleFontSizeChange('medium')}
                  style={{
                    background: settings.fontSize === 'medium' ? '#2196F3' : '#f5f5f5',
                    color: settings.fontSize === 'medium' ? 'white' : '#333',
                    border: '2px solid #2196F3',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: getFontSize(),
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {settings.language === 'es' ? 'Mediano' : 
                   settings.language === 'fr' ? 'Moyen' : 
                   'Medium'}
                </button>
                
                <button
                  onClick={() => handleFontSizeChange('large')}
                  style={{
                    background: settings.fontSize === 'large' ? '#2196F3' : '#f5f5f5',
                    color: settings.fontSize === 'large' ? 'white' : '#333',
                    border: '2px solid #2196F3',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: getFontSize(),
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {settings.language === 'es' ? 'Grande' : 
                   settings.language === 'fr' ? 'Grand' : 
                   'Large'}
                </button>
              </div>
            </div>

            <div className="setting-item" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div>
                <div style={{ fontSize: getFontSize(), fontWeight: '600', marginBottom: '5px' }}>
                  {settings.language === 'es' ? 'Modo Eco' : 
                   settings.language === 'fr' ? 'Mode Éco' : 
                   'Eco Mode'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {settings.language === 'es' ? 'Ahorra batería y reduce animaciones' : 
                   settings.language === 'fr' ? 'Économise la batterie et réduit les animations' : 
                   'Save battery and reduce animations'}
                </div>
              </div>
              
              <button
                onClick={handleEcoModeToggle}
                style={{
                  background: settings.ecoMode ? '#4CAF50' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  minWidth: '60px'
                }}
              >
                {settings.ecoMode ? 
                 (settings.language === 'es' ? 'ON' : 
                  settings.language === 'fr' ? 'ON' : 'ON') :
                 (settings.language === 'es' ? 'OFF' : 
                  settings.language === 'fr' ? 'OFF' : 'OFF')}
              </button>
            </div>
          </div>
        </div>

        <div className="setting-section" style={{
          background: 'white',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: getFontSize(), marginBottom: '20px', color: '#2196F3' }}>
            {settings.language === 'es' ? 'Acerca de' : 
             settings.language === 'fr' ? 'À propos' : 
             'About'}
          </h3>
          
          <div style={{ fontSize: getFontSize(), lineHeight: '1.6' }}>
            <div style={{ marginBottom: '15px' }}>
              <strong>WorldConnect</strong> v1.0
            </div>
            <div style={{ marginBottom: '15px', color: '#666' }}>
              {settings.language === 'es' ? 
               'Traducción instantánea bilingüe para eventos internacionales. Diseñada para funcionar offline en entornos de alta contaminación acústica y saturación de red.' :
               settings.language === 'fr' ? 
               'Traduction instantanée bilingue pour les événements internationaux. Conçue pour fonctionner hors ligne dans des environnements à forte pollution sonore et saturation réseau.' :
               'Instant bilingual translation for international events. Designed to work offline in high-noise and network-saturated environments.'}
            </div>
            <div style={{ color: '#666' }}>
              {settings.language === 'es' ? 
               'Creada para el Mundial 2026 - Conectando personas más allá de las barreras del idioma.' :
               settings.language === 'fr' ? 
               'Créée pour la Coupe du Monde 2026 - Connecter les personnes au-delà des barrières linguistiques.' :
               'Created for World Cup 2026 - Connecting people beyond language barriers.'}
            </div>
          </div>
        </div>

        <div className="reset-section" style={{
          background: '#FFF3E1',
          border: '2px solid #FF9800',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <button
            onClick={() => {
              setSettings({
                language: 'es',
                soundEnabled: true,
                vibrationEnabled: true,
                ecoMode: false,
                fontSize: 'medium'
              });
            }}
            style={{
              background: '#FF9800',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: getFontSize(),
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {settings.language === 'es' ? 'Restablecer Configuración' : 
             settings.language === 'fr' ? 'Réinitialiser les Paramètres' : 
             'Reset Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
