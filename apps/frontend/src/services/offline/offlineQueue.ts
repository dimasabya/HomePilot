import { useOfflineQueueStore } from "@/store/offlineQueueStore";
import { IDBPDatabase, openDB } from "idb";

export interface PendingCommand {
  id: string;
  deviceId: string;
  deviceName: string;
  action: string;
  payload?: unknown;
  createdAt: number;
}

let dbPromise: Promise<IDBPDatabase<unknown>> | null = null;

function getDB() {
  if (typeof window === "undefined") {
    return null; // Aman dari SSR
  }

  if (!dbPromise) {
    dbPromise = openDB("homepilot-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("pendingCommands")) {
          db.createObjectStore("pendingCommands", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
  }

  return dbPromise;
}

export async function addCommand(command: PendingCommand) {
  const db = await getDB();

  if (!db) return;

  await db.put("pendingCommands", command);
}

export async function getCommands() {
  const db = await getDB();

  if (!db) return [];

  return db.getAll("pendingCommands");
}

export async function removeCommand(id: string) {
  const db = await getDB();

  if (!db) return;

  await db.delete("pendingCommands", id);

  useOfflineQueueStore.getState().decrease();
}

export async function enqueueRelayCommand(
  deviceId: number,
  relay: boolean,
  deviceName?: string,
) {
  await addCommand({
    id: crypto.randomUUID(),
    deviceId: String(deviceId),
    deviceName: String(deviceName),
    action: relay ? "relay-on" : "relay-off",
    payload: {
      relay,
    },
    createdAt: Date.now(),
  });

  useOfflineQueueStore.getState().increase();
}
