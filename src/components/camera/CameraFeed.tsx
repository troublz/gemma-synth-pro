import { type RefObject } from 'react';

interface CameraFeedProps { videoRef: RefObject<HTMLVideoElement>; loading: boolean; error: string | null; }
export default function CameraFeed({ videoRef, loading, error }: CameraFeedProps) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900">
      <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-black/60"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" /></div>}
      {error && <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-neutral-400">{error === 'denied' ? 'Camera denied' : 'Camera not available'}</div>}
    </div>
  );
}