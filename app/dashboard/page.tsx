import { Dashboard } from '@/components/dashboard/dashboard';
import { Separator } from '@/components/ui/separator';
import { Leaderboard } from '@/components/dashboard/Leaderboard';

export default function DashboardPage() {
    return (
        <div className={'grid grid-cols-[1fr_min-content_max-content] grid-rows-[1fr_min-content] w-full'}>
            <Dashboard />
            <Separator
                orientation={'vertical'}
                className={'mr-2'}
            />
            <Leaderboard />
            <footer className={'mt-2 col-span-3 text-center'}>Footer</footer>
        </div>
    );
}
