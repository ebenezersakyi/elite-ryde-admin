import NavBar from "@/components/navigation/NavBar";
import DataProvider from "@/contexts/DataContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <DataProvider>
      <div className="w-[100vw]  grid grid-cols-12  divide-black/20">
        <NavBar />
        <div className="p-8 border-l-[1px] col-span-10">{children}</div>
      </div>
      </DataProvider>
  );
}
