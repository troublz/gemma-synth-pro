import { useNavigate } from 'react-router-dom';
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <p className="text-primary-400 text-sm font-medium tracking-widest uppercase">Gesture Synth Pro</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">make music with your hands</h1>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto">Interactive musical instrument using your camera.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/play')} className="bg-primary-600 hover:bg-primary-500 text-white font-semibold px-8 py-3.5 rounded-md">Play Now</button>
          <button onClick={() => navigate('/tutorial')} className="border border-neutral-700 hover:border-neutral-500 text-neutral-200 font-semibold px-8 py-3.5 rounded-md">Tutorial</button>
        </div>
      </div>
    </div>
  );
}
ENDOFF
