import { useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';

export function useSocket(url?: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url || (import.meta.env.VITE_API_URL || 'http://localhost:3001'));
    socketRef.current = socket;
    return () => { socket.disconnect(); };
  }, [url]);

  return socketRef;
}