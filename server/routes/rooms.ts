import { Router, type Request, type Response } from 'express';
import redis from '../db/redis.js';
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const keys = await redis.keys('room:*');
  const roomKeys = keys.filter((k: string) => !k.includes(':players'));
  const rooms = [];
  for (const key of roomKeys) {
    const room = await redis.hgetall(key);
    const count = await redis.scard(key + ':players');
    if (room.status === 'waiting') rooms.push({ id: key.replace('room:', ''), name: room.name, players: count, maxPlayers: room.maxPlayers });
  }
  res.json({ success: true, data: { rooms } });
});

export default router;
