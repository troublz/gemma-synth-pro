export class AudioStreamer {
  private pc: RTCPeerConnection | null = null;
  private stream: MediaStream | null = null;
  async create(): Promise<MediaStream> {
    this.pc = new RTCPeerConnection();
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.stream.getTracks().forEach((t) => this.pc!.addTrack(t, this.stream!));
    return this.stream;
  }
  close(): void {
    this.pc?.close();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.pc = null;
    this.stream = null;
  }
}