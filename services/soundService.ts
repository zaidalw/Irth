
class SoundService {
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_enabled');
      this.enabled = saved !== 'false';
      
      // محاولة فك قفل الصوت عند أول تفاعل حقيقي
      const unlock = () => {
        this.initContext();
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock);
      window.addEventListener('touchstart', unlock);
    }
  }

  private initContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('sound_enabled', String(this.enabled));
    if (this.enabled && this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  async play(type: 'click' | 'correct' | 'wrong' | 'flip' | 'levelup' | 'nav' | 'success' | 'hover') {
    if (!this.enabled) return;
    this.initContext();

    if (!this.audioContext) return;

    // متصفحات الويب تتطلب تفاعل مستخدم لاستئناف السياق الصوتي
    if (this.audioContext.state === 'suspended' && type !== 'hover') {
      try {
        await this.audioContext.resume();
      } catch (e) {
        return; // فشل الاستئناف (غالباً بسبب قيود المتصفح)
      }
    }

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    const createOsc = (freq: number, startTime: number, duration: number, vol: number, wave: OscillatorType = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    switch (type) {
      case 'hover':
        if (ctx.state === 'running') {
          createOsc(880, now, 0.05, 0.02, 'sine');
        }
        break;
      case 'click':
        createOsc(440, now, 0.1, 0.1, 'triangle');
        break;
      case 'nav':
        createOsc(330, now, 0.1, 0.05, 'sine');
        setTimeout(() => createOsc(440, now + 0.05, 0.1, 0.05, 'sine'), 50);
        break;
      case 'flip':
        createOsc(200, now, 0.2, 0.08, 'sine');
        const oscFlip = ctx.createOscillator();
        const gainFlip = ctx.createGain();
        oscFlip.frequency.setValueAtTime(200, now);
        oscFlip.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        gainFlip.gain.setValueAtTime(0.08, now);
        gainFlip.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        oscFlip.connect(gainFlip);
        gainFlip.connect(ctx.destination);
        oscFlip.start(now);
        oscFlip.stop(now + 0.2);
        break;
      case 'correct':
        createOsc(523.25, now, 0.3, 0.1, 'sine'); // C5
        createOsc(659.25, now + 0.1, 0.3, 0.1, 'sine'); // E5
        break;
      case 'wrong':
        const oscW = ctx.createOscillator();
        const gainW = ctx.createGain();
        oscW.frequency.setValueAtTime(150, now);
        oscW.frequency.linearRampToValueAtTime(100, now + 0.3);
        gainW.gain.setValueAtTime(0.1, now);
        gainW.gain.linearRampToValueAtTime(0.001, now + 0.3);
        oscW.connect(gainW);
        gainW.connect(ctx.destination);
        oscW.start(now);
        oscW.stop(now + 0.3);
        break;
      case 'success':
      case 'levelup':
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((f, i) => {
          createOsc(f, now + i * 0.1, 0.4, 0.1, 'sine');
        });
        break;
    }
  }
}

export const sounds = new SoundService();
