'use client';

import { AppShell } from '@/components/app-shell';
import { usePathname } from 'next/navigation';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return usePathname().endsWith('/dashboard') ? <AppShell links={[]}>{children}</AppShell> : children;
}
