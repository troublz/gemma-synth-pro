import * as Tone from 'tone';
export class AudioRecorder {
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private dest: MediaStreamAudioDestinationNode | null = null;
  async start(): Promise<void> {
    this.chunks = [];
    const ctx = Tone.getContext().rawContext as AudioContext;
    this.dest = ctx.createMediaStreamDestination();
    Tone.getDestination().connect(this.dest);
    const stream = this.dest.stream;
    this.recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    this.recorder.ondataavailable = (e) => { if (e.data.size > 0) this.chunks.push(e.data); };
    this.recorder.start();
  }
  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.recorder) { resolve(new Blob()); return; }
      this.recorder.onstop = () => { resolve(new Blob(this.chunks, { type: 'audio/webm' })); };
      this.recorder.stop();
      this.dest?.disconnect();
    });
  }
}
