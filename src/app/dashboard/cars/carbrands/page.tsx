"use client"
import Table from "@/components/shared/tables/Table";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchFeedback from "@/hooks/useFetchFeedback";
import { useRouter } from "next/navigation";
import useFetchCars from "@/hooks/useFetchApprovals";
import { useEffect, useState } from "react";
import TableHeader from "@/components/shared/tables/components/TableHeader";
import { Icon } from "@iconify/react/dist/iconify.js";
import useFetchSessions from "@/hooks/useFetchSessions";
import Image from "next/image";
import arrow from "../../../assets/icons/arrow.png";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { toast } from "react-toastify";
import axios from "axios";
import { baseURL, mainURL } from "@/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserFeedbackPage() {
  const [currentFilter, setCurrentFilter] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const [showAddModelPopUp, setShowAddModelPopUp] = useState(false)
  const [brandName, setBrandName] = useState('')
  const [modelName, setModelName] = useState('')
  const [brands, setbrands] = useState([])
  const [activeBrand, setActiveBrand] = useState(Object)
  const router = useRouter();
  const {approvals, setApprovalsFunc, vendors} = useData()
  
  const filters = ['All', 'Completed', 'On Going']

  const {loading, error, data} = useFetchSessions()


  useEffect(() => {
    // console.log('useFetchApprovals', data)
    getBrands()
}, [])

// const DropDown = () => {
//     return(
//         <div className="relative z-10 ml-[20px]">
//         <span 
//           className="p-2 font-[200] border-[1px] inline-grid grid-cols-2 gap-4 w-max items-center"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span className="" >
//             <span className="">{currentFilter}</span>
//           </span>
//           {/* <select className="" >
//             <option className="" value="Today">{period}</option>
//           </select> */}
//           <Image
//             src={arrow}
//             width={15}
//             alt="arrow"
//             className="justify-self-end  inline-block"
//           />
//         </span>
//         {menuOpen && 
//         <div className=" absolute top-10 right-0 bg-white shadow z-3 gap-4 w-max">
//           {filters.map((item, index) => {
//             return(
//               <div
//               key={index}
//                 className="cursor-pointer hover:bg-gray-200 py-1 px-4 text-black text-sm"
//                 onClick={(e) => {
//                     setCurrentFilter(item); 
//                   setMenuOpen(false);
//                 //   updateFecentApprovalsFilter(item)
//                 }}
//               >
//                 {item}
//               </div>
//             )
//           })}
//           </div>
//         }
//       </div>
//     )
// }


  
//   if(loading ){
//     return <Spinner/>
//   }

const getBrands = async () => {
    try {
        const response = await axios.get(`${mainURL}/getBrands`)
        console.log('Response:', response.data);
        setbrands(response.data?.data)
    } catch (error: any) {
        toast.error(error.message)
   
    }
}

const addBrand = async () => {
    try {
        if(brandName.length == 0){
            toast.error('Please enter a car brand')
            return;
        }else{
            const response = await axios.post(`${mainURL}/addBrandOrModel`, {
                brand:brandName
            })
            console.log('Response:', response.data);
            getBrands()
            setShowPopUp(false)
            toast.success('Success')
        }
        
    } catch (error: any) {
        toast.error(error)
    }
}
const addModel
 = async () => {
    try {
        if(modelName.length == 0){
            toast.error('Please enter a car brand')
            return;
        }else{
            const response = await axios.post(`${mainURL}/addBrandOrModel`, {
                model:modelName, 
                _id: activeBrand._id
            })
            console.log('Response:', response.data);
            getBrands()
            setShowAddModelPopUp(false)
            toast.success('Success')
        }
        
    } catch (error: any) {
        toast.error(error)
    }
}

const deleteModel
 = async (modelName:any, _id:any) => {
    try {
        if(modelName.length == 0){
            toast.error('Please enter a car brand')
            return;
        }else{
            const response = await axios.post(`${mainURL}/deleteBrandOrModel`, {
                model:modelName, 
                _id: _id
            })
            console.log('Response:', response.data);
            getBrands()
            // setShowAddModelPopUp(false)
            toast.success('Success')
        }
        
    } catch (error: any) {
        toast.error(error)
    }
}

const deleteBrand
 = async (_id:any) => {
    try {
        if(modelName.length == 0){
            toast.error('Please enter a car brand')
            return;
        }else{
            const response = await axios.post(`${mainURL}/deleteBrandOrModel`, {
                _id: _id
            })
            console.log('Response:', response.data);
            getBrands()
            // setShowAddModelPopUp(false)
            toast.success('Success')
        }
        
    } catch (error: any) {
        toast.error(error)
    }
}

