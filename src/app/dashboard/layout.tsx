import NavBar from "@/components/navigation/NavBar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[100vw]  grid grid-cols-12  divide-black/20">
      <NavBar />
      <div className="p-8 border-l-[1px] col-span-10">{children}</div>
    </div>
  );
}
