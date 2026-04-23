import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ className }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const cursorVisible = useRef(true);
  const cursorPosX = useRef(0);
  const cursorPosY = useRef(0);
  const followerPosX = useRef(0);
  const followerPosY = useRef(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorVisible.current = true;
      cursorPosX.current = e.clientX;
      cursorPosY.current = e.clientY;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const moveFollower = () => {
      followerPosX.current += (cursorPosX.current - followerPosX.current) * 0.15;
      followerPosY.current += (cursorPosY.current - followerPosY.current) * 0.15;
      
      if (followerRef.current) {
        followerRef.current.style.left = `${followerPosX.current}px`;
        followerRef.current.style.top = `${followerPosY.current}px`;
      }
      
      requestAnimationFrame(moveFollower);
    };

    const hideCursor = () => {
      cursorVisible.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      if (followerRef.current) {
        followerRef.current.style.opacity = '0';
      }
    };

    const showCursor = () => {
      cursorVisible.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
      if (followerRef.current) {
        followerRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', showCursor);
    window.addEventListener('mouseleave', hideCursor);
    
    const animationFrame = requestAnimationFrame(moveFollower);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', showCursor);
      window.removeEventListener('mouseleave', hideCursor);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          'fixed pointer-events-none z-[100] hidden lg:block',
          'w-4 h-4 rounded-full bg-zinc-900',
          'mix-blend-difference transition-opacity duration-200',
          className
        )}
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={followerRef}
        className={cn(
          'fixed pointer-events-none z-[99] hidden lg:block',
          'w-12 h-12 rounded-full border border-zinc-900/30',
          'transition-opacity duration-300',
          className
        )}
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};
