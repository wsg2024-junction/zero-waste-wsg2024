import { Card } from '@/components/ui/card';
import { Coins, Trophy } from 'lucide-react';
import { DashboardTitle } from '@/components/dashboard/dashboard-title';

const data: Score[] = [
    {
        name: 'John Doe',
        score: 120,
    },
    {
        name: 'Max Mustermann',
        score: 75,
    },
    {
        name: 'Jane Doe',
        score: 90,
    },
    {
        name: 'Ace',
        score: 100,
    },
    {
        name: 'Acme',
        score: 50,
    },
    {
        name: 'J. Random X',
        score: -30,
    },
];

export function Leaderboard() {
    return (
        <div className={'bg-teal-400 bg-opacity-50 rounded-xl p-2'}>
            <div className={'flex mb-2 gap-2 justify-center'}>
                <Trophy />
                <DashboardTitle>Leaderboard</DashboardTitle>
            </div>
            <div className={'grid gap-2'}>
                {data.sort(byScore).map((score, idx) => (
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
        <Card className={'p-2 flex justify-between gap-5'}>
            <div className={'flex items-center gap-1'}>
                <span>{score.score}</span>
                <Coins className={'w-4 h-4'} />
            </div>
            <span className={'col-span-2 whitespace-nowrap'}>{score.name}</span>
            <span>{rank}.</span>
        </Card>
    );
}
