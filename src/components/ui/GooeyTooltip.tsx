import React, { useState, useRef, useId } from "react";
import { motion } from "framer-motion";
import { Plus, Upload, FolderGit2 } from "lucide-react";

export interface GooeyTooltipItem {
  id?: string;
  label?: string;
  icon?: React.ComponentType<{ className?: string; size?: number | string }> | any;
  tooltip: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface GooeyTooltipProps {
  items?: GooeyTooltipItem[];
  className?: string;
  buttonClassName?: string;
  tooltipClassName?: string;
  tooltipTop?: number;
  filterId?: string;
}

const DEFAULT_ITEMS: GooeyTooltipItem[] = [
  { icon: Plus, tooltip: "Add to cart", ariaLabel: "Add item" },
  { label: "Share", icon: Upload, tooltip: "Copy link", ariaLabel: "Share link" },
  { label: "Projects", icon: FolderGit2, tooltip: "View Latest", ariaLabel: "View projects" },
];

const POP_TRANSITION = {
  duration: 0.7,
  type: "spring" as const,
  bounce: 0.22,
};

const MOVE_TRANSITION = {
  duration: 0.2,
  type: "spring" as const,
  bounce: 0.2,
};

export const GooeySvgFilter: React.FC<{ id?: string }> = ({ id = "gooey-filter" }) => (
  <svg
    className="absolute w-0 h-0 pointer-events-none opacity-0 overflow-hidden"
    aria-hidden="true"
    style={{ position: "absolute", width: 0, height: 0 }}
  >
    <defs>
      <filter width="200%" height="200%" id={id} x="-50%" y="-50%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
);

export const GooeyTooltip: React.FC<GooeyTooltipProps> = ({
  items = DEFAULT_ITEMS,
  className = "",
  buttonClassName = "bg-neutral-900 text-white",
  tooltipClassName = "bg-neutral-900 text-white",
  tooltipTop = -45,
  filterId,
}) => {
  const generatedId = useId().replace(/:/g, "");
  const activeFilterId = filterId || `gooey-filter-${generatedId}`;

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [isFresh, setIsFresh] = useState(true);
  const insideRef = useRef(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0 });

  const updatePosition = (idx: number) => {
    const item = itemRefs.current[idx];
    const container = containerRef.current;
    if (item && container) {
      const itemRect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPos({ x: itemRect.left - containerRect.left + itemRect.width / 2 });
    }
  };

  const handleEnter = (idx: number) => {
    updatePosition(idx);
    setIsFresh(!insideRef.current); // fresh only if we weren't already inside
    insideRef.current = true;
    setHoverIdx(idx);
  };

  const handleLeaveGroup = () => {
    insideRef.current = false;
    setHoverIdx(null);
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Hidden SVG Filter Definition */}
      <GooeySvgFilter id={activeFilterId} />

      {/* Gooey Filtered Container */}
      <div
        ref={containerRef}
        style={{ filter: `url(#${activeFilterId})` }}
        className={`relative h-11 flex items-center gap-2 rounded-2xl ${className}`}
        onMouseLeave={handleLeaveGroup}
      >
        {/* Floating Gooey Tooltip Bubble */}
        <motion.div
          layout
          initial={{ scale: 0, opacity: 0, filter: "blur(1px)" }}
          animate={
            hoverIdx !== null
              ? {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  top: tooltipTop,
                  x: pos.x,
                }
              : { scale: 0, opacity: 0, filter: "blur(1px)", top: 0, x: pos.x }
          }
          transition={isFresh ? POP_TRANSITION : MOVE_TRANSITION}
          className={`absolute z-0 -translate-x-1/2 whitespace-nowrap w-max py-1.5 px-3.5 text-xs font-medium rounded-lg pointer-events-none shadow-sm ${tooltipClassName}`}
        >
          {hoverIdx !== null ? items[hoverIdx]?.tooltip : ""}
        </motion.div>

        {/* Buttons */}
        {items.map((nav, idx) => {
          const Icon = nav.icon;
          return (
            <div
              key={nav.id || idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              onMouseEnter={() => handleEnter(idx)}
              className="relative flex items-center justify-center"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={nav.onClick}
                aria-label={nav.ariaLabel || nav.tooltip}
                className={`relative gap-1.5 flex items-center justify-center z-10 px-3 py-2 text-xs font-medium rounded-lg cursor-pointer transition-transform ${buttonClassName}`}
              >
                {Icon && <Icon className="w-4 h-4" size={16} />}
                {nav.label && <span>{nav.label}</span>}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GooeyTooltip;
