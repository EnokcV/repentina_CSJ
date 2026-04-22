export interface VerificationSignal {
  type: 'vibration' | 'visual' | 'sound';
  pattern: number[];
  duration: number;
}

class VerificationService {
  private isSupported: boolean = false;
  private audioContext: AudioContext | null = null;

  constructor() {
    this.checkSupport();
    this.initializeAudioContext();
  }

  private checkSupport(): void {
    try {
      this.isSupported = 'vibrate' in navigator && typeof navigator.vibrate === 'function';
    } catch (error) {
      console.warn('Error checking vibration support:', error);
      this.isSupported = false;
    }
  }

  private initializeAudioContext(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    } catch (error) {
      console.warn('Error initializing AudioContext:', error);
      this.audioContext = null;
    }
  }

  async verifyUnderstanding(type: 'received' | 'confirmed'): Promise<void> {
    const signal = this.getVerificationPattern(type);
    
    if (signal.type === 'vibration' && this.isSupported) {
      await this.vibrate(signal.pattern);
    }
    
    if (signal.type === 'visual') {
      this.showVisualSignal(signal);
    }
    
    if (signal.type === 'sound' && this.isSoundEnabled()) {
      this.playSound(signal);
    }
  }

  private getVerificationPattern(type: 'received' | 'confirmed'): VerificationSignal {
    if (type === 'received') {
      return {
        type: 'vibration',
        pattern: [100, 50, 100],
        duration: 250
      };
    } else {
      return {
        type: 'vibration',
        pattern: [200, 100, 200, 100, 200],
        duration: 700
      };
    }
  }

  private async vibrate(pattern: number[]): Promise<void> {
    try {
      if (navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    } catch (error) {
      console.error('Vibration failed:', error);
    }
  }

  private showVisualSignal(signal: VerificationSignal): void {
    const signalElement = document.createElement('div');
    signalElement.id = 'verification-signal';
    signalElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      background: ${signal.pattern.length > 3 ? '#4CAF50' : '#2196F3'};
      border-radius: 50%;
      z-index: 10000;
      animation: pulse 0.5s ease-in-out;
      pointer-events: none;
    `;
    
    document.body.appendChild(signalElement);
    
    setTimeout(() => {
      if (signalElement.parentNode) {
        signalElement.parentNode.removeChild(signalElement);
      }
    }, signal.duration);
  }

  private playSound(signal: VerificationSignal): void {
    try {
      let audioCtx = this.audioContext;
      
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          console.warn('AudioContext not supported');
          return;
        }
        audioCtx = new AudioContextClass();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(err => console.warn('Error resuming AudioContext:', err));
      }

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.frequency.value = signal.pattern.length > 3 ? 800 : 600;
      oscillator.type = 'sine';
      
      const duration = signal.duration / 1000;
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (error) {
      console.error('Sound playback failed:', error);
    }
  }

  private isSoundEnabled(): boolean {
    const settings = localStorage.getItem('worldconnect_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      return parsed.soundEnabled !== false;
    }
    return true;
  }

  async confirmMessage(messageId?: string): Promise<boolean> {
    try {
      if (messageId && typeof messageId !== 'string') {
        console.warn('Invalid messageId:', messageId);
        return false;
      }
      
      await this.verifyUnderstanding('confirmed');
      return true;
    } catch (error) {
      console.error('Error confirming message:', error);
      return false;
    }
  }

  async signalMessageReceived(): Promise<void> {
    try {
      await this.verifyUnderstanding('received');
    } catch (error) {
      console.error('Error signaling message received:', error);
    }
  }

  isVibrationSupported(): boolean {
    return this.isSupported;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
const verificationService = new VerificationService();
export default verificationService;
