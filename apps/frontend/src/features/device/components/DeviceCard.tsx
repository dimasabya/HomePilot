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
        <CardContent className="space-y-5 md:p-6 p-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="md:text-lg text-base font-semibold">
                {device.name}
              </h2>

              <p className="md:text-sm text-xs text-muted-foreground">
                {device.code}
              </p>
            </div>

            <Badge variant={device.online ? "default" : "secondary"}>
              {device.online ? "Online" : "Offline"}
            </Badge>
          </div>

          <div className="md:space-y-3 space-y-2">
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

          <div className="flex justify-end border-t md:pt-4 pt-2 gap-4">
            <Link
              href={`/devices/${device.id}`}
              className="flex items-center gap-2 md:text-sm text-xs font-medium text-primary hover:underline"
            >
              Detail
              <ChevronRight size={16} />
            </Link>
            <button
              onClick={() => onEdit(device)}
              className="rounded-lg border md:px-3 px-2 md:py-2 text-sm md:text-base"
            >
              Edit
            </button>

            <button
              onClick={() => setDeleteOpen(true)}
              className="rounded-lg border border-red-500 md:px-3 px-2 md:py-1 text-sm md:text-base text-red-500"
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
