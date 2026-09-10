import { io, type Socket } from 'socket.io-client';

export class SocketClient {
  private socket: Socket;
  constructor(url: string = 'http://localhost:3001') {
    this.socket = io(url);
  }
  get(): Socket { return this.socket; }
  on(event: string, handler: (...args: any[]) => void): void { this.socket.on(event, handler); }
  emit(event: string, data: unknown): void { this.socket.emit(event, data); }
  disconnect(): void { this.socket.disconnect(); }
}