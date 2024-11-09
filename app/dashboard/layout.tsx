import ChatPopover from '@/components/chat/chat-popover';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className={'m-8 flex h-screen'}>{children}</main>
            <ChatPopover />
        </>
    );
}
