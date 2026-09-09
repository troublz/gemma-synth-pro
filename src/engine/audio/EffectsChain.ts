import * as Tone from 'tone';
export class EffectsChain {
  reverb: Tone.Reverb;
  delay: Tone.FeedbackDelay;
  chorus: Tone.Chorus;
  distortion: Tone.Distortion;
  private output: Tone.ToneAudioNode;
  constructor() {
    this.reverb = new Tone.Reverb({ decay: 2, wet: 0 }).toDestination();
    this.delay = new Tone.FeedbackDelay({ delayTime: 0.3, feedback: 0.3, wet: 0 }).connect(this.reverb);
    this.chorus = new Tone.Chorus({ frequency: 1.5, delayTime: 3.5, depth: 0.7, wet: 0 }).connect(this.delay);
    this.distortion = new Tone.Distortion({ distortion: 0.3, wet: 0 }).connect(this.chorus);
    this.output = this.distortion;
  }
  connect(node: Tone.ToneAudioNode): void { node.connect(this.output); }
  disconnect(node: Tone.ToneAudioNode): void { node.disconnect(this.output); }
  setEffect(name: string, value: number): void {
    switch (name) {
      case 'reverb': this.reverb.wet.value = value; break;
      case 'delay': this.delay.wet.value = value; break;
      case 'chorus': this.chorus.wet.value = value; break;
      case 'distortion': this.distortion.wet.value = value; break;
    }
  }
  getOutput(): Tone.ToneAudioNode { return this.output; }
}
