import pool from '../db/client.js';
import { v4 as uuid } from 'uuid';

export class PresetService {
  async listPublic() {
    const result = await pool.query('SELECT * FROM presets WHERE is_public = true ORDER BY downloads DESC LIMIT 20');
    return result.rows;
  }
  async create(userId: string, name: string, config: unknown, isPublic: boolean) {
    const result = await pool.query(
      'INSERT INTO presets (id, user_id, name, config, is_public) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [uuid(), userId, name, JSON.stringify(config), isPublic]
    );
    return result.rows[0];
  }
  async delete(id: string, userId: string) {
    await pool.query('DELETE FROM presets WHERE id = $1 AND user_id = $2', [id, userId]);
  }
}

export const presetService = new PresetService();