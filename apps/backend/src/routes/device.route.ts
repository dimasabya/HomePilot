import { Router } from "express";
import {
  DeviceController,
  updateRelay,
  heartbeat,
  getDeviceStatus,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/device.controller";

const router = Router();

router.get("/", DeviceController.getAll);

router.post("/heartbeat", heartbeat);

router.get("/:code/status", getDeviceStatus);

router.get("/:id", DeviceController.getById);

router.patch("/:id/relay", updateRelay);

router.post("/create", createDevice);

router.patch("/:id", updateDevice);

router.delete("/:id", deleteDevice);

export default router;
