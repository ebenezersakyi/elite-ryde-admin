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
  value: number;
  icon: string;
}
export const InfoCardItems: InfoCardProps[] = [
  {
    title: "Vendors",
    icon: "mdi:account",
    value: 234,
  },
  {
    icon: "mdi:users",
    title: "Users",
    value: 97,
  },
  {
    title: "Cars",
    icon: "mdi:car",
    value: 234,
  },
  {
    icon: "mdi:bank-transfer",
    title: "Transactions",
    value: 97,
  },
  {
    title: "Active rentals",
    icon: "mdi:notifications-active",
    value: 234,
  },
];
