import crypto from "crypto";

export function generateDeviceCode() {
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  return "HP-" + random;
}

export function generateDeviceToken() {
  return `hp_live_${crypto.randomBytes(32).toString("hex")}`;
}
