import axios from "axios";
import { toast } from "react-toastify";
export interface Iicon {
  title: string;
  link: string;
  icon: string;
  active?: boolean;
}
export const menuItems: Iicon[] = [
  {
    icon: "gg:menu-grid-r",
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    icon: "mdi:user-outline",
    link: "/dashboard/vendors",
    title: "Vendors",
  },
  {
    icon: "mdi:users-outline",
    link: "/dashboard/users",
    title: "Users",
  },
  {
    icon: "material-symbols:verified-user-outline",
    link: "/dashboard/approvals",
    title: "Approvals",
  },
];

export interface InfoCardProps {
  title: string;
  value: string;
  icon: string;
}
// cars: 2

// rentals: 0

// total_transctions: 0

// users: 5

// vendors: 2
export const InfoCardItems: InfoCardProps[] = [
  {
    title: "Vendors",
    icon: "mdi:account",
    value: "vendors",
  },
  {
    icon: "mdi:users",
    title: "Users",
    value: "users",
  },
  {
    title: "Cars",
    icon: "mdi:car",
    value: "cars",
  },
  {
    icon: "mdi:bank-transfer",
    title: "Transactions",
    value: "total_transctions",
  },
  {
    title: "Sucessful Rentals",
    icon: "mdi:notifications-active",
    value: "rentals",
  },
];

export default function formatApprovalType(approval_type: string): string {
  switch (approval_type) {
    case "book_ride":
      return "Rental Booking";
    case "vendor_signup":
      return "Vendor Signup";
    case "user_signup":
      return "User Signup";

    case "add_car":
      return "Car Upload";
    default:
      return "Invalid";
  }
}
export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    // Invalid inputDate
    return "Invalid Date";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${month} - ${day} - ${year}`;
}

export function tableRowData(
  a: string[],
  b: number[],
  date: number | null = null,
  approvalType: number | null = null
): string[] {
  const final_array: string[] = [];
  b.forEach((element, index) => {
    if (index == date) {
      return final_array.push(formatDate(a[element]));
    }
    if (index == approvalType) {
      return final_array.push(formatApprovalType(a[element]));
    }
    final_array.push(a[element]);
  });
  return final_array;
}

export function determineRoute(type: string): string {
  switch (type) {
    case "book_ride":
      return "booking";
    case "vendor_signup":
      return "vendor-signup";
    case "user_signup":
      return "user-signup";
    case "add_car":
      return "car";
  }
  return "";
}
export enum docsEnum {
  document = "Business Registration Document",
}
export function formatContent(p: string = " "): any[] {
  try {
    const data = JSON.parse(p);
    const keys = Object.keys(data);
    const vals = Object.values(data);
    let final_array: any = [];
    let docs: any = [];
    keys.forEach((k, i) => {
      if (Object.keys(docsEnum).includes(k)) {
        docs.push([k, vals[i]]);
      } else {
        final_array.push([k, vals[i]]);
      }
    });

    return [final_array, docs];
  } catch (error) {
    return [error];
  }
}

export function returnDocumentTitle(name: string): string {
  switch (name) {
    case "document":
      return docsEnum.document;
    default:
      return "Invalid";
  }
}

export const baseURL = "https://elite-ryde-admin-api.azurewebsites.net/api";

export async function manageApproval(
  id: string,
  approved: boolean,
  cb: () => void
) {
  try {
    const response = await axios({
      method: "patch",
      url: `${baseURL}/approvals`,
      data: {
        id,
        approved,
      },
    });
    if (response?.data?.status) {
      toast('Approval Managed Succesfully', { hideProgressBar: true, autoClose: 2000, type: 'success' })

    } else {
      toast(response?.data?.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }
  } catch (error: any) {
    toast(error?.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
  }
  finally{
    // cb()
  }
}
