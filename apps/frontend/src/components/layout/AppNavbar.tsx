"use client";

import { Bell } from "lucide-react";
import UserNav from "./UserNav";

export default function AppNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>

        <p className="text-sm text-muted-foreground">Monitor your smart home</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 hover:bg-accent transition">
          <Bell size={20} />
        </button>

        <UserNav />
      </div>
    </header>
  );
}
