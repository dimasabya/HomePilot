import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface SensorCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function SensorCard({ title, value, icon }: SensorCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-2xl font-bold">{value}</h2>
        </div>

        <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>
      </CardContent>
    </Card>
  );
}
