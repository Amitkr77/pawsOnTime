import { useEffect, useState, useRef } from 'react';

const CursorChaser = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const chaserRef = useRef<HTMLDivElement | null>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const chaserPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const smoothChaserMovement = () => {
      const { x, y } = position;
      const speed = 0.1; // controls how fast the chaser catches up with the mouse

      // Interpolate the chaser's position towards the cursor position
      chaserPosition.current.x += (x - chaserPosition.current.x) * speed;
      chaserPosition.current.y += (y - chaserPosition.current.y) * speed;

      if (chaserRef.current) {
        chaserRef.current.style.transform = `translate(${chaserPosition.current.x - 12}px, ${chaserPosition.current.y - 12}px)`;
      }

      animationFrameId.current = requestAnimationFrame(smoothChaserMovement);
    };

    // Start the smooth movement loop
    animationFrameId.current = requestAnimationFrame(smoothChaserMovement);

    // Cleanup the animation frame on unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [position]);

  return (
    <div
      ref={chaserRef}
      className={`fixed pointer-events-none z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="text-2xl animate-bounce">🐕</div>
    </div>
  );
};

export default CursorChaser;
