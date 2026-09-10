import { Router, type Request, type Response } from 'express';
import pool from '../db/client.js';
import { authMiddleware } from '../middleware/auth.js';
const router = Router();
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM recordings WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20', [req.userId]);
  res.json({ success: true, data: { recordings: result.rows } });
});
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  await pool.query('DELETE FROM recordings WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
  res.json({ success: true, data: null });
});
export default router;
