import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as JwtLibraryPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

interface JwtPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET!);

    if (
      typeof decoded === "string" ||
      !("userId" in decoded) ||
      !("role" in decoded)
    ) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    req.user = {
      userId: String(decoded.userId),
      role: String(decoded.role),
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
