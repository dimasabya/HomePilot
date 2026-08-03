import { Card, CardContent } from "@/components/ui/card";

interface Props {
  label: string;
  value: string;
}

export default function DeviceInfoCard({ label, value }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <span className="text-muted-foreground">{label}</span>

        <span className="font-semibold">{value}</span>
      </CardContent>
    </Card>
  );
}
