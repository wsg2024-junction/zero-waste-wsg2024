import { Card } from '@/components/ui/card';
import { H1 } from '@/components/ui/typography';
import * as deepl from 'deepl-node';
import { deepLConfig } from '@/firebaseConfig';

export default async function Home() {
    return (
        <Card className="w-full">
            <H1 className="m-4">HK Foods</H1>
            <H1 className="m-4">HK Sustain</H1>
        </Card>
    );
}
