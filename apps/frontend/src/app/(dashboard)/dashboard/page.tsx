"use client";

import { Cpu, Power, Thermometer, Wifi } from "lucide-react";

import DeviceCard from "@/features/dashboard/components/DeviceCard";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import StatCard from "@/features/dashboard/components/StatCard";
import {
  DashboardService,
  DashboardServices,
} from "@/features/dashboard/services/dashboard.service";
import { useDashboardStore } from "@/store/dashboardStore";
import { useDeviceStore } from "@/store/deviceStore";
import { useEffect } from "react";

export default function DashboardPage() {
  const stat = DashboardService.getStats();
  const devices = DashboardService.getDevices();
  const activities = DashboardService.getActivities();

  const devicesOnline = useDeviceStore((state) => state.devices);

  const onlineDevice = devicesOnline.filter((device) => device.online);
  console.log(onlineDevice);
  console.log(devicesOnline);

  const relayOnDevice = devicesOnline.filter((d) => d.relay);

  const setSummary = useDashboardStore((state) => state.setSummary);

  const { offlineDevices, onlineDevices, relayOff, relayOn, totalDevices } =
    useDashboardStore();

  useEffect(() => {
    async function load() {
      const summary = await DashboardServices.getSummary();

      setSummary(summary);
    }

    load();
  }, [setSummary]);

  console.log(setSummary);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">Welcome back to HomePilot</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Devices"
          value={totalDevices}
          icon={<Cpu size={24} />}
        />

        <StatCard
          title="Online"
          value={onlineDevices}
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
        {onlineDevice.map((device) => (
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
