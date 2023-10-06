"use client"
import Table from "@/components/shared/tables/Table";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchApprovals from "@/hooks/useFetchApprovals";
import useFetchCars from "@/hooks/useFetchCars";
import { useEffect } from "react";

export default function ApprovalsPage() {
  const {approvals, setApprovalsFunc} = useData()
  // const {loading, error, data} = useFetchCars()
  const {loading, error, data} = useFetchApprovals()

  // if(data && data !== undefined){
  //   console.log('data-approvals', data)
  // }

  const arrayOfObjects = [];


for (let key in data) {
  if (data.hasOwnProperty(key) && key !== "content") {
    arrayOfObjects.push(data[key]);
  }
}

const removeUndefined= arrayOfObjects.filter((item) => {
  return item !== undefined
})

useEffect(() => {
  console.log('removeUndefined', removeUndefined);
  setApprovalsFunc(removeUndefined)
}, [data])



  
  if(loading){
    return <Spinner/>
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
          data={removeUndefined}
          route={`approvals`}
          clickable={true}
        />
    </div>
  );
}
