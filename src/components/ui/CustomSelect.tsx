import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RuneChevronDown, RuneCheck } from '../icons/RuneIcons';
import { cn } from '../../lib/utils';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface CustomSelectProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  icon?: React.ReactNode;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md';
  align?: 'left' | 'right';
  className?: string;
  ariaLabel?: string;
}

/**
 * CustomSelect inspired by Cal.com Coss, shadcn/ui & Linear
 * Sleek, accessible dropdown with smooth spring popover animation,
 * keyboard navigation, and custom semantic styling without native OS select quirks.
 */
export function CustomSelect<T extends string = string>({
  value,
  onChange,
  options,
  icon,
  placeholder,
  size = 'sm',
  align = 'right',
  className,
  ariaLabel = 'Select option',
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
      return;
    }

    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (isOpen) {
      const currentIndex = options.findIndex((opt) => opt.value === value);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % options.length;
        onChange(options[nextIndex].value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + options.length) % options.length;
        onChange(options[prevIndex].value);
      }
    }
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-[11px] rounded-lg gap-1.5',
    sm: 'px-2.5 py-1.5 text-xs rounded-xl gap-2',
    md: 'px-3 py-2 text-sm rounded-xl gap-2.5',
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("relative inline-block text-left", isOpen && "z-50", className)}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Trigger Button */}
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center justify-between font-medium select-none transition-[color,background-color,border-color,transform] duration-150 ease-out",
          "bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 hover:border-zinc-600",
          "shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/20 active:scale-[0.98] cursor-pointer",
          isOpen && "border-zinc-500 bg-zinc-800 text-white ring-2 ring-zinc-400/20",
          sizeClasses[size]
        )}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {icon && <span className="shrink-0 flex items-center">{icon}</span>}
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder || 'Select'}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.15 }}
          className="shrink-0 text-zinc-400 group-hover:text-zinc-200 ml-1"
        >
          <RuneChevronDown size={size === 'xs' ? 12 : 14} />
        </motion.span>
      </button>

      {/* Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: align === 'right' ? 'top right' : 'top left' }}
            role="listbox"
            className={cn(
              "absolute top-full mt-1.5 min-w-[170px] z-50 p-1 rounded-xl",
              "bg-zinc-900/95 border border-zinc-800 shadow-2xl shadow-black/80 backdrop-blur-2xl ring-1 ring-white/[0.08]",
              align === 'right' ? 'right-0' : 'left-0'
            )}
          >
            <div className="flex flex-col gap-0.5">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer",
                      isSelected
                        ? "bg-zinc-800 text-white font-semibold"
                        : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {option.icon && <span className="shrink-0">{option.icon}</span>}
                      <span className="truncate">{option.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 ml-2 shrink-0">
                      {option.badge}
                      {isSelected && (
                        <RuneCheck size={13} className="text-zinc-100 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
