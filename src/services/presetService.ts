import { api } from './api';
import { type ApiResponse } from '../types/api';

export const presetService = {
  list: () => api<ApiResponse<{ presets: unknown[] }>>('/api/presets'),
  create: (data: { name: string; config: unknown; isPublic: boolean }) =>
    api<ApiResponse<{ preset: unknown }>>('/api/presets', { method: 'POST', body: JSON.stringify(data) }),
  remove: (id: string) => api<ApiResponse<null>>('/api/presets/' + id, { method: 'DELETE' }),
};