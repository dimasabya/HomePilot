import { useOfflineQueueStore } from "@/store/offlineQueueStore";
import { getCommands } from "../offline/offlineQueue";

export async function refreshPendingCount() {
  const commands = await getCommands();

  useOfflineQueueStore.getState().setPending(commands.length);
}
