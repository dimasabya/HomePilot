import { Power, Thermometer, Droplets } from "lucide-react";
import { DashboardActivity } from "../types/dashboard.types";

const activityIcons: Record<DashboardActivity["type"], typeof Power> = {
  power: Power,
  temperature: Thermometer,
  humidity: Droplets,
};

interface RecentActivityProps {
  activities: DashboardActivity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b md:p-5 p-2">
        <h2 className="font-semibold">Recent Activity</h2>
      </div>

      <div>
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];

          return (
            <div
              key={index}
              className="flex items-center justify-between border-b md:px-5 px-3 md:py-4 py-2 last:border-0 md:text-sm text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon size={18} />
                </div>

                <span>{activity.title}</span>
              </div>

              <span className="md:text-sm text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
