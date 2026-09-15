export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const SPRING_SNAPPY = { type: "spring", stiffness: 400, damping: 28, mass: 0.8 } as const;
export const SPRING_BOUNCE = { type: "spring", stiffness: 350, damping: 18 } as const;
