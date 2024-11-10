'use client';
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
import { NavigationCard } from '@/components/navigation-card';

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
        <div className="h-full flex flex-col gap-2 mt-[10vh] items-center">
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
                                    <span className={'opacity-40 text-[0.875rem]'}>{users[key].role}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'}>
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
            <div className={'absolute bottom-2 w-full text-center text-sm text-gray-400'}>
                <p>
                    Made with ❤️ by <br />
                    Team WorldSkills Germany @ Junction 2024
                </p>
            </div>
        </div>
    );
}
