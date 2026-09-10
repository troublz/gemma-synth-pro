import { Router, type Request, type Response } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { userService } from '../services/UserService.js';
const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await userService.getById(id);
  if (!user) { res.status(404).json({ success: false, data: null, error: 'User not found' }); return; }
  res.json({ success: true, data: { user } });
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  if (req.params.id !== req.userId) { res.status(403).json({ success: false, error: 'Forbidden' }); return; }
  await userService.updateSettings(req.userId as string, req.body.settings || {});
  res.json({ success: true, data: null });
});

export default router;