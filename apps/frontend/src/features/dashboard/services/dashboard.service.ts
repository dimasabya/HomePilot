import api from "@/lib/api";
import {
  dashboardActivities,
  dashboardDevices,
  dashboardStats,
} from "../data/dashboard.data";

export const DashboardService = {
  getStats() {
    return dashboardStats;
  },

  getDevices() {
    return dashboardDevices;
  },

  getActivities() {
    return dashboardActivities;
  },
};

export class DashboardServices {
  static async getSummary() {
    const res = await api.get("/dashboard/summary");

    return res.data;
  }
}
