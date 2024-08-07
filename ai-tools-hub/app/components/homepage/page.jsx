'use client'
import { useEffect, useState } from "react"
import { getTools } from "@/app/backend/server"
import Card from "../card/page"

export default function HomePage(){
   const [tools, setTools] = useState()

  useEffect(() => {

    async function getResources(){
      try{
      let data = await getTools()
      setTools(data)
      console.log(data)
    }
    catch(err){
      console.log(err)
    }
    }

    getResources()
  
  }, [])
  
  return(
    <>
    <section className="w-full flex justify-center ">
    <h1 className='text-3xl  p-3 m-3 mt-5 font-bold'>Unlock AI Potential: Find the Right Tools for Every Task</h1>
    </section>
    <section className='search flex flex-col'>
      <div className="w-full flex items-center justify-center">
        <input type ='text' className="rounded-md p-3 m-2 " placeholder="Search for tool"/>
      </div>
    </section>

    </>
  )
}