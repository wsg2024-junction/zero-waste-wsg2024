import { Card } from '@/components/ui/card';
import { H2 } from '@/components/ui/typography';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="h-full flex flex-col justify-center">
            <div className="my-auto flex items-stretch gap-8">
                <NavigationCard
                    title="Dashboard"
                    href="/dashboard"
                />
                <NavigationCard
                    title="Preproduction Tablet App"
                    href="/preproduction-tablet"
                />
                <NavigationCard
                    title="Manager App"
                    href="/manager-app"
                />
            </div>
        </div>
    );
}

interface NavigationCardProps {
    title: string;
    href: string;
}
function NavigationCard({ title, href }: NavigationCardProps) {
    return (
        <Link
            className="flex-1"
            href={href}>
            <Card className="h-full flex flex-col justify-center content-center p-8">
                <H2 className="m-0 text-center border-none">{title}</H2>
            </Card>
        </Link>
    );
}
