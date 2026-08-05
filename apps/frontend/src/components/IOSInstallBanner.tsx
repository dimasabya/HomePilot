"use client";

import { useIOSInstall } from "@/hooks/useIOSInstall";

export default function IOSInstallBanner() {
  const { isIOS, isStandalone } = useIOSInstall();

  if (!isIOS || isStandalone) return null;

  return (
    <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm">
      <h3 className="mb-2 font-semibold">Install HomePilot</h3>

      <p>Untuk menginstal aplikasi di iPhone atau iPad:</p>

      <ol className="mt-2 list-decimal pl-5 space-y-1">
        <li>Tekan tombol Share Safari.</li>
        <li>
          Pilih <b>Add to Home Screen</b>.
        </li>
        <li>
          Tekan <b>Add</b>.
        </li>
      </ol>
    </div>
  );
}
