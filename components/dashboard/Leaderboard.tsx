import { Card } from '@/components/ui/card';
import { Coins, Trophy } from 'lucide-react';
import { DashboardTitle } from '@/components/dashboard/dashboard-title';
import { useGlobalState, useUsers } from '@/hooks/useModels';

export function Leaderboard() {
    const users = useUsers();
    const { points } = useGlobalState();

    const scores: Score[] = Object.entries(points).map(([name, score]) => ({
        name: users[name].name,
        score
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

interface Score {
    name: string;
    score: number;
}

function byScore(scoreA: Score, scoreB: Score) {
    return scoreB.score - scoreA.score;
}

interface ScoreCardProps {
    score: Score;
    rank: number;
}

export function ScoreCard({ score, rank }: ScoreCardProps) {
    return (
        <Card className={'col-span-3 p-2 grid grid-cols-subgrid gap-5'}>
            <div className={'flex items-center gap-1'}>
                <span>{score.score}</span>
                <Coins className={'w-4 h-4'} />
            </div>
            <span className={'whitespace-nowrap text-center'}>{score.name}</span>
            <span className={"text-end"} >{rank}.</span>
        </Card>
    );
}
