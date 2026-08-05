import DeviceDetailClient from "@/features/device/components/DeviceDetailClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeviceDetailPage({ params }: Props) {
  const { id } = await params;

  return <DeviceDetailClient id={Number(id)} />;
}
