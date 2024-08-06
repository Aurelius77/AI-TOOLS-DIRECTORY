'use client'
import Link from "next/link"
import Image from "next/image"
import menu from '../../../public/menu.svg'
import close from '../../../public/close.svg'
import { useState } from "react"

export default function Dashboard() {
    const [isToggled, setIsToggled] = useState(false)
    return (
        <>
            <nav className="p-5 flex items-center justify-between">
                <h1 className="text-white text-3xl m-2 p-2">AI Hub</h1>
                <ul className=" hidden md:flex text-white items-center justify-between text-lg">
                    <li className='m-5'><Link href='/categories'>Categories</Link></li>
                    <li className='m-5'><Link href='/submit'>Submit Tool</Link></li>
                    <li className='m-5'><Link href='/contact'>Contact</Link></li>
                </ul>
                <Image src={menu} alt='menu' onClick={() => setIsToggled(true)} className={`${isToggled ? 'hidden' : 'block'}`} />

            </nav>


            <nav className={`mobile-navbar flex flex-col items-center transition-transform fixed top-0 left-0 w-screen h-screen bg-white ${isToggled ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
                <Image src={close} alt='menu' onClick={() => setIsToggled(false)} className={`${isToggled ? 'block' : 'hidden'}`} />
                <ul className="flex flex-col text-black items-center justify-between text-lg">
                    <li className="m-5"><Link href="/categories">Categories</Link></li>
                    <li className="m-5"><Link href="/submit">Submit Tool</Link></li>
                    <li className="m-5"><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    )
}