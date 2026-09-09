import { create } from 'zustand';
export interface Player { id: string; username: string; status: 'online' | 'playing' | 'away'; }
export interface MultiplayerState {
  roomId: string | null; roomCode: string | null; isHost: boolean;
  players: Player[]; chatMessages: { playerId: string; message: string; timestamp: number }[];
  isConnected: boolean;
  setRoom: (roomId: string, roomCode: string, isHost: boolean) => void;
  addPlayer: (p: Player) => void; removePlayer: (id: string) => void;
  addChatMessage: (msg: { playerId: string; message: string; timestamp: number }) => void;
  setConnected: (c: boolean) => void; reset: () => void;
}
export const useMultiplayerStore = create<MultiplayerState>((set) => ({
  roomId: null, roomCode: null, isHost: false, players: [], chatMessages: [], isConnected: false,
  setRoom: (roomId, roomCode, isHost) => set({ roomId, roomCode, isHost, players: [] }),
  addPlayer: (p) => set((s) => ({ players: [...s.players.filter((x) => x.id !== p.id), p] })),
  removePlayer: (id) => set((s) => ({ players: s.players.filter((p) => p.id !== id) })),
  addChatMessage: (msg) => set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
  setConnected: (c) => set({ isConnected: c }),
  reset: () => set({ roomId: null, roomCode: null, isHost: false, players: [], chatMessages: [] }),
}));
