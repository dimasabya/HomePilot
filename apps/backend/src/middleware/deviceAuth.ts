import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client";

export interface DeviceRequest extends Request {
  device?: {
    id: number;
    code: string;
    userId: number | null;
  };
}

export async function deviceAuth(
  req: DeviceRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Missing device token",
      });
    }

    const token = authorization.substring(7);

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const device = await prisma.device.findUnique({
      where: {
        deviceTokenHash: tokenHash,
      },
    });

    if (!device) {
      return res.status(401).json({
        message: "Invalid device token",
      });
    }

    req.device = {
      id: device.id,
      code: device.code,
      userId: device.userId,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Device authentication failed",
    });
  }
}
