import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const shouldHandle =
        pathname === '/' ||
        new RegExp(`^/(${routing.locales.join('|')})(/.*)?$`).test(request.nextUrl.pathname);
    if (!shouldHandle) return;

    return handleI18nRouting(request);
}
