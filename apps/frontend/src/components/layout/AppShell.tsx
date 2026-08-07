import SSETest from "../common/SSETest";
import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background h-dvh overflow-hidden">
      <AppSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppNavbar />
        <SSETest />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
