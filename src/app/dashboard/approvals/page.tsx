"use client"
import Table from "@/components/shared/tables/Table";
import useFetchCars from "@/hooks/useFetchCars";
export default function ApprovalsPage() {
  const {loading, error, data} = useFetchCars()
  const dd = [
    {
      id: 123, 
      app: "user_signup", 
      d: 1, 
      s: "pending", 
      da: '27-10-2002'
    },
    {
      id: 123, 
      app: "vendor_signup", 
      d: 1, 
      s: "pendingg", 
      da: '27-10-2002'
    },
    {
      id: 123, 
      app: "add_car", 
      d: 1, 
      s: "pending", 
      da: '27-10-2002'
    },
    {
      id: 123, 
      app: "book_ride", 
      d: 1, 
      s: "pending", 
      da: '27-10-2002'
    },
  ]
  if(loading){
    // return <p>loading...</p>
  }

  if(error){
    // return <p>error: {error}</p>
  }
  return (
    <div>
        <Table
          titles={[
            "id",
            "Approval type",
            "Date",
            "Status",
          ]}
          approvalType={1}
          date={4}
          select={[0, 1, 4, 3]}
          data={dd}
        />
    </div>
  );
}
