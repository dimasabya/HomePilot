import crypto from "crypto";
import prisma from "../prisma/client";
import { generateDeviceCode, generateDeviceToken } from "../utils/device";

export class DeviceService {
  static async updateOfflineDevice() {
    const timeout = new Date(Date.now() - 30 * 1000);

    await prisma.device.updateMany({
      where: {
        online: true,
        OR: [
          {
            lastSeen: {
              lt: timeout,
            },
          },
          {
            lastSeen: null,
          },
        ],
      },

      data: {
        online: false,
      },
    });
  }

  static async getAll() {
    await this.updateOfflineDevice();

    return prisma.device.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getByUser(userId: number) {
    return prisma.device.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getById(id: number) {
    await this.updateOfflineDevice();

    return prisma.device.findUnique({
      where: {
        id,
      },
    });
  }

  static async updateRelay(id: number, relay: boolean) {
    return prisma.device.update({
      where: {
        id,
      },

      data: {
        relay,
      },
    });
  }

  static async deleteDevice(id: number) {
    return prisma.device.delete({
      where: {
        id,
      },
    });
  }

  static async crateDevice(name: string, room: string, ip: string) {
    const code = generateDeviceCode();

    const deviceToken = generateDeviceToken();

    const deviceTokenHash = crypto
      .createHash("sha256")
      .update(deviceToken)
      .digest("hex");

    const device = await prisma.device.create({
      data: {
        name,
        code,
        room,
        ip,
        deviceTokenHash,
      },
    });

    return {
      device: {
        id: device.id,
        name: device.name,
        code: device.code,
        room: device.room,
        ip: device.ip,
        online: device.online,
        relay: device.relay,
      },
      deviceToken,
    };
  }

  static async claimDevice(code: string, userId: number) {
    const device = await prisma.device.findUnique({
      where: {
        code,
      },
    });

    if (!device) throw new Error("Device not found");

    if (device.userId !== null) {
      throw new Error("Device already claimed");
    }

    const updateDevice = await prisma.device.update({
      where: {
        id: device.id,
      },
      data: {
        userId,
      },
    });

    return {
      id: updateDevice.id,
      name: updateDevice.name,
      code: updateDevice.code,
      room: updateDevice.room,
      ip: updateDevice.ip,
      online: updateDevice.online,
      relay: updateDevice.relay,
    };
  }

  static async heartbeat(deviceId: number) {
    return prisma.device.update({
      where: {
        id: deviceId,
      },
      data: {
        online: true,
        lastSeen: new Date(),
      },
      select: {
        id: true,
        code: true,
        online: true,
        lastSeen: true,
      },
    });
  }
}
