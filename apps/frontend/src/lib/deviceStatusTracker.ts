const previousStatus = new Map<string, boolean>();

export function hasStatusChanged(deviceId: string, online: boolean) {
  const last = previousStatus.get(deviceId);

  previousStatus.set(deviceId, online);

  if (last === undefined) {
    return false;
  }

  return last !== online;
}
