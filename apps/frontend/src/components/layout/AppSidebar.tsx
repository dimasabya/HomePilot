"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Cpu, Bot, History, Settings } from "lucide-react";

const menus = [
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

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      {/* <div className="p-6">
        <h1 className="text-xl font-bold">🏠 HomePilot</h1>
      </div> */}

      <div className="border-b p-6">
        <h1 className="text-2xl font-bold tracking-tight">🏠 HomePilot</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Smart Home Platform
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-3">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4   py-3 text-sm font-medium transition-all duration-200
                    ${
                      pathname === menu.href
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
            >
              <Icon size={20} />
              {menu.title}
            </Link>
          );
        })}
      </nav>

      {/* footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            DY
          </div>

          <div>
            <p className="text-sm font-semibold">Dimas Yasir</p>

            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
