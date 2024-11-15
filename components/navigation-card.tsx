import { Card } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { H4 } from '@/components/ui/typography';
import { Link } from '@/i18n/routing';
import classNames from 'classnames';

interface NavigationCardProps {
    title: string;
    href: string;
    description: string;
    disabled?: boolean;
    className?: string;
}

export function NavigationCard({
    title,
    href,
    description,
    disabled = false,
    className,
}: NavigationCardProps) {
    const card = (
        <Card
            className={classNames(
                `${disabled ? 'bg-gray-100' : ''} h-full flex flex-col justify-center content-center p-6`,
                className,
            )}>
            <H4 className={`${disabled ? 'opacity-50' : ''} m-0 text-center border-none`}>{title}</H4>
        </Card>
    );

    return (
        <HoverCard
            openDelay={500}
            closeDelay={300}>
            <HoverCardTrigger asChild>
                {disabled ? (
                    <div className="w-60 h-32 cursor-not-allowed">{card}</div>
                ) : (
                    <Link
                        className="w-60 h-32"
                        href={href}>
                        {card}
                    </Link>
                )}
            </HoverCardTrigger>
            <HoverCardContent className={'w-80'}>
                <div className={`flex flex-col justify-between`}>
                    <div className="space-y-1">
                        <h4 className={`text-sm font-semibold `}>{title}</h4>
                        <p className={`text-sm whitespace-pre-wrap`}>{description}</p>
                    </div>
                    {disabled && (
                        <div className={'text-red-700 font-bold mt-3'}>
                            {title === 'Manager App'
                                ? 'You need to select a user with the “manager” role to navigate to the manager app!'
                                : 'You need to select a user with the “worker” role to navigate to the tablet app for preproduction area!'}
                        </div>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
