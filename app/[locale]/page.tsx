'use client';
import { Card } from '@/components/ui/card';
import { H2, H3, H4 } from '@/components/ui/typography';
import { Link } from '@/i18n/routing';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { User } from '@/lib/models';
import { useUsers } from '@/hooks/useModels';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays } from 'lucide-react';

export default function Home() {
    const users = useUsers();
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        if (Object.keys(users).length === 0) return;
        if (currentUser) return;

        if (localStorage.getItem('user') != null) {
            const cUser = JSON.parse(localStorage.getItem('user') as string);
            onChangeUser(cUser.id);
        } else {
            onChangeUser(Object.keys(users)[0]);
        }
    }, [users]);

    const onChangeUser = (value: string) => {
        const user = Object.values(users).find((user) => user.id === value);
        if (!user) return;
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };
    return (
        <div className={'relative h-full flex flex-col'}>
            <div className="relative  m-1 flex flex-col gap-2 pt-[10vh] h-full items-center overflow-y-auto ">
                <div className={' text-center'}>
                    <h2 className={'text-lg font-bold'}>Hello Stranger! </h2>
                    <p className={'text-center max-w-[600px] px-8'}>
                        This is a demo for an app that is used in a zero-waste factory.
                        <br />
                        You can navigate to the different apps by clicking on the cards below.
                        <br />
                        <br />
                        However, make sure to{' '}
                        <b>
                            <u>select a user</u>
                        </b>{' '}
                        first.
                    </p>
                </div>

                <Select
                    value={currentUser?.id}
                    onValueChange={onChangeUser}>
                    <SelectTrigger className={'w-[15rem]'}>
                        <SelectValue placeholder={'Select a User'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Language</SelectLabel>
                            {Object.keys(users).map((key) => (
                                <SelectItem
                                    key={key}
                                    value={users[key].id}>
                                    <div>
                                        <span>{users[key].name}</span>{' '}
                                        <span className={'opacity-40 text-[0.875rem]'}>
                                            {users[key].role}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className={'flex mt-8 flex-wrap gap-4 mx-auto max-w-[80%] justify-center'}>
                    <NavigationCard
                        title="Dashboard"
                        href="/dashboard"
                        description={
                            "The dashboard provides an overview of the factory's different production status (Pre-Production, Cooking, Storing, Packaging). \n\n" +
                            'It shows the different batches and their current status (like weight, item count, storing time, ...). \n\n' +
                            'It also shows a leaderboard of the most productive workers to engage in a gamified and fun way to increase productivity.'
                        }
                    />
                    <NavigationCard
                        title="Preproduction Tablet App"
                        href="/preproduction-tablet"
                        description={
                            'The Preproduction Tablet App is used by the workers in the preproduction phase. \n\n'
                        }
                    />
                    <NavigationCard
                        disabled={currentUser?.role !== 'manager'}
                        title="Manager App"
                        href="/manager-app"
                        description={
                            "The Manager App enables managers to gain a comprehensive overview of the factory's operations and seamlessly navigate various stages, overcoming language barriers. \n\n" +
                            'They can see the current status of the factory, the producitivty of workers and the different production phases. \n\n' +
                            'Using AI, we also improved communication by providing real-time translation of messages with workers and fellow managers.'
                        }
                    />
                </div>
                <p className={'text-center max-w-[600px] px-8 opacity-50 text-base'}>
                    You can hover over an app card to see a brief description of the app.
                </p>
            </div>
            <div
                className={'p-2 w-full text-center text-sm text-gray-400'}
                style={{ boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.2)' }}>
                <p>
                    Made with ❤️ by <br />
                    Team WorldSkills Germany @ Junction 2024
                </p>
            </div>
        </div>
    );
}

interface NavigationCardProps {
    title: string;
    href: string;
    description: string;
    disabled?: boolean;
}

function NavigationCard({ title, href, description, disabled = false }: NavigationCardProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    className="w-60 h-32"
                    href={href}>
                    <Card
                        className={`${disabled ? 'bg-gray-100' : ''} h-full flex flex-col justify-center content-center p-6`}>
                        <H4 className={`${disabled ? 'opacity-50' : ''} m-0 text-center border-none`}>
                            {title}
                        </H4>
                    </Card>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className={'w-80'}>
                {!disabled ? (
                    <div className={`flex justify-between space-x-4 `}>
                        <div className="space-y-1">
                            <h4 className={`text-sm font-semibold `}>{title}</h4>
                            <p className={`text-sm whitespace-pre-wrap`}>{description}</p>
                        </div>
                    </div>
                ) : (
                    <div>You need to select a &#39;manager&#39; role to navigate to the manager app!</div>
                )}
            </HoverCardContent>
        </HoverCard>
    );
}
