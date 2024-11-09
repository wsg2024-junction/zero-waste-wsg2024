import { AppShell } from '@/components/app-shell';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LanguageProvider } from '@/app/_utils/useLanguage';

const avenir = localFont({
    adjustFontFallback: 'Arial',
    display: 'auto',
    src: [
        {
            path: './fonts/AvenirLTStd-Black.otf',
            weight: '800',
            style: 'normal',
        },
        {
            path: './fonts/AvenirLTStd-BlackOblique.otf',
            weight: '800',
            style: 'italic',
        },
        {
            path: './fonts/AvenirLTStd-Book.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/AvenirLTStd-BookOblique.otf',
            weight: '300',
            style: 'italic',
        },
        {
            path: './fonts/AvenirLTStd-Heavy.otf',
            weight: '900',
            style: 'normal',
        },
        {
            path: './fonts/AvenirLTStd-HeavyOblique.otf',
            weight: '900',
            style: 'italic',
        },
        {
            path: './fonts/AvenirLTStd-Light.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: './fonts/AvenirLTStd-LightOblique.otf',
            weight: '200',
            style: 'italic',
        },
        {
            path: './fonts/AvenirLTStd-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/AvenirLTStd-MediumOblique.otf',
            weight: '500',
            style: 'italic',
        },
        {
            path: './fonts/AvenirLTStd-Roman.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/AvenirLTStd-Oblique.otf',
            weight: '400',
            style: 'italic',
        },
    ],
});

export const metadata: Metadata = {
    title: 'HK Sustain',
    description: 'Sustainable Management for HK Foods',
};

const links = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'Chat',
        url: '/chat',
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="h-full">
            <body className={cn(avenir.className, 'antialiased flex flex-col h-full overflow-hidden')}>
                <LanguageProvider>
                    <AppShell links={links}>{children}</AppShell>
                </LanguageProvider>
            </body>
        </html>
    );
}
