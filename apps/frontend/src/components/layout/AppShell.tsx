import SSETest from "../common/SSETest";
import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <AppNavbar />
        <SSETest />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
