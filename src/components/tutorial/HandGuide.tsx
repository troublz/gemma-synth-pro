export default function HandGuide() {
  return (
    <div className="flex items-center justify-center gap-16 p-8">
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-32 border-2 border-primary-400/30 rounded-2xl flex items-center justify-center">
          <span className="text-4xl">✋</span>
        </div>
        <span className="text-xs text-neutral-500">Left Hand</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-32 border-2 border-accent-400/30 rounded-2xl flex items-center justify-center">
          <span className="text-4xl">🤚</span>
        </div>
        <span className="text-xs text-neutral-500">Right Hand</span>
      </div>
    </div>
  );
}