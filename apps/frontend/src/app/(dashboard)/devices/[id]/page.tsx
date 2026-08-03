import { notFound } from "next/navigation";

import { DeviceService } from "@/features/device/services/device.service";

import DeviceInfo from "@/features/device/components/DeviceInfo";
import RelayControl from "@/features/device/components/RelayControl";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeviceDetailPage({ params }: Props) {
  const { id } = await params;

  const device = await DeviceService.getById(Number(id));

  if (!device) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DeviceInfo device={device} />

      <RelayControl device={device} />
    </div>
  );
}
