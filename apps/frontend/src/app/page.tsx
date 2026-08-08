"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/Logo.png";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={logo}
          alt="HomePilot"
          width={100}
          height={100}
          className="animate-pulse"
          priority
        />

        <p className="text-sm text-muted-foreground">Loading HomePilot...</p>
      </div>
    </main>
  );
}
