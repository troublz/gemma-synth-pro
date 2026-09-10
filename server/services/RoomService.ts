import pool from '../db/client.js';
import { v4 as uuid } from 'uuid';

export class RoomService {
  async create(hostId: string, name: string, maxPlayers: number = 4) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const result = await pool.query(
      'INSERT INTO room_history (id, host_id, room_code, player_count, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [uuid(), hostId, code, 0]
    );
    return { ...result.rows[0], code };
  }
  async addParticipant(roomHistoryId: string, userId: string) {
    await pool.query(
      'INSERT INTO room_participants (id, room_history_id, user_id) VALUES ($1, $2, $3)',
      [uuid(), roomHistoryId, userId]
    );
  }
  async endRoom(roomId: string) {
    await pool.query(
      'UPDATE room_history SET ended_at = NOW(), duration_sec = EXTRACT(EPOCH FROM (NOW() - started_at))::INTEGER WHERE id = $1',
      [roomId]
    );
  }
}

export const roomService = new RoomService();