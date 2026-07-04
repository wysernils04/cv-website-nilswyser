// Kinetic type band (§5.5-compliant spectacle): giant hollow display type that
// slides horizontally as a pure function of scroll position — it moves exactly
// when the visitor moves and stops when they stop; nothing loops idly. Points
// the eye toward Contact, so it orients rather than decorates. aria-hidden:
// the phrase is the Contact heading, which screen readers get properly below.
// Without JS it is a static, quiet frame of hollow type.
export function KineticBand({phrase}: {phrase: string}) {
  const word = phrase.replace(/[.。]$/, '').toUpperCase();
  const run = Array(6).fill(word).join(' — ') + ' — ';
  return (
    <div aria-hidden data-kinetic="" className="kinetic">
      {/* two identical halves → seamless wrap at half the track width */}
      <div data-kinetic-track="" className="kinetic-track" suppressHydrationWarning>
        <span>{run}</span>
        <span>{run}</span>
      </div>
    </div>
  );
}
