import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import pool from '../db/client.js';
import { signToken } from '../utils/jwt.js';
import { authMiddleware } from '../middleware/auth.js';
const router = Router();
const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
router.post('/register', async (req: Request, res: Response) => {
  try {
    const body = registerSchema.parse(req.body);
    const hash = await bcrypt.hash(body.password, 12);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (, , ) RETURNING id, username, email',
      [body.username, body.email, hash]
    );
    const user = result.rows[0];
    const token = signToken(user.id);
    res.status(201).json({ success: true, data: { user, token } });
  } catch (err: any) {
    if (err.code === '23505') {
      res.status(409).json({ success: false, data: null, error: 'Email already registered' });
      return;
    }
    res.status(400).json({ success: false, data: null, error: err.message });
  }
});
router.post('/login', async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);
    const result = await pool.query('SELECT * FROM users WHERE email = ', [body.email]);
    if (!result.rows.length) {
      res.status(401).json({ success: false, data: null, error: 'Invalid credentials' });
      return;
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(body.password, user.password_hash);
    if (!valid) {
      res.status(401).json({ success: false, data: null, error: 'Invalid credentials' });
      return;
    }
    const token = signToken(user.id);
    res.json({ success: true, data: { user: { id: user.id, username: user.username, email: user.email }, token } });
  } catch (err: any) {
    res.status(400).json({ success: false, data: null, error: err.message });
  }
});
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  const result = await pool.query('SELECT id, username, email, settings, created_at FROM users WHERE id = ', [req.userId]);
  if (!result.rows.length) {
    res.status(404).json({ success: false, data: null, error: 'User not found' });
    return;
  }
  res.json({ success: true, data: { user: result.rows[0] } });
});
export default router;
