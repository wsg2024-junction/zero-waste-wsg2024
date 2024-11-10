import { AppShell } from '@/components/app-shell';

const links = [
    {
        name: 'Home',
        url: '/',
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AppShell links={links}>{children}</AppShell>;
}
