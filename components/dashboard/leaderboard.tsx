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
                <h2 className={`text-xl`}>Leaderboard</h2>
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
        <Card className={'col-span-3 p-2 grid grid-rows-2 grid-cols-4'}>
            <p className="row-span-2 align-middle text-xl self-center font-semibold">{rank}.</p>
            <p className="col-span-3">{score.name}</p>
            <div className="col-span-3 flex flex-row items-baseline gap-2">
                <div className={'flex items-center'}>
                    <Coins className={'w-4 h-4'} />
                    <span>
                        {score.score.points > 100
                            ? Math.round(score.score.points)
                            : Math.round(score.score.points * 10) / 10}
                    </span>
                </div>
                <div className="flex items-center">
                    <FlameIcon className={'w-4 h-4'} />
                    <span>{score.score.streak}</span>
                </div>
            </div>
        </Card>
    );
}
