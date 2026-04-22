# 📚 Guía de Desarrollo - WorldConnect

Documentación técnica para desarrolladores que trabajan en el proyecto WorldConnect.

## 📋 Tabla de Contenidos

1. [Arquitectura](#arquitectura)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Componentes](#componentes)
4. [Servicios](#servicios)
5. [Tipos TypeScript](#tipos-typescript)
6. [Estilos](#estilos)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Debugging](#debugging)
9. [Performance](#performance)
10. [Seguridad](#seguridad)

## 🏗️ Arquitectura

WorldConnect utiliza una arquitectura basada en componentes React con servicios reutilizables:

```
┌─────────────────────────────────────┐
│          React Components           │
│  (UI Layer - EmergencyPanel, etc)  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Services Layer              │
│  (OfflineService, VerificationSvc) │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Data & Storage               │
│  (localStorage, translations.json)  │
└─────────────────────────────────────┘
```

### Principios de Diseño

- **Offline First**: Todo funciona sin conexión a internet
- **Accessibility First**: Soporte para diferentes capacidades de dispositivo
- **Modularity**: Componentes independientes y reutilizables
- **Type Safety**: TypeScript para seguridad de tipos
- **Responsive**: Funciona en cualquier tamaño de pantalla

## 📁 Estructura de Carpetas

```
src/
├── components/              # Componentes React
│   ├── EmergencyPanel.tsx   # Panel de emergencias
│   ├── NegotiationPanel.tsx # Panel de negociación
│   ├── QuickActions.tsx     # Panel principal
│   ├── SettingsPanel.tsx    # Configuración
│   └── TranslationPanel.tsx # Traductor
├── services/                # Lógica reutilizable
│   ├── offlineService.ts    # Gestión de traducciones
│   └── verificationService.ts # Confirmaciones haptic/audio
├── data/                    # Datos estáticos
│   └── translations.json    # Diccionarios
├── types/                   # Interfaces TypeScript
│   └── index.ts
├── styles/                  # Estilos CSS
│   └── global.css
├── constants.ts             # Constantes globales
├── utils.ts                 # Funciones utilidad
├── App.tsx                  # Componente raíz
└── index.tsx               # Punto de entrada
```

## 🎨 Componentes

### Estructura de Componente

Cada componente debe seguir este patrón:

```typescript
import React, { useState } from 'react';
import { AppSettings } from '../types';

interface ComponentProps {
  settings: AppSettings;
  // otros props
}

const MyComponent: React.FC<ComponentProps> = ({ settings }) => {
  const [state, setState] = useState<StateType>('initial');

  // Métodos auxiliares
  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '0.9rem';
      case 'large': return '1.4rem';
      default: return '1.1rem';
    }
  };

  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### Props Pattern

- Pasar `settings` a todos los componentes
- Respetar preferencias de usuario (idioma, tamaño fuente, modo eco)
- Usar `settings.language` para multiidioma
- Usar `settings.fontSize` para accesibilidad

### Hooks Permitidos

- ✅ `useState` - Estado local
- ✅ `useEffect` - Efectos secundarios
- ✅ `useCallback` - Optimización de callbacks
- ✅ `useMemo` - Optimización de cálculos
- ❌ Hooks personalizados (mantener simple)

## 🔧 Servicios

### OfflineService

```typescript
// Traducir texto
const translated = offlineService.translate(text, 'es', 'fr');

// Buscar traducciones
const results = offlineService.searchTranslations(query, 'es');

// Obtener frases rápidas
const phrases = offlineService.getQuickPhrases('emergency');

// Verificar estado
const isReady = offlineService.isDataLoaded();
```

**Validación incluida:**
- Valida entrada antes de procesar
- Maneja errores gracefully
- Retorna valores por defecto seguros

### VerificationService

```typescript
// Señalar recepción de mensaje
await verificationService.signalMessageReceived();

// Confirmar comprensión
await verificationService.confirmMessage();

// Verificar soporte
const supported = verificationService.isVibrationSupported();
```

**Características:**
- Detección automática de capacidades
- Fallback a alternativas si falla
- Manejo de AudioContext con resume automático

## 📘 Tipos TypeScript

Localización: `src/types/index.ts`

```typescript
export interface AppSettings {
  language: 'es' | 'fr' | 'en';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  ecoMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

export interface Message {
  id: string;
  text: string;
  translated: string;
  timestamp: Date;
  from: 'user' | 'other';
  verified: boolean;
}

export interface TranslationsData {
  emergency: Translation;
  transportation: Translation;
  // ...
}
```

**Reglas:**
- Usar tipos específicos (no `any`)
- Documentar tipos complejos
- Exportar desde `types/index.ts`
- Usar interfaces para objetos complejos

## 🎨 Estilos

Localización: `src/styles/global.css`

### Sistema de Colores

```css
:root {
  --primary-color: #2196F3;
  --secondary-color: #4CAF50;
  --danger-color: #F44336;
  --warning-color: #FF9800;
}
```

### Responsive Design

```css
@media (max-width: 768px) {
  /* Tablet */
}

@media (max-width: 480px) {
  /* Mobile */
}
```

### Accesibilidad

```css
/* Focus visible para navegación por teclado */
button:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Respeto por preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## ✅ Mejores Prácticas

### 1. Manejo de Errores

```typescript
try {
  const result = await someAsyncOperation();
} catch (error) {
  console.error('Clear error message:', error);
  return fallbackValue;
}
```

### 2. Validación de Entrada

```typescript
if (!text || typeof text !== 'string') {
  console.warn('Invalid input');
  return defaultValue;
}
```

### 3. Optimización

```typescript
// Memoizar cálculos costosos
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Memoizar callbacks
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 4. Idioma

```typescript
// Siempre usar settings.language
const text = settings.language === 'es' ? 'Texto en español' :
             settings.language === 'fr' ? 'Texte en français' :
             'English text';
```

### 5. localStorage

```typescript
// Validar antes de usar
const saved = localStorage.getItem('key');
if (saved) {
  try {
    const data = JSON.parse(saved);
    // usar data
  } catch (e) {
    console.error('Invalid stored data');
  }
}
```

## 🐛 Debugging

### Consola del Navegador

```javascript
// Ver traducciones cargadas
console.log(offlineService.isDataLoaded());

// Ver settings actuales
console.log(localStorage.getItem('worldconnect_settings'));

// Verificar soporte de APIs
console.log({
  vibration: 'vibrate' in navigator,
  audio: !!window.AudioContext,
  localStorage: typeof localStorage !== 'undefined'
});
```

### React DevTools

Instalar extensión de React DevTools para inspeccionar:
- Props de componentes
- Estado local
- Re-renders innecesarios

### Network Tab

Verificar que `translations.json` se carga correctamente desde `/data/`

## ⚡ Performance

### Optimizaciones Implementadas

1. **Lazy Loading de Componentes** (futuro)
   ```typescript
   const EmergencyPanel = lazy(() => import('./components/EmergencyPanel'));
   ```

2. **Memoización** (en componentes complejos)
   ```typescript
   export default React.memo(MyComponent);
   ```

3. **CSS Inline Cuidadoso**
   - Usar en lugar de generar clases dinámicas
   - Evitar crear objetos nuevos en cada render

4. **Búsqueda Optimizada**
   - Búsqueda mínima 2 caracteres
   - Resultados limitados

### Métricas a Monitorear

```javascript
// Performance API
performance.mark('operation-start');
// operación
performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');
```

## 🔒 Seguridad

### Protecciones Implementadas

1. **No enviar datos a servidores**
   - Todo se procesa localmente
   - localStorage es lectura/escritura local

2. **Validación de entrada**
   - Validar antes de procesar
   - Sanitizar búsquedas

3. **Manejo de errores seguro**
   - No exponer detalles internos
   - Mensajes de error amigables

### No Permitido

- ❌ APIs externas (mantener offline)
- ❌ `eval()` o ejecución dinámica
- ❌ `innerHTML` sin sanitizar
- ❌ Contraseñas o datos sensibles en localStorage

## 📝 Convenciones de Código

### Nombres

```typescript
// Componentes PascalCase
const MyComponent = () => {};

// Funciones camelCase
const handleClick = () => {};
const getFontSize = () => {};

// Constantes UPPER_CASE
const MAX_PRICE = 1000;
const VIBRATION_PATTERN = [100, 50, 100];
```

### Comentarios

```typescript
// ✅ Comentarios útiles
// Esperar a que el contexto de audio se reanude
await audioContext.resume();

// ❌ Comentarios obvios
// Establecer estado en true
setState(true);
```

## 📦 Nuevas Características

### Checklist para Agregar Funcionalidad

- [ ] Crear componente con tipado completo
- [ ] Agregar props a `AppSettings` si necesario
- [ ] Implementar multiidioma
- [ ] Respetar tamaño de fuente
- [ ] Respetar modo eco
- [ ] Agregar validación de entrada
- [ ] Agregar manejo de errores
- [ ] Documentar en este archivo
- [ ] Agregar tests
- [ ] Actualizar README.md

---

**Última actualización:** Abril 2026  
**Versión:** 1.0.0  
**Mantenedor:** Equipo WorldConnect
