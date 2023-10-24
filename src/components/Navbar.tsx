'use client'

import Link from "next/link"

function Navbar() {
    return(
        <ul className="flex justify-start">
            <li className="mx-5">
                <Link href="/votes">
                    <p className="text-xl font-semibold">Votes</p>
                </Link>
            </li>
            <li className="mx-5">
                <Link href="/create">
                    <p className="text-xl font-semibold">Create Vote</p>
                </Link>
            </li>
        </ul>
    )
}

export default Navbar