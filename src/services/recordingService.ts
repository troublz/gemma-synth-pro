import { api } from './api';
import { type ApiResponse } from '../types/api';

export const recordingService = {
  list: () => api<ApiResponse<{ recordings: unknown[] }>>('/api/recordings'),
  upload: (formData: FormData) =>
    api<ApiResponse<{ recording: unknown }>>('/api/recordings', { method: 'POST', body: formData }),
  remove: (id: string) => api<ApiResponse<null>>('/api/recordings/' + id, { method: 'DELETE' }),
};