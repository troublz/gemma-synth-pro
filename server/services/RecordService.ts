import pool from '../db/client.js';

export class RecordService {
  async listByUser(userId: string) {
    const result = await pool.query('SELECT * FROM recordings WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20', [userId]);
    return result.rows;
  }
  async delete(id: string, userId: string) {
    await pool.query('DELETE FROM recordings WHERE id = $1 AND user_id = $2', [id, userId]);
  }
}

export const recordService = new RecordService();