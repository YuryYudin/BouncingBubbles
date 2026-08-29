// PSG (YM-2149) sound engine for Bouncing Boubles.
// Faithful re-implementation of the game's per-frame sound engine at $B2
// (disassembly-derived): 3 tone channels + no envelope chip regs — the game
// programs volume/period registers directly each frame via Giaccess.
//
// Register map (PSG):
//  $00/$01 chA period fine/coarse   $02/$03 chB   $04/$05 chC
//  $06 noise period                 $07 mixer
//  $08/$09/$0A chA/B/C volume       $0B/$0C/$0D envelope

const PSG_CLOCK = 2000000; // 2 MHz ST
export const TONE_PERIOD_BASE = 125000; // tone freq = clock / (16 * period)

export class Psg {
  constructor(audio) {
    this.ctx = audio;
    this.master = audio.createGain();
    this.master.gain.value = 0.25;
    this.master.connect(audio.destination);

    // Square-wave oscillator per channel with a gain used as volume.
    this.ch = [];
    for (let i = 0; i < 3; i++) {
      const osc = audio.createOscillator();
      osc.type = 'square';
      osc.frequency.value = 440;
      const g = audio.createGain();
      g.gain.value = 0;
      osc.connect(g).connect(this.master);
      osc.start();
      this.ch.push({ osc, gain: g, period: 0, vol: 0 });
    }
    this.enabled = true;
  }

  setPeriod(chIdx, period) {
    const c = this.ch[chIdx];
    period = Math.max(1, Math.min(4095, period));
    if (c.period === period) return;
    c.period = period;
    const f = PSG_CLOCK / (16 * period);
    c.osc.frequency.setTargetAtTime(Math.min(20000, Math.max(1, f)), this.ctx.currentTime, 0.002);
  }

  setVolume(chIdx, vol) {
    const c = this.ch[chIdx];
    vol = Math.max(0, Math.min(15, vol & 15)); // PSG keeps low 4 bits
    if (c.vol === vol) return;
    c.vol = vol;
    const v = (vol / 15) * (vol / 15); // perceptual curve
    c.gain.gain.setTargetAtTime(vol === 0 ? 0 : v * 0.5, this.ctx.currentTime, 0.004);
  }

  muteAll() {
    for (let i = 0; i < 3; i++) this.setVolume(i, 0);
  }
}
