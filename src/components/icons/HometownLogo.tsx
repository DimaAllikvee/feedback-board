import React from 'react';

interface HometownLogoProps {
  size?: number;
  className?: string;
}

/**
 * Hometown Logo Mark
 * Designed after the Bruno Fantinato geometric monoline identity for Hometown (HMTW):
 * 4 parallel angled bars intersected by alternating crossfader nodes/ticks
 * forming an isometric geometric 'H' mark.
 */
export const HometownLogo: React.FC<HometownLogoProps> = ({ size = 28, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Hometown Logo"
    >
      {/* 4 Parallel slanted bars (approx 12-14° incline) */}
      <line x1="8" y1="20" x2="56" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="30" x2="56" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="40" x2="56" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="50" x2="56" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

      {/* Crossfader node ticks:
          Bar 1 (top): tick on right axis (x=43)
          Bar 2: tick on left axis (x=21)
          Bar 3: tick on right axis (x=43)
          Bar 4 (bottom): tick on left axis (x=21)
      */}
      {/* Bar 1 right tick */}
      <path d="M43 8 L43 20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Bar 2 left tick */}
      <path d="M21 22 L21 34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Bar 3 right tick */}
      <path d="M43 28 L43 40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Bar 4 left tick */}
      <path d="M21 42 L21 54" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};
