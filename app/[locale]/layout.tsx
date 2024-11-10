import { Toaster } from '@/components/ui/toaster';
import { routing } from '@/i18n/routing';
import { avenir } from '@/lib/fonts/avenir';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'HK Sustain',
    description: 'Sustainable Management for HK Foods',
};

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Ensure that the incoming `locale` is valid
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className="h-full">
            <body className={cn(avenir.className, 'antialiased flex flex-col h-full overflow-hidden')}>
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
                <Toaster></Toaster>
            </body>
        </html>
    );
}
