"use client";

import { Download } from "lucide-react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

export default function InstallButton() {
  const { install, isInstallable } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <button
      onClick={install}
      className="flex items-center gap-2 rounded-lg bg-blue-600 md:px-4 px-2 md:py-2 text-white transition hover:bg-blue-700"
    >
      <Download size={18} />
      <p className="text-sm">Install App</p>
    </button>
  );
}
