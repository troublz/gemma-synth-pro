import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import pool from '../db/client.js';
import { authMiddleware } from '../middleware/auth.js';
import { v4 as uuid } from 'uuid';
const router = Router();
router.get('/', async (_req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM presets WHERE is_public = true ORDER BY downloads DESC LIMIT 20');
  res.json({ success: true, data: { presets: result.rows } });
});
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { name, config, isPublic } = req.body;
  const result = await pool.query(
    'INSERT INTO presets (id, user_id, name, config, is_public) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [uuid(), req.userId, name, JSON.stringify(config), isPublic || false]
  );
  res.status(201).json({ success: true, data: { preset: result.rows[0] } });
});
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  await pool.query('DELETE FROM presets WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
  res.json({ success: true, data: null });
});
export default router;
