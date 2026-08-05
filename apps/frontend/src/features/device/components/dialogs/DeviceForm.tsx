"use client";

import { ChangeEvent } from "react";

export interface DeviceFormData {
  name: string;
  code: string;
  room: string;
  ip: string;
}

interface Props {
  form: DeviceFormData;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function DeviceForm({
  form,
  disabled = false,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        disabled={disabled}
        placeholder="Device Name"
        className="w-full rounded-lg border p-3"
      />

      <input
        name="code"
        value={form.code}
        onChange={onChange}
        disabled={disabled}
        placeholder="Device Code"
        className="w-full rounded-lg border p-3"
      />

      <input
        name="room"
        value={form.room}
        onChange={onChange}
        disabled={disabled}
        placeholder="Room"
        className="w-full rounded-lg border p-3"
      />

      <input
        name="ip"
        value={form.ip}
        onChange={onChange}
        disabled={disabled}
        placeholder="IP Address"
        className="w-full rounded-lg border p-3"
      />
    </div>
  );
}
