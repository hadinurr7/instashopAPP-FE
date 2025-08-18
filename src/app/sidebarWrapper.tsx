"use client";

import { usePathname } from "next/navigation";
import DesktopSidebar from "@/components/sidebar.component";

export default function SidebartWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/login", "/register", "/forgot-password"];
  const showSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <>
      {showSidebar && <DesktopSidebar />}
      <main style={{ marginLeft: showSidebar ? "260px" : "0", padding: "20px" }}>
        {children}
      </main>
    </>
  );
}
