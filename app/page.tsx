import { Card } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";

export default function Home() {
  return (
    <Card className="w-full">
      <H1 className="m-4">HK Foods</H1>
      <H1 className="m-4">HK Sustain</H1>
    </Card>
  );
}
