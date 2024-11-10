import { AppShell } from '@/components/app-shell';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AppShell links={[]}>{children}</AppShell>;
}
