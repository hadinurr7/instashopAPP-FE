import DesktopSidebar from "@/components/sidebar.component";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DesktopSidebar />
      <main style={{ marginLeft: "260px" }}>{children}</main>
    </div>
  );
}
