import { DeviceService } from "@/features/device/services/device.service";
import { getCommands, removeCommand } from "@/services/offline/offlineQueue";

export async function processOfflineQueue() {
  const commands = await getCommands();

  if (commands.length === 0) {
    return;
  }

  console.log(`Processing ${commands.length} commands...`);

  for (const command of commands) {
    try {
      switch (command.action) {
        case "relay-on":
        case "relay-off":
          const response = await fetch("/api/offline-sync", {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(command),
          });

          if (!response.ok) {
            throw new Error("Sync gagal");
          }

          await removeCommand(command.id);

          console.log(
            `Synced ${command.action} for device ${command.deviceId}`,
          );

          break;
      }
    } catch (err) {
      console.error("Sync failed:", err);

      // Jangan hapus command.
      // Nanti dicoba lagi saat online berikutnya.
    }
  }
}
