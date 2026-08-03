import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Power, Cpu } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Device } from "../types/device.types";

export default function DeviceCard({
  id,
  name,
  code,
  room,
  online,
  relay,
}: Device) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>

            <p className="text-sm text-muted-foreground">{code}</p>
          </div>

          <Badge variant={online ? "default" : "secondary"}>
            {online ? "Online" : "Offline"}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Cpu size={18} />
            <span>{room}</span>
          </div>

          <div className="flex items-center gap-2">
            <Thermometer size={18} />
            {/* <span>{temperature}°C</span> */}
          </div>

          <div className="flex items-center gap-2">
            <Droplets size={18} />
            {/* <span>{humidity}%</span> */}
          </div>

          <div className="flex items-center gap-2">
            <Power size={18} />
            <span>{relay ? "Relay ON" : "Relay OFF"}</span>
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Link
            href={`/devices/${id}`}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Detail
            <ChevronRight size={16} />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
