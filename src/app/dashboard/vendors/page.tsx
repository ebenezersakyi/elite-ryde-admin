"use client"
import Table from "@/components/shared/tables/Table";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";

const VendorsPage = () => {
  const {data, loading, error} = useFetchData("vendors")
  const  {updateVendors}  = useData();

  if(loading){
    return <Spinner/>
  }
  if(error){
    return <p>Error: ${error}</p>
  }

  updateVendors(data)

  return (
    <div>
      <Table
        titles={["Company Name", "Location", "Name",  "TIN"]}
        select={[1,2, 4, 7]}
        data={data}
        route="vendors"
        clickable={true}
      />
    </div>
  );
};

export default VendorsPage;
