import NavBar from "@/components/navigation/NavBar";
import DataProvider from "@/contexts/DataContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ToastContainer } from "react-toastify";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <DataProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-[100vw]   divide-black/20 flex">
        <NavBar />
        <div className=" flex p-8 border-l-[1px] col-span-10 flex-grow ">{children}</div>
      </div>
      {/* <ToastContainer/> */}
      </DataProvider>
  );
}
