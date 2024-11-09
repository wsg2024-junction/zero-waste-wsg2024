import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/card';
import { H4 } from '@/components/ui/typography';

interface NavigationCardProps {
    title: string;
    href: string;
    description?: string;
}

export function NavigationCard({ title, href, description }: NavigationCardProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    className="w-60 h-32"
                    href={href}>
                    <Card className="h-full flex flex-col justify-center content-center p-6 hover:shadow-md transition">
                        <H4 className="m-0 text-center border-none">{title}</H4>
                    </Card>
                </Link>
            </HoverCardTrigger>
            {description && (
                <HoverCardContent className={'w-80'}>
                    <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{title}</h4>
                            <p className="text-sm whitespace-pre-wrap">{description}</p>
                        </div>
                    </div>
                </HoverCardContent>
            )}
        </HoverCard>
    );
}
