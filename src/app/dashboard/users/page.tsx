import Table from "@/components/shared/tables/Table";
export default function UsersPage() {
  return (
    <div>
      <Table
        titles={["id", "Approval type", "Date", "Approved By", "Status"]}
      />
    </div>
  );
}
