'use client';
import { Card } from '@/components/ui/card';
import { H2 } from '@/components/ui/typography';
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
        <div className="h-full flex flex-col gap-16 justify-center items-center">
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
                                    <span className={'opacity-40 text-[0.875rem]'}>{users[key].role}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
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
