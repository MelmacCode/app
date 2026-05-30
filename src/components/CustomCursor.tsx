import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        isHovering.current = true;
      }
    };

    const onMouseOut = () => {
      isHovering.current = false;
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.2;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.2;

      if (cursor) {
        const scale = isHovering.current ? 1.3 : 1;
        cursor.style.transform = `translate3d(${posRef.current.x - 14}px, ${posRef.current.y - 14}px, 0) scale(${scale})`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
      style={{ willChange: 'transform' }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path
          d="M8 18C8 18 8 30 14 32H26C32 30 32 18 32 18H8Z"
          stroke="#63341F"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 14H34V18H6V14Z"
          stroke="#63341F"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M32 16C32 16 38 16 38 22C38 28 32 28 32 28"
          stroke="#63341F"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M14 10C14 10 14 4 18 4C18 4 18 8 22 8C22 8 22 4 26 4C26 4 26 10 26 10"
          stroke="#63341F"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}