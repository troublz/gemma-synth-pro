import { type ReactNode, useState } from 'react';
interface TooltipProps { content: string; children: ReactNode; position?: 'top' | 'bottom'; }
export default function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className={}>
          {content}
        </div>
      )}
    </div>
  );
}
