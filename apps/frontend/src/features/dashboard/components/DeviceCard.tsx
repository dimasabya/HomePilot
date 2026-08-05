import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Power } from "lucide-react";

interface DeviceCardProps {
  name: string;
  room: string;
  online: boolean;
  // temperature: number;
  // humidity: number;
  relay: boolean;
}

export default function DeviceCard({
  name,
  room,
  online,
  // temperature,
  // humidity,
  relay,
}: DeviceCardProps) {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>

            <p className="text-sm text-muted-foreground">{room}</p>
          </div>

          <Badge variant={online ? "default" : "secondary"}>
            {online ? "Online" : "Offline"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer size={18} />

            <span>30°C</span>
          </div>

          <div className="flex items-center gap-2">
            <Droplets size={18} />

            <span>50%</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <span className="flex items-center gap-2">
            <Power size={18} />
            Relay
          </span>

          <Badge variant={relay ? "default" : "outline"}>
            {relay ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
