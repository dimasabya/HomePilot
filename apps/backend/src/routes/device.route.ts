import { Router } from "express";
import {
  deleteDevice,
  DeviceController,
  updateDevice,
  updateRelay,
} from "../controllers/device.controller";
import { deviceAuth } from "../middleware/deviceAuth";
import { authenticate } from "../middleware/auth.middleware";
import { requireDeviceOwnership } from "../middleware/deviceOwnership.middleware";

const router = Router();

router.get("/", DeviceController.getAll);

// router.post("/heartbeat", deviceAuth, heartbeat);
router.post("/heartbeat", deviceAuth, DeviceController.heartbeat);

router.get("/:code/status", deviceAuth, DeviceController.getDeviceStatus);

router.get(
  "/me",
  authenticate,
  requireDeviceOwnership,
  DeviceController.getByUser,
);

router.get("/:id", DeviceController.getById);

router.patch("/:id/relay", authenticate, requireDeviceOwnership, updateRelay);

// router.post("/create", createDevice);
router.post("/create", DeviceController.createDevice);

router.post("/claim", authenticate, DeviceController.claimDevice);

router.patch("/:id", updateDevice);

router.delete("/:id", deleteDevice);

export default router;
