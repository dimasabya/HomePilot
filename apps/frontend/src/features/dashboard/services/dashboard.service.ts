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
