import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

/**
 * AnimatedCounter inspired by number-flow.barvian.me & emilkowal.ski
 * Smooth tactile rolling number animation.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className = '' }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
        setPrevValue(value);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <span
      className={`inline-block font-bold tracking-tight transition-all duration-200 ${
        animate ? 'transform -translate-y-0.5 scale-110 text-indigo-400' : 'transform translate-y-0 scale-100'
      } ${className}`}
    >
      {value}
    </span>
  );
};
