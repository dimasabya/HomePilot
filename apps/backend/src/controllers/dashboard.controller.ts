import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export async function getSummary(req: Request, res: Response) {
  try {
    const summary = await DashboardService.getSummary();

    res.json(summary);
  } catch (error) {
    res.status(500).json({
      message: "Failed get summary",
    });
  }
}
