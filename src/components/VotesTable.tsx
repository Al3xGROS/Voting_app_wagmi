'use client'

import { useContractRead } from 'wagmi'
import { address, abi } from '../utils/addressAndAbi.json'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { unixTimestampToReadableDateTime } from '../utils/convertTime'
import { useAccount } from 'wagmi'

function VotesTable() {
    const [filter, setFilter] = useState<boolean>(false)
    const account  = useAccount()
    const { data: readData, isLoading: readLoading } = useContractRead({
        address: `0x${address}`,
        abi: abi,
        functionName: 'getVotes',
        args: [1]
    })

    let voteData = readData as { [key: string]: any }
    console.log(voteData)
    if (filter === true) {
        console.log(account.address)
        voteData = voteData.filter((element: any) => element.creator === account.address)
    }

    return (
        <>
            <div className="flex justify-center space-x-4 mb-4">
                <label>
                    <input
                        type="checkbox"
                        checked={filter === false}
                        onChange={() => setFilter(false)}
                    />
                    All
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filter === true}
                        onChange={() => setFilter(true)}
                    />
                    As Creator
                </label>
            </div>
            <div className="mx-auto p-4 w-4/5 overflow-x-scroll">
                {readLoading ? (
                    <div className='text-center mx-auto my-auto'>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Creator
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Options
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Question
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Timestamp
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {voteData.map((item : any) => (
                            <tr key={item.id} className='hover:bg-gray-200' >
                                <td className="px-6 py-4 whitespace-nowrap">
                                        {item.creator}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        {unixTimestampToReadableDateTime(item.date.toString())}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        {item.options.join(', ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        {item.question}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        {unixTimestampToReadableDateTime(item.timestamp.toString())}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/${item.id}`} className="text-blue-500 hover:underline cursor-pointer">
                                            Participate
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default VotesTable