const Brands = (prop:any) => {
    const [showModel, setShowModel] = useState(false);

    const item = prop.item
    const index = prop.index
    const models = item.models
    return(
        <div 
        className="w-[30%] m-[10px]"
    >
        <div 
            key={index}
            className="w-[100%] p-[10px] justify-between items-center flex rounded-lg bg-slate-300 "
            // onClick={() => {setShowAddModelPopUp(true); setActiveBrand(item)}}
        >
            
            <Icon
                icon={'mdi:close'} width={20} className={'text-white ml-[5px] cursor-pointer bg-black p-[5px] rounded-full'} 
                onClick={() => {
                    deleteBrand(item._id)
                }}
            />
            {item.brand}
            <Icon
                icon={`mdi:chevron-${showModel?'up':'down'}`} width={20} className={'text-black ml-[5px] cursor-pointer'} 
                onClick={() => {
                    setShowModel(!showModel)
                }}
            />
        </div>

        {showModel && (
            <div>
                {models?.map((item2:any, index:any) => {
                    return(
                        <div
                            key={index}
                            className="p-[10px] my-[7px] text-center rounded-lg justify-between items-center flex bg-red-300"
                        >
                            <span className="flex-grow-1 text-center">{item2}</span>
                            <Icon
                                icon={'mdi:close'} width={20} className={'text-white ml-[5px] cursor-pointer bg-black p-[5px] rounded-full'} 
                                onClick={() => {
                                    deleteModel(item2,item._id)
                                }}
                            />
                        </div>
                    )
                })}
                <div
                    // key={index}
                    className="cursor-pointer flex p-[10px] my-[7px] rounded-lg justify-center items-center bg-transparent border-dashed border-[1px] border-black"
                    onClick={() => {setShowAddModelPopUp(true); setActiveBrand(item)}}
                >
                                                <Icon
                    icon={'mdi:plus'} width={20} className={'text-black ml-[5px] cursor-pointer'} 
                />
                    New Model
                </div>

            </div>

        )}
    </div>
    )
}

  return (
    <div className="flex flex-col w-full mt-[55px]">

        <div className="justify-between flex">
            <div className="flex cursor-pointer" onClick={() => router.back()}>
                <Icon
                icon={'mdi:arrow-left'} width={25} className={'text-black'} />
                <span className="ml-2">back</span>
            </div>  
        </div>

        <div 
            className="flex w-fit justify-center items-center p-[10px] mt-[7px] cursor-pointer rounded-lg bg-green-600"
            onClick={() => {
                setShowPopUp(true)
            }}
        >
            <span className="text-white">Add new brand</span>
            <Icon
                icon={'mdi:plus'} width={25} className={'text-white ml-[5px]'} 
            />
        </div>


        <div className="flex flex-wrap w-[100%] mt-[20px]">
            {brands?.map((item:any, index) => {
                // const models = item.models
                return(
                    // <div 
                    //     className="w-[30%] m-[10px]"
                    // >
                    //     <div 
                    //         key={index}
                    //         className="w-[100%] p-[10px] justify-between items-center flex rounded-lg bg-slate-300 "
                    //         onClick={() => {setShowAddModelPopUp(true); setActiveBrand(item)}}
                    //     >
                            
                    //         <Icon
                    //             icon={'mdi:close'} width={20} className={'text-black ml-[5px] cursor-pointer'} 
                    //         />
                    //         {item.brand}
                    //         <Icon
                    //             icon={'mdi:chevron-down'} width={20} className={'text-black ml-[5px] cursor-pointer'} 
                    //         />
                    //     </div>

                    //     <div>
                    //         {models?.map((item:any, index:any) => {
                    //             return(
                    //                 <div
                    //                     key={index}
                    //                     className="p-[10px] my-[7px] rounded-lg justify-center items-center flex bg-red-300"
                    //                 >
                    //                     {item}
                    //                 </div>
                    //             )
                    //         })}
                    //         <div
                    //             // key={index}
                    //             className="flex p-[10px] my-[7px] rounded-lg justify-center items-center bg-transparent border-dashed border-[1px] border-black"
                    //         >
                    //                                         <Icon
                    //             icon={'mdi:plus'} width={20} className={'text-black ml-[5px] cursor-pointer'} 
                    //         />
                    //             New Model
                    //         </div>

                    //     </div>
                    // </div>
                    <Brands item={item} index={index}/>
                )
            })}

        </div>

      <div className="mt-[25px] w-full overflow-x-scroll">


      </div>
      {showPopUp && (
            <div 
                className="fixed flex top-0 left-0 z-10 h-full w-full bg-black bg-opacity-80 justify-center items-center" 
                // onClick={() => setSelectedCar({})}
            >
                <span 
                    className="absolute top-[10px] cursor-pointer right-[10px] bg-white text-black flex justify-center items-center p-[10px] rounded-full"
                    onClick={() => {setShowPopUp(false); }}
                >
                    X
                </span>
                <div className="flex flex-col bg-white shadow-lg rounded-lg p-[20px] justify-between ">
                    <input 
                        type="text" 
                        className="outline-none border-[1px] border-gray-300 p-[10px]" 
                        placeholder="Enter a brand name"
                        onChange={(e) => {
                            setBrandName(e.target.value)
                        }}
                    />
                    <div 
                        className="w-[100%] justify-center items-center p-[10px] mt-[12px] bg-green-700 flex text-white rounded-lg cursor-pointer"
                        onClick={() => {
                            addBrand()
                        }}
                    >
                        Submit
                    </div>
                </div>
    
            </div>
      )}
      {showAddModelPopUp && (
            <div 
                className="fixed flex top-0 left-0 z-10 h-full w-full bg-black bg-opacity-80 justify-center items-center" 
                // onClick={() => setSelectedCar({})}
            >
                <span 
                    className="absolute top-[10px] cursor-pointer right-[10px] bg-white text-black flex justify-center items-center p-[10px] rounded-full"
                    onClick={() => {setShowAddModelPopUp(false); }}
                >
                    X
                </span>
                <div className="flex flex-col bg-white shadow-lg rounded-lg p-[20px] justify-between ">
                    {/* {activeBrand?.models?.map((item:any, index:any) =>{
                        return(
                            <span key={index}>* {item}</span>
                        )
                    })} */}
                    <input 
                        type="text" 
                        className="outline-none border-[1px] border-gray-300 p-[10px]" 
                        placeholder="Enter a model name"
                        onChange={(e) => {
                            setModelName(e.target.value)
                        }}
                    />
                    <div 
                        className="w-[100%] justify-center items-center p-[10px] mt-[12px] bg-green-700 flex text-white rounded-lg cursor-pointer"
                        onClick={() => {
                            addModel()
                        }}
                    >
                        Add
                    </div>
                </div>
    
            </div>
      )}
    </div>
  );
}
