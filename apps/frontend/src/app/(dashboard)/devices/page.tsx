import PageTitle from "@/components/common/PageTitle";
import DeviceList from "@/features/device/components/DeviceList";

export default async function DevicesPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Devices" />

      <DeviceList />
    </div>
  );
}
