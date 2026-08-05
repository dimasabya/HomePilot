"use client";

import useLocalNotification from "@/hooks/useLocalNotification";

export function useHomePilotNotification() {
  const { sendNotification } = useLocalNotification();

  const relayOn = (device: string) => {
    sendNotification("Relay On", `${device} telah dinyalakan`);
  };

  const relayOff = (device: string) => {
    sendNotification("Relay Off", `${device} telah dimatikan`);
  };

  const temperatureHigh = (device: string, temp: number) => {
    sendNotification("Temperature High", `${device} memiliki suhu ${temp}°C`);
  };

  const humidityHigh = (device: string, humidity: number) => {
    sendNotification(
      "Humidity High",
      `${device} memiliki kelembaban ${humidity}%`,
    );
  };

  const deviceOffline = (device: string) => {
    sendNotification("Device Offline", `${device} tidak dapat diakses`);
  };

  const deviceOnline = (device: string) => {
    sendNotification("Device Online", `${device} telah kembali online`);
  };

  return {
    relayOn,
    relayOff,
    temperatureHigh,
    humidityHigh,
    deviceOffline,
    deviceOnline,
    sendNotification,
  };
}
