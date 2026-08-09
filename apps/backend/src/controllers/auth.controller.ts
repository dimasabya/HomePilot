import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

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
}
