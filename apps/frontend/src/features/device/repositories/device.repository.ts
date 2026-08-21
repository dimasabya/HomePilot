import api from "@/lib/api";
import { Device } from "../types/device.types";

export class DeviceRepository {
  static async getAll() {
    const res = await api.get("/devices");
    return res.data;
  }

  static async getMyDevices() {
    const res = await api.get("/devices/me");
    return res.data.devices;
  }

  static async getById(id: number) {
    const res = await api.get(`/devices/${id}`);
    return res.data;
  }

  static async updateRelay(id: number, relay: boolean) {
    const res = await api.patch(`/devices/${id}/relay`, {
      relay,
    });

    return res.data;
  }

  static async create(device: any) {
    const res = await api.post("/devices/create", device);
    return res.data;
  }

  static async update(id: number, device: Partial<Device>) {
    const res = await api.patch(`/devices/${id}`, device);

    return res.data;
  }

  static async delete(id: number) {
    const res = await api.delete(`/devices/${id}`);
    return res.data;
  }
}
