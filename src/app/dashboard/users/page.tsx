"use client"
import Table from "@/components/shared/tables/Table";
import useFetchData from "@/hooks/useFetchData";
export default function UsersPage() {

  const {data, loading, error} = useFetchData("users")
  if(loading){
    return <p>loading</p>
  }
  if(error){
    return <p>Error: ${error}</p>
  }
  console.log(data);
  
  return (
    <div>
      <Table
        titles={["Name","Email", "Phone number", "Digital Address"]}
        select={[1,3, 4, 5]}
        data={data}
      />
    </div>
  );
}
