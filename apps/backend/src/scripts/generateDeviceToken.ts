import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import prisma from "../prisma/client";

dotenv.config({
  path: path.resolve(process.cwd(), "apps/backend/.env"),
});

const CODE = "ESP32-001";

async function main() {
  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const device = await prisma.device.update({
    where: {
      code: CODE,
    },
    data: {
      deviceTokenHash: tokenHash,
    },
  });

  console.log("Device:", device.code);
  console.log("DEVICE TOKEN:");
  console.log(token);
  console.log("");
  console.log("SIMPAN TOKEN INI. TOKEN TIDAK DISIMPAN PLAINTEXT DI DATABASE.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
