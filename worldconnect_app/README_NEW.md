# ⚽ WorldConnect - Traductor Instantáneo para el Mundial 2026

Una aplicación React de traducción multiidioma para eventos internacionales, diseñada para funcionar **100% offline** en entornos con alta contaminación acústica y saturación de red.

## 🎯 Características Principales

- **Traducción Trilingüe**: Español, Francés e Inglés
- **Modo Offline Completo**: Funciona sin conexión a internet
- **Panel de Emergencias**: Comunicación visual rápida para situaciones de crisis
- **Panel de Negociación**: Herramienta inteligente para acuerdos de precio
- **Vibraciones Haptic**: Confirmación mediante vibración (dispositivos compatibles)
- **Modo Eco**: Reduce animaciones y ahorra batería
- **Personalización**: Tamaño de fuente ajustable y opciones de sonido
- **Almacenamiento Local**: Persistencia de configuración sin servidor

## 🚀 Inicio Rápido

### Requisitos
- Node.js 14+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd worldconnect_app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia el servidor en modo desarrollo

# Testing
npm test              # Ejecuta tests en modo watch

# Producción
npm run build         # Crea build optimizado para producción
npm run eject         # Ejecta configuración (operación irreversible)
```

## 📁 Estructura del Proyecto

```
worldconnect_app/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes React
│   │   ├── EmergencyPanel.tsx      # Modo emergencias
│   │   ├── NegotiationPanel.tsx    # Negociador de precios
│   │   ├── QuickActions.tsx        # Panel de acceso rápido
│   │   ├── SettingsPanel.tsx       # Configuración
│   │   └── TranslationPanel.tsx    # Traductor
│   ├── services/          # Servicios
│   │   ├── offlineService.ts       # Gestión de traducciones
│   │   └── verificationService.ts  # Confirmaciones haptic/visual/audio
│   ├── data/              # Datos estáticos
│   │   └── translations.json       # Diccionarios multiidioma
│   ├── styles/            # Estilos CSS
│   │   └── global.css     # Estilos globales
│   ├── types/             # TypeScript types
│   │   └── index.ts       # Interfaces globales
│   ├── App.tsx            # Componente principal
│   └── index.tsx          # Punto de entrada
└── package.json           # Dependencias del proyecto
```

## 🎨 Componentes

### EmergencyPanel
Panel dedicado a situaciones de emergencia con:
- 3 categorías: Médica, Pérdida, Seguridad
- Mensajes pre-traducidos
- Visualización con pulsación
- Indicadores visuales de emergencia

### NegotiationPanel
Herramienta para negociación de precios:
- 5 artículos predefinidos (Taxi, Comida, Recuerdo, Tour, Hotel)
- Controles de ajuste de precio
- Rango sugerido automático
- Estados de acuerdo (Pendiente, Aceptado, Rechazado)

### TranslationPanel
Traductor flexible:
- Búsqueda en tiempo real
- Frases rápidas predefinidas
- Intercambio de idiomas (swap)
- Verificación de comprensión

### SettingsPanel
Configuración personalizable:
- Selección de idioma (ES/FR/EN)
- Control de sonido y vibración
- Ajuste de tamaño de fuente
- Modo eco para ahorro de batería
- Información sobre la aplicación

### QuickActions
Panel de inicio con acceso rápido a todas las funciones

## 🔧 Servicios

### OfflineService
- Carga traducciones desde JSON
- Búsqueda de traducciones por palabra clave
- Gestión de frases rápidas
- Sin dependencias de API externas

### VerificationService
- Vibraciones haptic (multipatrón)
- Señales visuales (círculos pulsantes)
- Sonidos de confirmación (Web Audio API)
- Detección automática de capacidades del dispositivo

## 🌍 Idiomas Soportados

- **Español (ES)** - Español de México
- **Francés (FR)** - Francés estándar
- **Inglés (EN)** - Inglés internacional

Categorías de traducción:
- 🚨 Emergencias
- 🚗 Transporte
- 🍽️ Comida y alergias
- ⚽ Jerga de fútbol
- 💬 Expresiones locales
- 💰 Negociación
- 👥 Interacción social

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Dispositivos**: Desktop, tablet, móvil
- **APIs Requeridas**: 
  - localStorage (configuración)
  - Vibration API (haptic feedback - opcional)
  - Web Audio API (sonidos - opcional)

## 🎛️ Configuración Local

La aplicación guarda la configuración en localStorage bajo la clave `worldconnect_settings`:

```json
{
  "language": "es",
  "soundEnabled": true,
  "vibrationEnabled": true,
  "ecoMode": false,
  "fontSize": "medium"
}
```

## 🔒 Privacidad y Seguridad

- ✅ Funciona 100% offline - No requiere conexión a internet
- ✅ Sin envío de datos - Todo se procesa localmente
- ✅ Sin cookies de tracking - Solo almacenamiento local de configuración
- ✅ Código abierto - Reviable y auditable

## 🐛 Solución de Problemas

### Las vibraciones no funcionan
- Verifica que la API de vibración esté habilitada en tu dispositivo
- Algunos navegadores pueden requerir permiso del usuario
- En escritorio, la vibración no funcionará (comportamiento esperado)

### El sonido no se reproduce
- Asegúrate que el sonido esté habilitado en Configuración
- Verifica el volumen del dispositivo
- Algunos navegadores requieren interacción del usuario antes de reproducir audio

### Las traducciones no aparecen
- Verifica que el archivo `translations.json` esté en la carpeta `public/data/`
- Abre la consola (F12) para ver errores
- Recarga la página (Ctrl+F5 para limpiar cache)

## 📝 Desarrollo

### Agregar nuevas traducciones

1. Edita `src/data/translations.json`
2. Sigue el formato:
```json
"category": {
  "key": {
    "es": "Texto en español",
    "fr": "Texte en français",
    "en": "English text"
  }
}
```

### Crear nuevo componente

1. Crea archivo en `src/components/NuevoComponent.tsx`
2. Importa tipos desde `src/types`
3. Usa el prop `settings` para respetar preferencias del usuario
4. Incluye soporte para `fontSize` y `language`

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
# Sube la carpeta 'build'
```

### GitHub Pages
```bash
npm run build
# Configurar repositorio para servir desde 'build' branch
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY build ./build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
```

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

## 🎓 Aprendizaje

Tecnologías utilizadas:
- **React 19** - UI Framework
- **TypeScript 4.9** - Type safety
- **CSS3** - Estilos responsive
- **Web APIs** - Vibration, Audio Context, localStorage

---

**Creada para el Mundial 2026 🏆**  
*Conectando personas más allá de las barreras del idioma*
