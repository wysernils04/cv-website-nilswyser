// The Swiss grid made literal (§5.1): 1px vertical rules marking the content
// columns. Purely decorative — aria-hidden, pointer-events-none, and kept subtle
// so it never fights readability. Rendered inside a `position: relative` parent.
export function GridLines({columns = 4}: {columns?: number}) {
  const lines = Array.from({length: columns + 1}, (_, i) => i);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="shell relative h-full">
        {lines.map((i) => (
          <span
            key={i}
            className="gridline absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i / columns) * 100}%`,
              background: 'var(--border)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
