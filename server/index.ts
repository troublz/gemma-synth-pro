import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket/index.js';
import authRoutes from './routes/auth.js';
import presetRoutes from './routes/presets.js';
import recordingRoutes from './routes/recordings.js';
import usersRoutes from './routes/users.js';
import roomsRoutes from './routes/rooms.js';
import { apiLimiter, authLimiter } from './middleware/rateLimit.js';
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CORS_ORIGIN || 'http://localhost:5173', methods: ['GET', 'POST'] },
});
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/presets', apiLimiter, presetRoutes);
app.use('/api/recordings', apiLimiter, recordingRoutes);
app.use('/api/users', apiLimiter, usersRoutes);
app.use('/api/rooms', apiLimiter, roomsRoutes);
app.get('/api/health', (_req, res) => res.json({ success: true, data: { status: 'ok' } }));
setupSocket(io);
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log('Server running on port ' + PORT));
