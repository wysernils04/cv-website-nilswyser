'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

// Preserves scroll position across a locale switch (§8 step 5). LocaleSwitch
// stashes window.scrollY before navigating; this restores it once the new locale
// renders. Keyed on pathname so it runs on each `/de` ⇆ `/en` change.
export function ScrollRestore() {
  const pathname = usePathname();
  useEffect(() => {
    const stored = sessionStorage.getItem('nw:scroll');
    if (stored !== null) {
      window.scrollTo(0, parseInt(stored, 10) || 0);
      sessionStorage.removeItem('nw:scroll');
    }
  }, [pathname]);
  return null;
}
