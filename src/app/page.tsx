'use client'
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <main className="h-[100vh] w-full bg-black grid place-content-center">
        <button className="text-[#fff] border-[1px] rounded-md px-2 py-1" onClick={() =>{
          router.push('/dashboard')
        }}>
          Sign In
        </button>
    </main>
  )
}
