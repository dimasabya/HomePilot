import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../prisma/client";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // validasi
      if (!name || !email || !password) {
        return res.status(400).json({
          message: "name, email, dan password harus diisi",
        });
      }

      if (typeof name !== "string") {
        return res.status(400).json({
          message: "name harus berupa string",
        });
      }

      if (typeof email !== "string") {
        return res.status(400).json({
          message: "email harus berupa string",
        });
      }

      if (typeof password !== "string") {
        return res.status(400).json({
          message: "password harus berupa string",
        });
      }

      // Validasi name
      if (!name.trim()) {
        return res.status(400).json({
          message: "Nama tidak boleh kosong",
        });
      }

      // Validasi email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          message: "Format email tidak valid",
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          message: "password minimal 8 karakter",
        });
      }

      const user = await AuthService.register(name, email, password);

      return res.status(201).json({
        message: "Registrasi Berhasil",
        user,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Email already in use") {
        return res.status(409).json({
          message: "Email sudah terdaftar",
        });
      }

      console.error("Register error: ", error);

      return res.status(500).json({
        message: "Gagal register",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "email dan password harus diisi",
        });
      }

      if (typeof email !== "string") {
        return res.status(400).json({
          message: "email harus berupa string",
        });
      }

      if (typeof password !== "string") {
        return res.status(400).json({
          message: "password harus berupa string",
        });
      }

      const user = await AuthService.login(email, password);

      const token = generateToken({
        userId: String(user.id),
        role: user.role,
      });

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Login Berhasil",
        user,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid credentials") {
        return res.status(401).json({
          message: "Email atau password salah",
        });
      }

      console.error("Login error: ", error);

      return res.status(500).json({
        message: "Gagal login",
      });
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      message: "Logout Berhasil",
    });
  }

  static async me(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.user.userId),
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "Authentication success",
        user,
      });
    } catch (error) {
      console.error("Auth me error:", error);

      return res.status(500).json({
        message: "Gagal mengambil data user",
      });
    }
  }
}
