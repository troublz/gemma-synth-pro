import { type HandLandmark } from '../../stores/gestureStore';

interface HandOverlayProps { leftHand: HandLandmark[] | null; rightHand: HandLandmark[] | null; width: number; height: number; }
export default function HandOverlay({ leftHand, rightHand, width, height }: HandOverlayProps) {
  const connections = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];
  const renderHand = (hand: HandLandmark[] | null, color: string) => {
    if (!hand) return null;
    return (
      <g>
        {connections.map(([a, b], i) => (
          <line key={i} x1={hand[a].x * width} y1={hand[a].y * height} x2={hand[b].x * width} y2={hand[b].y * height} stroke={color} strokeWidth="2" opacity="0.4" />
        ))}
        {hand.map((lm, i) => (
          <circle key={i} cx={lm.x * width} cy={lm.y * height} r="4" fill={color} opacity="0.8" />
        ))}
      </g>
    );
  };
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox={'0 0 ' + width + ' ' + height}>
      {renderHand(leftHand, '#22d3ee')}
      {renderHand(rightHand, '#a78bfa')}
    </svg>
  );
}