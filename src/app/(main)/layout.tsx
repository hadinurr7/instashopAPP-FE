import DesktopSidebar from "@/components/sidebar.component";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="w-72 border-r border-gray-200">
        <DesktopSidebar />
      </div>
      <main className="flex-1 p-98">{children}</main>
    </div>
  );
}
