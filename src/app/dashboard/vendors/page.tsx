import Table from "@/components/shared/tables/Table";

const VendorsPage = () => {
  return (
    <div>
      <Table
        titles={["id", "Approval type", "Date", "Approved By", "Status"]}
      />
    </div>
  );
};

export default VendorsPage;
