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
          
          <div className="language-options">
            <button
              onClick={() => handleLanguageChange('es')}
              className={`btn ${settings.language === 'es' ? 'btn-primary' : 'btn-outline'}`}
            >
              <span className="material-icons" style={{ fontSize: '1.2rem' }}>flag</span>
              Español
            </button>
            
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`btn ${settings.language === 'fr' ? 'btn-primary' : 'btn-outline'}`}
            >
              <span className="material-icons" style={{ fontSize: '1.2rem' }}>flag</span>
              Français
            </button>
            
            <button
              onClick={() => handleLanguageChange('en')}
              className={`btn ${settings.language === 'en' ? 'btn-primary' : 'btn-outline'}`}
            >
              <span className="material-icons" style={{ fontSize: '1.2rem' }}>flag</span>
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
            <div className="setting-item">
              <div className="setting-label">
                <div className="title">
                  <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1.2rem', color: 'var(--color-primary)' }}>volume_up</span>
                  {settings.language === 'es' ? 'Sonido' : 
                   settings.language === 'fr' ? 'Son' : 
                   'Sound'}
                </div>
                <div className="description">
                  {settings.language === 'es' ? 'Activar sonidos de confirmación' : 
                   settings.language === 'fr' ? 'Activer les sons de confirmation' : 
                   'Enable confirmation sounds'}
                </div>
              </div>
              
              <button
                onClick={handleSoundToggle}
                className={`toggle-btn ${settings.soundEnabled ? 'active' : ''}`}
              >
                {settings.soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div className="title">
                  <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1.2rem', color: 'var(--color-primary)' }}>vibration</span>
                  {settings.language === 'es' ? 'Vibración' : 
                   settings.language === 'fr' ? 'Vibration' : 
                   'Vibration'}
                </div>
                <div className="description">
                  {settings.language === 'es' ? 'Activar vibración de confirmación' : 
                   settings.language === 'fr' ? 'Activer la vibration de confirmation' : 
                   'Enable confirmation vibration'}
                </div>
              </div>
              
              <button
                onClick={handleVibrationToggle}
                className={`toggle-btn ${settings.vibrationEnabled ? 'active' : ''}`}
              >
                {settings.vibrationEnabled ? 'ON' : 'OFF'}
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
                  className={`btn ${settings.fontSize === 'small' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1 }}
                >
                  {settings.language === 'es' ? 'Pequeño' : 
                   settings.language === 'fr' ? 'Petit' : 
                   'Small'}
                </button>
                
                <button
                  onClick={() => handleFontSizeChange('medium')}
                  className={`btn ${settings.fontSize === 'medium' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1 }}
                >
                  {settings.language === 'es' ? 'Mediano' : 
                   settings.language === 'fr' ? 'Moyen' : 
                   'Medium'}
                </button>
                
                <button
                  onClick={() => handleFontSizeChange('large')}
                  className={`btn ${settings.fontSize === 'large' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1 }}
                >
                  {settings.language === 'es' ? 'Grande' : 
                   settings.language === 'fr' ? 'Grand' : 
                   'Large'}
                </button>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div className="title">
                  <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1.2rem', color: 'var(--color-secondary)' }}>eco</span>
                  {settings.language === 'es' ? 'Modo Eco' : 
                   settings.language === 'fr' ? 'Mode Éco' : 
                   'Eco Mode'}
                </div>
                <div className="description">
                  {settings.language === 'es' ? 'Ahorra batería y reduce animaciones' : 
                   settings.language === 'fr' ? 'Économise la batterie et réduit les animations' : 
                   'Save battery and reduce animations'}
                </div>
              </div>
              
              <button
                onClick={handleEcoModeToggle}
                className={`toggle-btn ${settings.ecoMode ? 'active' : ''}`}
              >
                {settings.ecoMode ? 'ON' : 'OFF'}
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
            {settings.language === 'es' ? 'API de OpenRouter' : 
             settings.language === 'fr' ? 'API OpenRouter' : 
             'OpenRouter API'}
          </h3>
          
          <div className="api-settings">
            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: getFontSize(), 
                marginBottom: '8px',
                color: '#666'
              }}>
                {settings.language === 'es' ? 'Clave API (sk-or-...)' : 
                 settings.language === 'fr' ? 'Clé API (sk-or-...)' : 
                 'API Key (sk-or-...)'}
              </label>
              <input
                type="password"
                value={settings.openrouterApiKey || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, openrouterApiKey: e.target.value }))}
                placeholder={settings.language === 'es' ? 'Ingresa tu clave API' : 
                             settings.language === 'fr' ? 'Entrez votre clé API' : 
                             'Enter your API key'}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: getFontSize(),
                  fontFamily: 'monospace'
                }}
              />
            </div>
            
            {settings.openrouterApiKey && (
              <button
                onClick={() => setSettings(prev => ({ ...prev, openrouterApiKey: undefined }))}
                className="btn btn-outline"
                style={{ borderColor: '#dc3545', color: '#dc3545' }}
              >
                <span className="material-icons" style={{ fontSize: '1rem' }}>delete</span>
                {settings.language === 'es' ? 'Eliminar API' : 
                 settings.language === 'fr' ? 'Supprimer API' : 
                 'Remove API'}
              </button>
            )}
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

        <div className="reset-section">
          <button
            onClick={() => {
              setSettings({
                language: 'es',
                soundEnabled: true,
                vibrationEnabled: true,
                ecoMode: false,
                fontSize: 'medium',
                themeMode: 'system',
                openrouterApiKey: undefined
              });
            }}
            className="btn btn-warning"
            style={{ background: 'var(--color-warning)', color: 'white' }}
          >
            <span className="material-icons">restart_alt</span>
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
