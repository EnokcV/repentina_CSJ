// Tipos
interface AudioRecognitionOptions {
  language: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  onResult?: (text: string, isFinal: boolean) => void;
}

interface AudioSynthesisOptions {
  language: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

// Web Speech API types
declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
    webkitSpeechSynthesisUtterance?: any;
    SpeechSynthesisUtterance?: any;
  }
}

class AudioService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private isListening: boolean = false;
  private isSpeaking: boolean = false;

  constructor() {
    this.initializeAudioAPIs();
  }

  /**
   * Inicializar APIs de audio disponibles
   */
  private initializeAudioAPIs(): void {
    try {
      // Inicializar reconocimiento de voz
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
      }

      // Inicializar síntesis de voz
      this.synthesis = window.speechSynthesis;
    } catch (error) {
      console.warn('Audio APIs not available:', error);
    }
  }

  /**
   * Verificar si el navegador soporta reconocimiento de voz
   */
  supportsRecognition(): boolean {
    return !!this.recognition;
  }

  /**
   * Verificar si el navegador soporta síntesis de voz
   */
  supportsSynthesis(): boolean {
    return !!this.synthesis;
  }

  /**
   * Iniciar grabación de audio
   */
  startListening(options: AudioRecognitionOptions): void {
    if (!this.recognition) {
      options.onError?.('Speech Recognition not supported in this browser');
      return;
    }

    if (this.isListening) {
      return;
    }

    try {
      this.recognition.language = options.language || 'es-ES';
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      // Manejadores de eventos
      this.recognition.onstart = () => {
        this.isListening = true;
        options.onStart?.();
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        const isFinal = finalTranscript.length > 0;
        const result = finalTranscript || interimTranscript;

        options.onResult?.(result.trim(), isFinal);
      };

      this.recognition.onerror = (event: any) => {
        const errorMessage = event.error || 'Unknown error';
        options.onError?.(errorMessage);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        options.onEnd?.();
      };

      this.recognition.start();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error starting recognition';
      options.onError?.(errorMsg);
    }
  }

  /**
   * Detener grabación de audio
   */
  stopListening(): void {
    if (!this.recognition || !this.isListening) {
      return;
    }

    try {
      this.recognition.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
  }

  /**
   * Reproducir texto con síntesis de voz
   */
  speak(text: string, options: AudioSynthesisOptions = { language: 'es' }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech Synthesis not supported'));
        return;
      }

      try {
        // Cancelar síntesis anterior si está en progreso
        if (this.isSpeaking) {
          this.synthesis.cancel();
        }

        // Crear utterance
        const SpeechUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;
        const utterance = new SpeechUtterance(text);

        // Configurar propiedades
        utterance.lang = this.mapLanguageToVoiceLocale(options.language);
        utterance.rate = options.rate || 1;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;

        // Manejadores de eventos
        utterance.onstart = () => {
          this.isSpeaking = true;
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          resolve();
        };

        utterance.onerror = (event: any) => {
          this.isSpeaking = false;
          reject(new Error(`Speech synthesis error: ${event.error}`));
        };

        // Iniciar síntesis
        this.synthesis.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Detener síntesis de voz
   */
  stopSpeaking(): void {
    if (this.synthesis && this.isSpeaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  /**
   * Verificar si está grabando
   */
  isRecording(): boolean {
    return this.isListening;
  }

  /**
   * Verificar si está hablando
   */
  isSpeakingNow(): boolean {
    return this.isSpeaking;
  }

  /**
   * Mapear código de idioma a locale de síntesis de voz
   */
  private mapLanguageToVoiceLocale(lang: string): string {
    const localeMap: Record<string, string> = {
      'es': 'es-ES',
      'fr': 'fr-FR',
      'en': 'en-US',
    };
    return localeMap[lang] || 'en-US';
  }

  /**
   * Obtener lista de voces disponibles
   */
  getAvailableVoices(): any[] {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices();
  }

  /**
   * Esperar a que se carguen las voces
   */
  onVoicesChanged(callback: () => void): void {
    if (this.synthesis) {
      this.synthesis.onvoiceschanged = callback;
    }
  }
}

export default new AudioService();
