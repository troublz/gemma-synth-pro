export class MidiOutput {
  private output: MIDIOutput | null = null;
  async init(): Promise<boolean> {
    try {
      const access = await navigator.requestMIDIAccess();
      const outputs = Array.from(access.outputs.values());
      if (outputs.length > 0) { this.output = outputs[0]; return true; }
    } catch { /* Web MIDI not supported */ }
    return false;
  }
  noteOn(note: number, velocity = 100): void {
    this.output?.send([0x90, note, velocity]);
  }
  noteOff(note: number): void {
    this.output?.send([0x80, note, 0]);
  }
}