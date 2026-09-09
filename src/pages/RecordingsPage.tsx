import { useNavigate } from 'react-router-dom';
import { useRecordingStore } from '../stores/recordingStore';
import Button from '../components/ui/Button';
export default function RecordingsPage() {
  const navigate = useNavigate();
  const { recordings, removeRecording } = useRecordingStore();
  return (
    <div className="min-h-dvh bg-neutral-950 p-4">
      <div className="max-w-lg mx-auto pt-8 space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-neutral-400 hover:text-neutral-200">
            <img src="icons/arrow-left.svg" alt="" className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Recordings</h1>
        </div>
        {recordings.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <img src="icons/audio.svg" alt="" className="w-16 h-16 mx-auto opacity-30" />
            <p className="text-neutral-500">No recordings yet</p>
            <Button onClick={() => navigate('/play')}>Start Recording</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recordings.map((rec) => (
              <div key={rec.id} className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                <div>
                  <p className="font-medium">{rec.title}</p>
                  <p className="text-xs text-neutral-500">{Math.round(rec.duration / 1000)}s - {new Date(rec.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => removeRecording(rec.id)}>
                    <img src="icons/delete.svg" alt="" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
