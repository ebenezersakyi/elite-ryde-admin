import Table from "@/components/shared/tables/Table";

const VendorsPage = () => {
  return (
    <div>
      <Table
        titles={["Name", "Date Joined", "Number of Cars", "Number of bookings", "Total Transactions"]}
        select={[]}
        data={[]}
      />
    </div>
  );
};

export default VendorsPage;
