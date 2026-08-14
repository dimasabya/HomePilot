import express from "express";
import cors from "cors";

import healthRoute from "./routes/health.route";
import deviceRoute from "./routes/device.route";
import dashboardRoute from "./routes/dashboard.route";
import authRoute from "./routes/aut.route";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins =
  process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()) ?? [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRoute);
app.use("/devices", deviceRoute);
app.use("/dashboard", dashboardRoute);

app.use("/auth", authRoute);

export default app;
