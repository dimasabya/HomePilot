"use client";

import { useEffect, useState } from "react";

import DeviceForm, { DeviceFormData } from "./DeviceForm";

import { Device } from "../../types/device.types";
import { DeviceRepository } from "../../repositories/device.repository";
import { useDeviceStore } from "@/store/deviceStore";

interface Props {
  open: boolean;
  device: Device | null;
  onClose: () => void;
}
export default function EditDeviceDialog({ open, device, onClose }: Props) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<DeviceFormData>({
    name: "",
    code: "",
    room: "",
    ip: "",
  });

  const updateDevice = useDeviceStore((state) => state.updateDevice);

  useEffect(() => {
    if (!device) return;

    setForm({
      name: device.name,
      code: device.code,
      room: device.room,
      ip: device.ip,
    });
  }, [device]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    if (!device) return;

    try {
      setSaving(true);

      const updated = await DeviceRepository.update(device.id, form);

      updateDevice(device.id, updated);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (!open || !device) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <h2 className="mb-6 text-xl font-bold">Edit Device</h2>

        <DeviceForm form={form} onChange={handleChange} disabled={saving} />

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} disabled={saving}>
            Cancel
          </button>

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
