"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function UserNav() {
  const router = useRouter();
  const { user, logout } = useAuth();

  console.log("ini", user);

  async function handleLogout() {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent transition">
        <Avatar className="h-9 w-9">
          <AvatarFallback>DY</AvatarFallback>
        </Avatar>

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold">{user?.name}</p>

          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuItem>Settings</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
