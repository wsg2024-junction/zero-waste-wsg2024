import { AppShell } from '@/components/app-shell';
import ChatPopover from '@/components/chat/chat-popover';

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
    return (
        <>
            <AppShell links={links}>{children}</AppShell>
            <ChatPopover />
        </>
    );
}
