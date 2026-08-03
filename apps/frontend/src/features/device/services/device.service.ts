import api from "@/lib/api";

export class DeviceService {
  static async getAll() {
    const res = await api.get("/devices");
    return res.data;
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
}
