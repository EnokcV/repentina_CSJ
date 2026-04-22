import React, { useState, useEffect } from 'react';
import './styles/global.css';
import QuickActions from './components/QuickActions';
import TranslationPanel from './components/TranslationPanel';
import EmergencyPanel from './components/EmergencyPanel';
import NegotiationPanel from './components/NegotiationPanel';
import SettingsPanel from './components/SettingsPanel';
import MapPanel from './components/MapPanel';
import { AppSettings } from './types';

const navItems = [
  { id: 'home', icon: 'home', labelKey: 'home' },
  { id: 'translate', icon: 'translate', labelKey: 'translate' },
  { id: 'map', icon: 'map', labelKey: 'map' },
  { id: 'emergency', icon: 'warning', labelKey: 'emergency' },
  { id: 'negotiate', icon: 'attach_money', labelKey: 'negotiate' },
  { id: 'settings', icon: 'settings', labelKey: 'settings' },
] as const;

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'translate' | 'map' | 'emergency' | 'negotiate' | 'settings'>('home');
  const [settings, setSettings] = useState<AppSettings>({
    language: 'es',
    soundEnabled: true,
    vibrationEnabled: true,
    ecoMode: false,
    fontSize: 'medium',
    themeMode: 'system'
  });
  const [isSilentMode, setIsSilentMode] = useState(false);

  const getLabel = (key: string) => {
    const labels: Record<string, Record<string, string>> = {
      home: { es: 'Inicio', fr: 'Accueil', en: 'Home' },
      translate: { es: 'Traducir', fr: 'Traduire', en: 'Translate' },
      map: { es: 'Mapa', fr: 'Carte', en: 'Map' },
      emergency: { es: 'Emergencia', fr: 'Urgence', en: 'Emergency' },
      negotiate: { es: 'Negociar', fr: 'Négocier', en: 'Negotiate' },
      settings: { es: 'Ajustes', fr: 'Paramètres', en: 'Settings' },
    };
    return labels[key]?.[settings.language] || key;
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('worldconnect_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const checkNoiseLevel = () => {
      const simulatedNoise = Math.random() > 0.7;
      setIsSilentMode(simulatedNoise);
    };

    const interval = setInterval(checkNoiseLevel, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('worldconnect_settings', JSON.stringify(settings));
    document.body.className = settings.ecoMode ? 'eco-mode' : '';
    
    const applyTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = settings.themeMode === 'dark' || 
        (settings.themeMode === 'system' && prefersDark);
      document.documentElement.classList.toggle('dark', isDark);
    };
    applyTheme();
  }, [settings]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'translate':
        return <TranslationPanel settings={settings} />;
      case 'map':
        return <MapPanel settings={settings} />;
      case 'emergency':
        return <EmergencyPanel settings={settings} />;
      case 'negotiate':
        return <NegotiationPanel settings={settings} />;
      case 'settings':
        return <SettingsPanel settings={settings} setSettings={setSettings} />;
      default:
        return <QuickActions setCurrentView={setCurrentView} settings={settings} />;
    }
  };

  return (
    <div className={`app ${settings.ecoMode ? 'eco-mode' : ''}`}>
      {isSilentMode && (
        <div className="silent-mode-indicator">
          <span className="material-icons">volume_off</span>
          {settings.language === 'es' ? 'Modo Silencioso' : 
           settings.language === 'fr' ? 'Mode Silencieux' : 'Silent Mode'}
        </div>
      )}
      
      <header className="header">
        <h1>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>sports_soccer</span>
          WorldConnect
        </h1>
        <p>Traducción instantánea para el Mundial</p>
      </header>

      <main className="container">
        {renderCurrentView()}
      </main>

      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button 
            key={item.id}
            className={`nav-btn ${currentView === item.id ? 'active' : ''}`}
            onClick={() => setCurrentView(item.id as typeof currentView)}
          >
            <span className="material-icons">{item.icon}</span>
            <span className="nav-label">{getLabel(item.labelKey)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
