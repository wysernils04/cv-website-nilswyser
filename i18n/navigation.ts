import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Locale-aware navigation helpers. `Link` preserves the active locale and
// emits correct `hreflang`-friendly hrefs; the locale switch uses these.
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
