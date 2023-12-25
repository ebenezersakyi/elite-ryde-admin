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
  {
    icon: "mdi:road",
    link: "/dashboard/trips",
    title: "Trips",
  },
  {
    icon: "material-symbols:mail",
    link: "/dashboard/user-feedback",
    title: "User Feedback",
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
export const mainURL = "https://elite-ryde-management-api.azurewebsites.net/api";

export async function manageApproval(
  id: string,
  approved: boolean,
  // cb: () => void
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
    console.log(response)
    return response?.data?.status
    // if (response?.data?.status) {
    //   // toast('Approval Managed Succesfully', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    //   toast('Approval Managed Succesfully!'); 
    // } else {
    //   // toast(response?.data?.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    //   toast.error(response?.data?.message); 
    // }
  } catch (error: any) {
    toast(error?.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
  }
  finally{
    // cb()
  }
}

export async function getTransactions(
  id: string,
) {
  console.log('id', id)
  console.log('getting transacs')
  try {
    // const response = await axios({
    //   method: "get", 
    //   url: `https://elite-ryde-management-api.azurewebsites.net/api/get-vendor-transactions?id=${id}`,
    // });

    const response = await axios({
      url: `https://elite-ryde-management-api.azurewebsites.net/api/get-vendor-transactions?id=${id}`,
      method: "get",
    });
    if (response?.data?.status) {
      // setData(response?.data);
      console.log('history',response?.data)
      return response.data
    }
    // if (response?.data?.status) {
      
    // } else {
    //   toast(response?.data?.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    // }
  } catch (error: any) {
    console.log(error)
    // toast(error?.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
  }
  finally{
    // cb()
  }
}

export async function sendEmail(to:any, text:any, subject:any) {
  const form_data = {
    to,
    text,
    subject,
  };

  try {
    const response = await axios.post(`http://localhost:4000/send-email`, form_data);
    console.log("Status Code:", response.status);
    toast('Approval Email Sent!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });    
  } catch (error) {
    console.error("Error:", error);
    // toast('Error Sending Email', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    toast('Error Sending Email', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: 'error'
      });   
    // Handle errors here
  }
}

