import Image from "next/image"
export default function Card(){
    return(
        <>
        <div className='w-full md:w-1/2 lg:w-1/4 bg-white p-3 m-3 rounded-md shadow-md border border-gray-300 hover:shadow-lg hover:border-gray-400 transition-transform transform hover:scale-105'>
          <div className="border border-gray-300">
             <img src='https://usercontent.one/wp/www.insidr.ai/wp-content/uploads/2024/08/Skjermbilde-2024-08-05-kl.-10.11.55.png?media=1714509658'/>
          </div>
        </div>
        </>
    )
}