"use client";
import Table from "@/components/shared/tables/Table";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchHistory from "@/hooks/useFetchHistory";
import useFetchSingle from "@/hooks/useFetchSIngle";
import { getTransactions } from "@/utils";
import { Icon } from "@iconify/react";

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function HistoryPage() {
  const [data, setData] = useState<any>();
  const  {vendorHistory}  = useData();
    const router = useRouter()

    useEffect(() => {
      let data_arr = [];
      let labels_arr = [];
      let border = [];
      let mainColor = [];
      if(vendorHistory){
        console.log('vendorHistory', vendorHistory)
        // vendorHistory?.data?.forEach((elem:any) => {
        //   const color = generateRandomColors();
        //   data_arr.push(elem?.amount);
        //   labels_arr.push(elem?.car);
        //   border.push(color[0]);
        //   mainColor.push(color[1]);
        // })
        setData(vendorHistory)
      }
    }, [vendorHistory])

    function generateRandomColors() {
      // Generate random values for red, green, and blue
      var red = Math.floor(Math.random() * 256);
      var green = Math.floor(Math.random() * 256);
      var blue = Math.floor(Math.random() * 256);
  
      // Create the RGBA color strings with different alpha values
      var color1 = `rgba(${red}, ${green}, ${blue}, 1)`;
      var color2 = `rgba(${red}, ${green}, ${blue}, 0.2)`;
  
      // Return the array of generated colors
      return [color1, color2];
    }

    const RentalDetails = (dataProp:any) => {
      const userShare = dataProp.rental.rentalPrice * 0.9;
      const adminShare = dataProp.rental.rentalPrice * 0.1;
      // const handlePayment = () => {
        
      //   // Implement the logic for processing the payment to user and admin here
      //   console.log(`User Share: ${userShare}`);
      //   console.log(`Admin Share: ${adminShare}`);
      // };
    
      return (
        <div style={{ background: 'white', padding: '20px', margin: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>{dataProp.rental.carName}</h2>
          <p>User: {dataProp.rental.userName}</p>
          <p>Email: {dataProp.rental.userEmail}</p>
          <p>Rental Price: ${dataProp.rental.rentalPrice.toLocaleString()}</p>
          <p>Your Share: ${userShare.toLocaleString()}</p>
          <p>Elite ryde: ${adminShare.toLocaleString()}</p>
          <p>Status: {dataProp.rental.status}</p>
          <p>Pickup Date: {dataProp.rental.pickupDate}</p>
          <p>Return Date: {dataProp.rental.returnDate}</p>
          {/* <button onClick={handlePayment}>Process Payment</button> */}
        </div>
      );
    };
    

  return (
    <div className="w-full h-full mt-[55px]">
    <div className="flex cursor-pointer mb-15" onClick={() => router.back()}>
        <Icon 
          icon={'mdi:arrow-left'} width={25} className={'text-black'} />
        <span className="ml-2 mb-10">back</span>
      </div>
        {/* <span className="mt-30 mb-24 flex">Successful Rentals</span> */}
        {vendorHistory?.length == 0 ? (
          <div className="flex  justify-center items-center mt-20 ">
            <Icon 
                icon={'mdi:clear'} width={115} className={'text-gray-100'} />
            {/* <span className="text-xl text-gray-600 ml-5">Empty</span> */}
          </div>
        ) : (
            // <Table
            //   titles={["Car Name","Vendor Name", "Duration"]}
            //   select={[1,3, 4]}
            //   data={vendorHistory}
            //   clickable={false}
            //   route={''}
            // />
            <>
                  <div className="flex flex-col  w-full gap-4 ">
        <div className="flex flex-col gap-4 col-span-2">
          <div className="flex flex-col sm:grid grid-cols-2 gap-4">
          <section className="border-[#000] border-[1px] rounded-lg text-center py-[3rem] backdrop-blur-sm">
              <p className="text-[1.3rem] font-[50px]">Total this week</p>
              <p className="text-[2.5rem] font-[50px]">
                GHS {data?.week_amount?.toLocaleString()}
              </p>
              <p className="text-[15px] font-[20px] text-gray-500">
                Your share: <b>GHS {(data?.week_amount * 0.9).toLocaleString()}</b>
              </p>
              <p className="text-[15px] font-[20px] text-gray-500">
                Elite ryde: <b>GHS {(data?.week_amount * 0.1).toLocaleString()}</b>
              </p>
              {/* <p className="text-[2.5rem] font-[50px]">
                GHS {data?.week_amount?.toLocaleString()}
              </p> */}
            </section>
            <section className="border-[#000] border-[1px] rounded-lg text-center py-[3rem] backdrop-blur-sm">
              <p className="text-[1.3rem] font-[50px]">Total income earned</p>
              <p className="text-[2.5rem] font-[50px]">
                GHS {data?.amount?.toLocaleString()}
              </p>
              <p className="text-[15px] font-[20px] text-gray-500">
                Your share: <b>GHS {(data?.amount * 0.9).toLocaleString()}</b>
              </p>
              <p className="text-[15px] font-[20px] text-gray-500">
                Elite ryde: <b>GHS {(data?.amount * 0.1).toLocaleString()}</b>
              </p>
            </section>
          </div>

          {/* <div>
            <ActiveRentalTable data={tdata?.data} loading={loading} />
            <p className="font-[100] text-center mt-2">*Active Rentals</p>
          </div> */}
        </div>

        <div className="grid place-items-center w-[100%]">
          {!data ? (
            // <IconLoadingWhite />
            <span>Loading...</span>
          ) : (
            <Doughnut
              data={{
                labels: ["Vendor", "Elite Ryde"],
                datasets: [
                  {
                    label: "GHS: ",
                    data: [data?.amount * 0.9, data?.amount * 0.1],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                    ],
                    // backgroundColor: d?.mainColor,
                    // borderColor: d?.border,
                    borderWidth: 1,
                  },
                ],
              }}
            />
          )}
        </div>

        <div className="">
          {data?.data.map((item:any, index:any) => {
            return (
              <RentalDetails key={item._id} rental={item} />
            )
            })}
        </div>
      </div>
      </>

        )}
    </div>
      );
}
