import { useRef, useEffect } from 'react';

export function WaveformViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      for (let i = 0; i < w; i += 4) {
        const y = h / 2 + Math.sin(i * 0.05 + Date.now() * 0.005) * (h / 3) * (0.5 + Math.random() * 0.5);
        ctx.lineTo(i, y);
      }
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, 'rgba(6,182,212,0.6)');
      grad.addColorStop(1, 'rgba(6,182,212,0.05)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} className="w-full h-24 rounded-lg" width={400} height={100} />;
}