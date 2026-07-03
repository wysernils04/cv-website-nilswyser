// Shared motion tokens (§5.5). Only transform + opacity animate — compositor
// friendly, 60 fps. Reveal timing: opacity + 16 px rise, ~560 ms, ease-out.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const REVEAL_DURATION = 0.56;
export const REVEAL_RISE = 16;
export const STAGGER = 0.07; // 70 ms between staggered reveals
