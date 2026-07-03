import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Points the plugin at ./i18n/request.ts (its default location).
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Serve modern formats first; next/image negotiates per request.
  images: {
    formats: ['image/avif', 'image/webp']
  }
};

export default withNextIntl(nextConfig);
