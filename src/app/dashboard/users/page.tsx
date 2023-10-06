"use client"
import Table from "@/components/shared/tables/Table";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchData from "@/hooks/useFetchData";

export default function UsersPage() {
  const {data, loading, error} = useFetchData("users")
  const  {updateUsers}  = useData();

  if(loading){
    return <Spinner/>
  }
  if(error){
    return <p>Error: ${error}</p>
  }

  updateUsers(data)

  console.log('data', data);
  
  return (
    <div>
      <Table
        titles={["Name","Email", "Phone number", "Digital Address"]}
        select={[1,3, 4, 5]}
        data={data}
        clickable={true}
        route={'users'}
      />
    </div>
  );
}
