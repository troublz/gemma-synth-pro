import pool from '../db/client.js';

export class UserService {
  async getById(id: string) {
    const result = await pool.query('SELECT id, username, email, settings, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
  async updateSettings(id: string, settings: Record<string, unknown>) {
    await pool.query('UPDATE users SET settings = $1, updated_at = NOW() WHERE id = $2', [JSON.stringify(settings), id]);
  }
}

export const userService = new UserService();