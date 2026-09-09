import { type Server, type Socket } from 'socket.io';
import redis from '../db/redis.js';
import { v4 as uuid } from 'uuid';
function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
export function setupSocket(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);
    socket.on('room:create', async (data: { name: string; maxPlayers: number }) => {
      const roomId = uuid();
      const code = generateCode();
      await redis.hset('room:' + roomId, { name: data.name, hostId: socket.id, code, maxPlayers: data.maxPlayers || 4, status: 'waiting' });
      await redis.sadd('room:' + roomId + ':players', socket.id);
      socket.join(roomId);
      socket.emit('room:created', { roomId, code, players: [{ id: socket.id, username: 'Host' }] });
    });
    socket.on('room:join', async (data: { roomId: string }) => {
      const room = await redis.hgetall('room:' + data.roomId);
      if (!room.id) { socket.emit('error', { message: 'Room not found' }); return; }
      await redis.sadd('room:' + data.roomId + ':players', socket.id);
      socket.join(data.roomId);
      socket.to(data.roomId).emit('room:player-joined', { playerId: socket.id, username: 'Player' });
      const players = await redis.smembers('room:' + data.roomId + ':players');
      socket.emit('room:joined', { roomId: data.roomId, players: players.map((id) => ({ id, username: id === socket.id ? 'You' : 'Player' })) });
    });
    socket.on('player:gesture', (data: { roomId: string; chord: string; volume: number; filter: number; synthType: string }) => {
      socket.to(data.roomId).emit('player:gesture', { playerId: socket.id, ...data });
    });
    socket.on('room:chat', (data: { roomId: string; message: string }) => {
      io.to(data.roomId).emit('room:chat', { playerId: socket.id, message: data.message, timestamp: Date.now() });
    });
    socket.on('disconnecting', async () => {
      for (const roomId of socket.rooms) {
        if (roomId === socket.id) continue;
        socket.to(roomId).emit('room:player-left', { playerId: socket.id });
        await redis.srem('room:' + roomId + ':players', socket.id);
        const count = await redis.scard('room:' + roomId + ':players');
        if (count === 0) await redis.del('room:' + roomId, 'room:' + roomId + ':players');
      }
    });
    socket.on('disconnect', () => { console.log('Client disconnected:', socket.id); });
  });
}
