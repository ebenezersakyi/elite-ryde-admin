'use client'
import { useRouter } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner/Spinner";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  const { user, error, isLoading } = useUser();

  if(user){
    router.push('/dashboard')
  }

  // useEffect(() => {
  //   if(user){
  //     router.push('/dashboard')
  //   }else{
  //     router.push('/api/auth/login')
  //   }
  // }, [user])

  console.log('user', user)

  if(!user){
    return (
      <main className="h-[100vh] w-full bg-black grid place-content-center">
          <button className="text-[#fff] border-[1px] rounded-md px-2 py-1" onClick={() =>{
            router.push('/api/auth/login')
          }}>
            Sign In
          </button>
      </main>
    )
  }

  if(isLoading){
    return(
      <div className="flex justify-center items-center bg-white">
        <Spinner/>
      </div>
    )
  }
}
