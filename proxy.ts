import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Next.js 16 renamed Middleware to Proxy. next-intl's request handler slots in
// unchanged as the default export: it negotiates the locale, redirects `/` to
// `/de`, and sets the locale for statically-prerendered pages.
export default createMiddleware(routing);

export const config = {
  // Match everything except API routes, Next internals, and files with an
  // extension (static assets). This includes `/` so it can redirect to `/de`.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};
