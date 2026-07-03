// Anything the spec marks `[PLACEHOLDER: …]` must render verbatim and be
// greppable (HANDOVER §"How to work with this spec"). This is the single matcher
// used to detect and split those markers everywhere in the UI.
export const PLACEHOLDER_RE = /(\[PLACEHOLDER:[^\]]*\])/g;

export function hasPlaceholder(value: string): boolean {
  return value.includes('[PLACEHOLDER:');
}
