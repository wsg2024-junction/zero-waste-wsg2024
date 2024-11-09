import { Card } from '@/components/ui/card';
import { H2 } from '@/components/ui/typography';
import { Link } from '@/i18n/routing';

export default function Home() {
    return (
        <div className="h-full flex flex-col gap-16 justify-center items-center">
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
    );
}

interface NavigationCardProps {
    title: string;
    href: string;
}
function NavigationCard({ title, href }: NavigationCardProps) {
    return (
        <Link
            className="w-96 h-48"
            href={href}>
            <Card className="h-full flex flex-col justify-center content-center p-8">
                <H2 className="m-0 text-center border-none">{title}</H2>
            </Card>
        </Link>
    );
}
