export interface Iicon{
    title: string,
    link: string, 
    icon: string,
    active?: boolean
}
export const menuItems:Iicon[] = [
    {
        icon: "gg:menu-grid-r",
        link: "/dashboard",
        title: "Dashboard"
    },
    {
        icon: "mdi:user-outline",
        link: "/dashboard/vendors",
        title: "Vendors"
    },
    {
        icon: "mdi:users-outline",
        link: "/dashboard/users",
        title: "Users"
    },
    {
        icon: "material-symbols:verified-user-outline",
        link: "/dashboard/approvals",
        title: "Approvals"
    },
]