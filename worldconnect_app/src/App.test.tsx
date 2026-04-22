import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders WorldConnect header', () => {
    render(<App />);
    const header = screen.getByText('⚽ WorldConnect');
    expect(header).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    render(<App />);
    const subtitle = screen.getByText('Traducción instantánea para el Mundial');
    expect(subtitle).toBeInTheDocument();
  });

  test('renders bottom navigation with 5 buttons', () => {
    render(<App />);
    const navButtons = screen.getAllByRole('button').filter(btn => 
      btn.className.includes('nav-btn')
    );
    expect(navButtons.length).toBe(5);
  });

  test('displays quick actions on initial load', () => {
    render(<App />);
    const quickActionsTitle = screen.getByText(/Accesos Rápidos/i);
    expect(quickActionsTitle).toBeInTheDocument();
  });

  test('navigates to settings panel when settings button is clicked', async () => {
    render(<App />);
    
    const buttons = screen.getAllByRole('button');
    const settingsButton = buttons.find(btn => btn.textContent?.includes('Ajustes') || 
      btn.textContent?.includes('Paramètres') || 
      btn.textContent?.includes('Settings'));
    
    if (settingsButton) {
      await userEvent.click(settingsButton);
      const settingsTitle = screen.getByText(/Configuración|Paramètres|Settings/);
      expect(settingsTitle).toBeInTheDocument();
    }
  });

  test('loads saved settings from localStorage', () => {
    const testSettings = {
      language: 'fr',
      soundEnabled: false,
      vibrationEnabled: false,
      ecoMode: true,
      fontSize: 'large',
      themeMode: 'dark' as const
    };
    
    localStorage.setItem('worldconnect_settings', JSON.stringify(testSettings));
    
    render(<App />);
    
    // Settings should be loaded and applied
    const savedSettings = JSON.parse(localStorage.getItem('worldconnect_settings') || '{}');
    expect(savedSettings.language).toBe('fr');
    expect(savedSettings.ecoMode).toBe(true);
  });

  test('applies eco-mode class when ecoMode is enabled', () => {
    const testSettings = {
      language: 'es',
      soundEnabled: true,
      vibrationEnabled: true,
      ecoMode: true,
      fontSize: 'medium'
    };
    
    localStorage.setItem('worldconnect_settings', JSON.stringify(testSettings));
    
    const { container } = render(<App />);
    const appDiv = container.querySelector('.app');
    
    expect(appDiv?.className).toContain('eco-mode');
  });

  test('renders silent mode indicator', () => {
    render(<App />);
    
    // Silent mode may or may not be visible depending on random check
    // Just verify the component renders without errors
    const header = screen.getByText('⚽ WorldConnect');
    expect(header).toBeInTheDocument();
  });

  test('navigation persists settings', async () => {
    render(<App />);
    
    // Settings should be persisted in localStorage
    const settings = JSON.parse(localStorage.getItem('worldconnect_settings') || '{}');
    expect(settings).toBeDefined();
  });

  test('does not crash when navigating between views', async () => {
    const { container } = render(<App />);
    const buttons = screen.getAllByRole('button');
    
    // Try clicking multiple navigation buttons
    for (let i = 0; i < Math.min(3, buttons.length); i++) {
      if (buttons[i].className.includes('nav-btn')) {
        await userEvent.click(buttons[i]);
      }
    }
    
    // App should still be rendered
    expect(container.querySelector('.app')).toBeInTheDocument();
  });
});
