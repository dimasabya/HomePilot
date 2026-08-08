import { DeviceRepository } from "../repositories/device.repository";

export class DeviceService {
  static async getAll() {
    return DeviceRepository.getAll();
  }

  static async getById(id: number) {
    return DeviceRepository.getById(id);
  }

  static async updateRelay(id: number, relay: boolean) {
    return DeviceRepository.updateRelay(id, relay);
  }

  static async create(payload: unknown) {
    return DeviceRepository.create(payload);
  }

  static async update(id: number, payload: unknown) {
    return DeviceRepository.update(id, payload as any);
  }

  static async delete(id: number) {
    return DeviceRepository.delete(id);
  }
}
