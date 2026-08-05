import { Request, Response } from "express";
import { DeviceService } from "../services/device.service";
import prisma from "../prisma/client";

export class DeviceController {
  static async getAll(req: Request, res: Response) {
    const devices = await DeviceService.getAll();

    res.json(devices);
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const device = await DeviceService.getById(id);

    if (!device) {
      return res.status(404).json({
        message: "Device not found",
      });
    }

    res.json(device);
  }
}

export async function updateRelay(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const { relay } = req.body;

    const device = await DeviceService.updateRelay(id, relay);

    res.json(device);
  } catch (error) {
    res.status(500).json({
      message: "Failed update relay",
    });
  }
}

export async function heartbeat(req: Request, res: Response) {
  try {
    const { code, ip } = req.body;

    const device = await prisma.device.update({
      where: {
        code,
      },

      data: {
        ip,
        online: true,
        lastSeen: new Date(),
      },
    });

    res.json(device);
  } catch (error) {
    res.status(404).json({
      message: "Device not found",
    });
  }
}

export async function getDeviceStatus(req: Request, res: Response) {
  try {
    const { code } = req.params;

    const device = await prisma.device.findUnique({
      where: {
        code,
      },
    });

    if (!device) {
      return res.status(404).json({
        message: "Device not found",
      });
    }

    res.json({
      relay: device.relay,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed get status",
    });
  }
}

export async function createDevice(req: Request, res: Response) {
  try {
    const { name, code, room, ip } = req.body;

    const device = await prisma.device.create({
      data: {
        name,
        code,
        room,
        ip,
      },
    });

    res.json(device);
  } catch (error) {
    res.status(500).json({
      message: "Failed create device",
    });
  }
}

export async function updateDevice(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const { name, code, room, ip } = req.body;

    const device = await prisma.device.update({
      where: {
        id,
      },

      data: {
        name,
        code,
        room,
        ip,
      },
    });

    res.json(device);
  } catch (error) {
    res.status(500).json({
      message: "Failed update device",
    });
  }
}

export async function deleteDevice(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    await DeviceService.deleteDevice(id);

    res.json({
      message: "Device deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed delete device",
    });
  }
}
