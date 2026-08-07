import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between md:p-6 p-4">
        <div>
          <p className="md:text-sm text-xs text-muted-foreground">{title}</p>

          <h2 className="mt-2 md:text-3xl text-xl font-bold">{value}</h2>
        </div>

        <div className="rounded-xl bg-primary/10 md:p-3 p-1 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
