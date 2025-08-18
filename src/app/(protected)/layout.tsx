import DesktopSidebar from "@/components/navbar.component";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DesktopSidebar />
      <main style={{ marginLeft: "260px", padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}
