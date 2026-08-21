import { Request, Response } from "express";
import { DeviceService } from "../services/device.service";
import prisma from "../prisma/client";
import crypto from "crypto";
import { AuthRequest } from "../middleware/auth.middleware";

import { DeviceRequest } from "../middleware/deviceAuth";

export class DeviceController {
  static async getAll(req: Request, res: Response) {
    const devices = await DeviceService.getAll();

    res.json(devices);
  }

  static async getByUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      const userId = Number(req.user.userId);
      const devices = await DeviceService.getByUser(userId);

      return res.status(200).json({
        message: "User devices retrieved successfully",
        devices,
      });
    } catch (error) {
      console.error("Get user device error: ", error);

      return res.status(500).json({
        message: "Failed to get user devices",
      });
    }
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

  static async createDevice(req: Request, res: Response) {
    try {
      const { name, room, ip } = req.body;

      if (!name || !room || !ip) {
        return res.status(400).json({
          message: "name, room, dan ip harus diisi",
        });
      }

      if (
        typeof name !== "string" ||
        typeof room !== "string" ||
        typeof ip !== "string"
      ) {
        return res.status(400).json({
          message: "name, room, dan ip harus berupa string",
        });
      }

      const result = await DeviceService.crateDevice(name, room, ip);

      return res.status(201).json({
        message: "Device berhasil dibuat",
        ...result,
      });
    } catch (error) {
      console.error("Create device error:", error);

      return res.status(500).json({
        message: "Gagal membuat device",
      });
    }
  }

  static async claimDevice(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      const { code } = req.body;

      if (!code) {
        return res.status(400).json({
          message: "code harus diisi",
        });
      }

      if (typeof code !== "string") {
        return res.status(400).json({
          message: "code harus berupa string",
        });
      }

      const device = await DeviceService.claimDevice(
        code.trim().toUpperCase(),
        Number(req.user.userId),
      );

      return res.status(200).json({
        message: "Device claimed",
        device,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Device not found") {
        return res.status(404).json({
          message: "Device not found",
        });
      }

      if (
        error instanceof Error &&
        error.message === "Device already claimed"
      ) {
        return res.status(400).json({
          message: "Device already claimed",
        });
      }

      console.error("Claim device error:", error);
      return res.status(500).json({
        message: "Gagal mengklaim device",
      });
    }
  }

  static async heartbeat(req: DeviceRequest, res: Response) {
    try {
      if (!req.device) {
        return res.status(401).json({
          message: "Device authentication required",
        });
      }

      const device = await DeviceService.heartbeat(req.device.id);

      return res.status(200).json({
        message: "Heartbeat received",
        device,
      });
    } catch (error) {
      console.error("Heartbeat error:", error);

      return res.status(500).json({
        message: "Heartbeat failed",
      });
    }
  }

  static async getDeviceStatus(req: DeviceRequest, res: Response) {
    try {
      if (!req.device) {
        return res.status(401).json({
          message: "Device authentication required",
        });
      }

      const device = await prisma.device.findUnique({
        where: {
          id: req.device.id,
        },
        select: {
          id: true,
          code: true,
          online: true,
          relay: true,
          lastSeen: true,
        },
      });

      if (!device) {
        return res.status(404).json({
          message: "Device tidak ditemukan",
        });
      }

      return res.status(200).json({
        device,
      });
    } catch (error) {
      console.error("Get device status error:", error);

      return res.status(500).json({
        message: "Gagal mengambil status device",
      });
    }
  }
}

// export async function updateRelay(req: Request, res: Response) {
//   try {
//     const id = Number(req.params.id);

//     const { relay } = req.body;

//     if (typeof relay !== "boolean") {
//       return res.status(400).json({
//         message: "relay must be a boolean",
//       });
//     }

//     const device = await DeviceService.updateRelay(id, relay);

//     res.json(device);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed update relay",
//     });
//   }
// }
export async function updateRelay(req: AuthRequest, res: Response) {
  try {
    const deviceId = Number(req.params.id);
    const { relay } = req.body;

    if (typeof relay !== "boolean") {
      return res.status(400).json({
        message: "relay harus berupa boolean",
      });
    }

    const device = await DeviceService.updateRelay(deviceId, relay);

    return res.status(200).json({
      message: "Relay berhasil diperbarui",
      device,
    });
  } catch (error) {
    console.error("Update relay error:", error);

    return res.status(500).json({
      message: "Gagal memperbarui relay",
    });
  }
}

// export async function heartbeat(req: Request, res: Response) {
//   try {
//     const { code, ip } = req.body;

//     const device = await prisma.device.update({
//       where: {
//         code,
//       },

//       data: {
//         ip,
//         online: true,
//         lastSeen: new Date(),
//       },
//     });

//     res.json(device);
//   } catch (error) {
//     res.status(404).json({
//       message: "Device not found",
//     });
//   }
// }

// export async function getDeviceStatus(req: Request, res: Response) {
//   try {
//     const { code } = req.params;

//     const device = await prisma.device.findUnique({
//       where: {
//         code,
//       },
//     });

//     if (!device) {
//       return res.status(404).json({
//         message: "Device not found",
//       });
//     }

//     res.json({
//       relay: device.relay,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed get status",
//     });
//   }
// }

// export async function createDevice(req: Request, res: Response) {
//   try {
//     const { name, code, room, ip } = req.body;

//     const deviceToken = crypto.randomBytes(32).toString("hex");

//     const deviceTokenHash = crypto
//       .createHash("sha256")
//       .update(deviceToken)
//       .digest("hex");

//     const device = await prisma.device.create({
//       data: {
//         name,
//         code,
//         room,
//         ip,
//         deviceTokenHash,
//       },
//     });

//     res.status(201).json({ device, deviceToken });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed create device",
//     });
//   }
// }

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
