"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Cpu, Bot, History, Settings } from "lucide-react";
import Image from "next/image";

import logo from "@/assets/Logo.png";

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
    <aside className="flex h-screen md:w-64 w-20 flex-col border-r bg-card">
      {/* <div className="p-6">
        <h1 className="text-xl font-bold">🏠 HomePilot</h1>
      </div> */}

      <div className="border-b p-6 text-center">
        <div className="border w-full">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto bg-blue-600 rounded-xl"
          />
        </div>
        <h1 className="md:text-2xl text-4xl font-bold tracking-tight">
          {/* 🏠 */}
          <span className="md:inline-block hidden">HomePilot</span>
        </h1>

        <p className="mt-1 text-sm text-muted-foreground md:block hidden">
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
              className={`flex items-center gap-3 rounded-xl px-4  py-3 text-sm font-medium transition-all duration-200 
                    ${
                      pathname === menu.href
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
            >
              <Icon size={20} className="m-auto md:m-0" />
              <p className="md:block hidden">{menu.title}</p>
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

          <div className="md:block hidden">
            <p className="text-sm font-semibold">Dimas Yasir</p>

            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
