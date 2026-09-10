import { useRef, useEffect } from 'react';

export function SpectrogramViz() {
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
      const imageData = ctx.getImageData(1, 0, w - 1, h);
      ctx.putImageData(imageData, 0, 0);
      for (let y = 0; y < h; y++) {
        const alpha = Math.random() * 0.3 * (1 - Math.abs(y - h / 2) / (h / 2));
        const idx = ((h - 1 - y) * w + w - 1) * 4;
        imageData.data[idx] = 6;
        imageData.data[idx + 1] = 182;
        imageData.data[idx + 2] = 212;
        imageData.data[idx + 3] = Math.floor(alpha * 255);
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} className="w-full h-32 rounded-lg" width={300} height={128} />;
}