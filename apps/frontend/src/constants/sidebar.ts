import { LayoutDashboard, Cpu, History, Bot, Settings } from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: Cpu,
  },
  {
    title: "Automation",
    href: "/automation",
    icon: Bot,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
