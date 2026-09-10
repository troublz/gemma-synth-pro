export interface ApiResponse<T> { success: boolean; data: T | null; error?: string; }
export interface User { id: string; username: string; email: string; settings?: Record<string, unknown>; }
export interface Preset { id: string; userId: string; name: string; description?: string; config: Record<string, unknown>; isPublic: boolean; downloads: number; }
export interface Recording { id: string; userId: string; title: string; durationMs: number; fileUrl: string; fileSize: number; format: string; isPublic: boolean; createdAt: string; }