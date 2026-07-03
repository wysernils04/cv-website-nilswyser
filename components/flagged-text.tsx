import {Fragment} from 'react';
import {PLACEHOLDER_RE} from '@/lib/placeholders';

// Renders a string, styling any inline `[PLACEHOLDER: …]` marker as a loud flag
// while leaving real copy untouched. Server component — no client JS.
export function FlaggedText({text}: {text: string}) {
  const parts = text.split(PLACEHOLDER_RE);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[PLACEHOLDER:') ? (
          <mark className="ph" key={i}>
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
