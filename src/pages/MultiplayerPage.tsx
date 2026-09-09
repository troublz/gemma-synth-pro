import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultiplayerStore } from '../stores/multiplayerStore';
import Button from '../components/ui/Button';
export default function MultiplayerPage() {
  const navigate = useNavigate();
  const { roomId, roomCode, players, isConnected } = useMultiplayerStore();
  const [joinCode, setJoinCode] = useState('');
  if (roomId) {
    return (
      <div className="min-h-dvh bg-neutral-950 p-4">
        <div className="max-w-lg mx-auto pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Room: {roomCode}</h1>
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>Leave</Button>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 space-y-3">
            <p className="text-sm text-neutral-400">Players ({players.length})</p>
            {players.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className={'h-2 w-2 rounded-full ' + (p.status === 'playing' ? 'bg-green-500' : 'bg-neutral-500')} />
                <span>{p.username}</span>
              </div>
            ))}
          </div>
          <Button className="w-full">Start Jam</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-dvh bg-neutral-950 p-4">
      <div className="max-w-lg mx-auto pt-8 space-y-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-neutral-400 hover:text-neutral-200">
            <img src="icons/arrow-left.svg" alt="" className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Multiplayer</h1>
        </div>
        <div className="grid gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
            <h2 className="font-semibold">Create Room</h2>
            <p className="text-sm text-neutral-400">Start a new jam session and invite friends.</p>
            <Button className="w-full">Create Room</Button>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
            <h2 className="font-semibold">Join Room</h2>
            <p className="text-sm text-neutral-400">Enter a room code to join a friend's session.</p>
            <input type="text" placeholder="Enter 6-digit code" maxLength={6} value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm text-center tracking-widest uppercase" />
            <Button variant="secondary" className="w-full" disabled={joinCode.length < 6}>Join Room</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
