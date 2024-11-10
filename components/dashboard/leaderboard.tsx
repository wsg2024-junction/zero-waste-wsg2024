import { DashboardTitle } from '@/components/dashboard/dashboard-title';
import { Card } from '@/components/ui/card';
import { useGlobalState, useUsers } from '@/hooks/useModels';
import { Score } from '@/lib/models';
import { Coins, FlameIcon, Trophy } from 'lucide-react';

export function Leaderboard() {
    const users = useUsers();
    const { points } = useGlobalState();

    const scores: LeaderboardEntry[] = Object.entries(points).map(([name, score]) => ({
        name: users[name].name,
        score,
    }));

    return (
        <div className={'bg-teal-400 bg-opacity-50 rounded-xl p-2'}>
            <div className={'flex mb-2 gap-2 justify-center'}>
                <Trophy />
                <DashboardTitle>Leaderboard</DashboardTitle>
            </div>
            <div className={'grid gap-2 grid-cols-[min-content_1fr_min-content]'}>
                {scores.sort(byScore).map((score, idx) => (
                    <ScoreCard
                        key={score.name}
                        score={score}
                        rank={idx + 1}
                    />
                ))}
            </div>
        </div>
    );
}

interface LeaderboardEntry {
    name: string;
    score: Score;
}

function byScore(scoreA: LeaderboardEntry, scoreB: LeaderboardEntry) {
    return scoreB.score.points - scoreA.score.points;
}

interface ScoreCardProps {
    score: LeaderboardEntry;
    rank: number;
}

export function ScoreCard({ score, rank }: ScoreCardProps) {
    return (
        <Card className={'col-span-3 p-2 grid grid-cols-subgrid gap-5'}>
            <div className={'flex items-center gap-1'}>
                <span>{score.score.points}</span>
                <Coins className={'w-4 h-4'} />
            </div>
            <span className={'whitespace-nowrap text-center'}>{score.name}</span>
            <span className="opacity-60 flex items-center">
                {score.score.streak} <FlameIcon />
            </span>
            <span className={'text-end'}>{rank}.</span>
        </Card>
    );
}
