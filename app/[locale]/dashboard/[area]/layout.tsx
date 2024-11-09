export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className={'mx-8 my-4 flex h-screen'}>{children}</main>;
}
