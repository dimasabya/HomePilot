import express from "express";
import cors from "cors";

import healthRoute from "./routes/health.route";
import deviceRoute from "./routes/device.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoute);
app.use("/devices", deviceRoute);

export default app;
