'use client'

import Link from "next/link"
import Image from "next/image"
import menu from '../../public/menu.svg'
import { useState } from "react"

const navItems = [
    { href: "/submit", label: "Submit Tool" },
    { href: "/contact", label: "Contact" },
];

export default function Dashboard() {
    const [isToggled, setIsToggled] = useState(false)

    return (
        <>
            <nav className="sticky top-0 z-40 border-b border-white/20 bg-sky-700/35 px-4 py-4 backdrop-blur md:px-8">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <Link href="/" className="rounded-md px-2 py-1 text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/80">
                        AI Hub
                    </Link>

                    <ul className="hidden items-center gap-2 text-base text-white md:flex">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="rounded-md px-4 py-2 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/80">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={isToggled}
                        onClick={() => setIsToggled(true)}
                        className="rounded-md p-2 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/80 md:hidden"
                    >
                        <Image src={menu} alt="" className="h-6 w-6 invert" />
                    </button>
                </div>
            </nav>

            <div className={`fixed inset-0 z-50 bg-slate-950/45 transition-opacity md:hidden ${isToggled ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setIsToggled(false)} />

            <nav className={`fixed right-0 top-0 z-50 h-screen w-72 max-w-[85vw] bg-white p-5 text-slate-900 shadow-2xl transition-transform md:hidden ${isToggled ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="mb-8 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-sky-700" onClick={() => setIsToggled(false)}>
                        AI Hub
                    </Link>
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setIsToggled(false)}
                        className="rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>

                <ul className="flex flex-col gap-2 text-lg">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} onClick={() => setIsToggled(false)} className="block rounded-md px-3 py-3 hover:bg-sky-50 hover:text-sky-700">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
