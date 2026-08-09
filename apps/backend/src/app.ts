import express from "express";
import cors from "cors";

import healthRoute from "./routes/health.route";
import deviceRoute from "./routes/device.route";
import dashboardRoute from "./routes/dashboard.route";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());

app.use("/health", healthRoute);
app.use("/devices", deviceRoute);
app.use("/dashboard", dashboardRoute);

export default app;
