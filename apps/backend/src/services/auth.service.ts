import prisma from "../prisma/client";
import bcrypt from "bcrypt";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  static async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordHash = await bcrypt.compare(password, user.passwordHash);

    if (!passwordHash) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
