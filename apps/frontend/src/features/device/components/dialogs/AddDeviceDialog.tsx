"use client";

import { useDeviceStore } from "@/store/deviceStore";
import { useState } from "react";
import { Device } from "../../types/device.types";
import { DeviceRepository } from "../../repositories/device.repository";
import DeviceForm from "./DeviceForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddDeviceDialog({ open, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    room: "",
    ip: "",
    // firmware: "",
  });
  const [saving, setSaving] = useState(false);

  const addDevice = useDeviceStore((state) => state.addDevice);

  async function handleSave() {
    try {
      setSaving(true);

      const created: Device = await DeviceRepository.create(form);

      addDevice(created);

      onClose();

      setForm({
        name: "",
        code: "",
        room: "",
        ip: "",
        // firmware: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <h2 className="mb-6 text-xl font-bold">Add Device</h2>

        <DeviceForm
          form={form}
          onChange={(e) =>
            setForm({
              ...form,
              [e.target.name]: e.target.value,
            })
          }
          disabled={saving}
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-primary px-4 py-2 text-white disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
