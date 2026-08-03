import { Device } from "../types/device.types";

interface DeviceInfoProps {
  device: Device;
}

export default function DeviceInfo({ device }: DeviceInfoProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-2xl font-bold">{device.name}</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InfoItem title="Code" value={device.code} />

        <InfoItem title="Room" value={device.room} />

        <InfoItem title="IP Address" value={device.ip} />

        <InfoItem title="Status" value={device.online ? "Online" : "Offline"} />
      </div>
    </div>
  );
}

function InfoItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">{title}</p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
