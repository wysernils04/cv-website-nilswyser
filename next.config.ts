import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Points the plugin at ./i18n/request.ts (its default location).
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Fully static export (§6: "everything statically generated at build time").
  // The build emits plain HTML into out/, which scripts/strip-runtime.mjs then
  // post-processes — the deployed artifact is exactly what we verified locally.
  // The / → /de redirect lives in vercel.json (middleware is unavailable in
  // export mode, and nothing else needed it).
  output: 'export'
};

export default withNextIntl(nextConfig);
