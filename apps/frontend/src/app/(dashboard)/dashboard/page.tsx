import { Cpu, Thermometer, Power, Wifi } from "lucide-react";

import StatCard from "@/features/dashboard/components/StatCard";
import DeviceCard from "@/features/dashboard/components/DeviceCard";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import { DashboardService } from "@/features/dashboard/services/dashboard.service";

export default function DashboardPage() {
  const stat = DashboardService.getStats();
  const devices = DashboardService.getDevices();
  const activities = DashboardService.getActivities();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">Welcome back to HomePilot</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Devices"
          value={stat.devices}
          icon={<Cpu size={24} />}
        />

        <StatCard
          title="Online"
          value={stat.online}
          icon={<Wifi size={24} />}
        />

        <StatCard
          title="Temperature"
          value={stat.temperature}
          icon={<Thermometer size={24} />}
        />

        <StatCard
          title="Relay"
          value={stat.relay ? "ON" : "OFF"}
          icon={<Power size={24} />}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Devices</h2>
        {devices.map((device) => (
          <DeviceCard key={device.id} {...device} />
        ))}

        {/* <DeviceCard
          name="Living Room Fan"
          room="Living Room"
          online={true}
          temperature={29}
          humidity={72}
          relay={false}
        /> */}
      </div>

      <RecentActivity activities={activities} />
    </div>
  );
}
