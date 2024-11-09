import { Card } from '@/components/ui/card';
import { Coins, Trophy } from 'lucide-react';

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
        <div>
            <div className={'flex mb-2 gap-2 justify-center'}>
                <Trophy />
                <h2>Leaderboard</h2>
            </div>
            <div className={'grid gap-2'}>
                {data.sort(byScore).map((score) => (
                    <ScoreCard
                        key={score.name}
                        {...score}
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

export function ScoreCard(props: Score) {
    return (
        <Card className={'p-2 grid grid-cols-[min-content_1fr] items-center gap-1'}>
            <span className={'col-span-2 whitespace-nowrap'}>{props.name}</span>
            <Coins className={'w-4 h-4'} />
            <span>{props.score}</span>
        </Card>
    );
}
