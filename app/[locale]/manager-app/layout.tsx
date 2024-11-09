import { AppShell } from '@/components/app-shell';

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
    return <AppShell links={links}>{children}</AppShell>;
}
