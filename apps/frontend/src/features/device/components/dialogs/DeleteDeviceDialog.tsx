"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deviceName: string;
}

export default function DeleteDeviceDialog({
  open,
  onClose,
  onConfirm,
  deviceName,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Delete Device</h2>

        <p>
          Yakin ingin menghapus
          <strong> {deviceName} </strong>?
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
