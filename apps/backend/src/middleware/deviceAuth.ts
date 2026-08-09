import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client";

export async function deviceAuth(
  req: Request,
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

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Device authentication failed",
    });
  }
}
