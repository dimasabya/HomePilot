"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Power, Cpu } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Device } from "../types/device.types";
import { useState } from "react";
import DeleteDeviceDialog from "./dialogs/DeleteDeviceDialog";
import { useDeviceStore } from "@/store/deviceStore";
import { DeviceRepository } from "../repositories/device.repository";

interface Props {
  device: Device;
  onEdit: (device: Device) => void;
}

export default function DeviceCard({ device, onEdit }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const removeDevice = useDeviceStore((state) => state.removeDevice);

  async function handleDelete() {
    try {
      await DeviceRepository.delete(device.id);

      removeDevice(device.id);

      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">{device.name}</h2>

              <p className="text-sm text-muted-foreground">{device.code}</p>
            </div>

            <Badge variant={device.online ? "default" : "secondary"}>
              {device.online ? "Online" : "Offline"}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Cpu size={18} />
              <span>{device.room}</span>
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
              <span>{device.relay ? "Relay ON" : "Relay OFF"}</span>
            </div>
          </div>

          <div className="flex justify-end border-t pt-4 gap-4">
            <Link
              href={`/devices/${device.id}`}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Detail
              <ChevronRight size={16} />
            </Link>
            <button
              onClick={() => onEdit(device)}
              className="rounded-lg border px-3 py-2"
            >
              Edit
            </button>

            <button
              onClick={() => setDeleteOpen(true)}
              className="rounded-lg border border-red-500 px-3 py-1 text-red-500"
            >
              Delete
            </button>
          </div>
        </CardContent>
      </Card>

      <DeleteDeviceDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        deviceName={device.name}
      />
    </>
  );
}
