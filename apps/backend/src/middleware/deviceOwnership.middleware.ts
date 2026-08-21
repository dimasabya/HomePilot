import { Response, NextFunction } from "express";
import prisma from "../prisma/client";
import { AuthRequest } from "./auth.middleware";

export async function requireDeviceOwnership(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const deviceId = Number(req.params.id);

    if (!Number.isInteger(deviceId)) {
      return res.status(400).json({
        message: "Invalid device id",
      });
    }

    const device = await prisma.device.findUnique({
      where: {
        id: deviceId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!device) {
      return res.status(404).json({
        message: "Device tidak ditemukan",
      });
    }

    if (device.userId !== Number(req.user.userId)) {
      return res.status(403).json({
        message: "You do not have access to this device",
      });
    }

    next();
  } catch (error) {
    console.error("Device ownership error:", error);

    return res.status(500).json({
      message: "Failed to verify device ownership",
    });
  }
}
