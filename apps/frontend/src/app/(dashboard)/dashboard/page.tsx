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
import PageTitle from "@/components/common/PageTitle";

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
        <PageTitle title="Dashboard" />

        <p className="text-muted-foreground md:text-sm text-xs">
          Welcome back to HomePilot
        </p>
      </div>

      <div className="grid md:gap-6 gap-2 md:grid-cols-2 xl:grid-cols-4 grid-cols-2">
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
        <h2 className="md:text-xl text-lg font-semibold">Devices</h2>
        {onlineDevice.map((device) => (
          <DeviceCard key={device.id} {...device} />
        ))}
      </div>

      <RecentActivity activities={activities} />
    </div>
  );
}
