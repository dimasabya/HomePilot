import DeviceList from "@/features/device/components/DeviceList";

export default async function DevicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Devices</h1>

      <DeviceList />
    </div>
  );
}
