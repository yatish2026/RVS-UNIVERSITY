import React, { useEffect, useRef, useState } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';

interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 500,
  className = '',
  threshold = 0.05,
  once = true, // Render smoothly once to prevent stuttering/dragging on continuous scroll
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '50px 0px 0px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  // Initial transform state depending on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return '-translate-x-12 opacity-0';
      case 'right':
        return 'translate-x-12 opacity-0';
      case 'up':
        return 'translate-y-12 opacity-0';
      case 'down':
        return '-translate-y-12 opacity-0';
      case 'zoom':
        return 'scale-90 opacity-0';
      case 'fade':
        return 'opacity-0';
      default:
        return 'translate-y-12 opacity-0';
    }
  };

  const getVisibleTransform = () => {
    switch (direction) {
      case 'zoom':
        return 'scale-100 opacity-100';
      default:
        return 'translate-x-0 translate-y-0 opacity-100';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible ? getVisibleTransform() : getInitialTransform()
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};
