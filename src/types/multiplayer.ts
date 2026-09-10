export interface Player { id: string; username: string; status: 'online' | 'playing' | 'away'; }
export interface ChatMessage { playerId: string; message: string; timestamp: number; }
export interface Room { id: string; name: string; code: string; hostId: string; players: Player[]; maxPlayers: number; status: 'waiting' | 'playing' | 'ended'; }
export interface GestureBroadcast { playerId: string; chord: string; notes: string[]; volume: number; filter: number; synthType: string; }