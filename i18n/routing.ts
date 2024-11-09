import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en-US', 'de', 'cs', 'es', 'fi', 'id', 'ko', 'pl', 'ro', 'ru', 'uk', 'zh-hans'],
    // Used when no locale matches
    defaultLocale: 'en-US',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
