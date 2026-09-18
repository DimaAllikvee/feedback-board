import React from 'react';
import { TextMorph } from 'torph/react';

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

/**
 * AnimatedCounter powered by torph/react (TextMorph)
 * Dependency-free place-value numeric rolling morph.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className = '' }) => {
  return (
    <TextMorph
      as="span"
      numbers
      ease={{ stiffness: 220, damping: 22 }}
      className={`inline-block font-bold tracking-tight ${className}`}
    >
      {value}
    </TextMorph>
  );
};
