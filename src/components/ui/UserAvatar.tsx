import React from 'react';

interface UserAvatarProps {
  name?: string;
  avatar?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = 'User',
  avatar,
  size = 'sm',
  className = '',
}) => {
  // If user uploaded a valid non-unsplash image, show it
  const hasValidCustomImage = Boolean(avatar && !avatar.includes('unsplash.com'));

  // Calculate 1 or 2 uppercase initials
  const initials = React.useMemo(() => {
    const trimmed = (name || 'User').trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return trimmed.substring(0, 2).toUpperCase();
  }, [name]);

  // Size dimensions
  const sizeMap = {
    xs: 'w-4 h-4 text-[9px]',
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm font-bold',
  };

  if (hasValidCustomImage) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`rounded-full object-cover border border-zinc-700/80 ${sizeMap[size]} ${className}`}
      />
    );
  }

  // Generate deterministic subtle color based on initials
  const colors = [
    'bg-zinc-800 text-zinc-200 border-zinc-700',
    'bg-indigo-950/80 text-indigo-200 border-indigo-800/60',
    'bg-slate-800 text-slate-200 border-slate-700',
    'bg-zinc-900 text-zinc-300 border-zinc-700/80',
  ];
  const charCode = (initials.charCodeAt(0) || 0) + (initials.charCodeAt(1) || 0);
  const colorClass = colors[charCode % colors.length];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-semibold select-none border shrink-0 ${sizeMap[size]} ${colorClass} ${className}`}
      title={name}
      aria-label={name}
    >
      {initials}
    </div>
  );
};
