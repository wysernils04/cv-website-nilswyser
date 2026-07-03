// NW wordmark + the single accent square (§4.1, §5.4). The square is the one
// place the Swiss red appears in the nav — a full stop after the initials.
export function Wordmark() {
  return (
    <span className="inline-flex items-end gap-[3px] leading-none">
      <span
        className="text-[1.15rem] leading-none"
        style={{fontVariationSettings: '"wght" 720, "wdth" 118', letterSpacing: '-0.01em'}}
      >
        NW
      </span>
      <span
        aria-hidden
        className="mb-[3px] inline-block h-[6px] w-[6px]"
        style={{background: 'var(--accent)'}}
      />
    </span>
  );
}
