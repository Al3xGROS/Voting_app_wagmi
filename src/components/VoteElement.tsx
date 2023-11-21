'use client'

import { useContractRead, useContractWrite } from 'wagmi'
import { address, abi } from '../utils/addressAndAbi.json'
import React, { useState, useEffect } from 'react'
import { unixTimestampToReadableDateTime } from '../utils/convertTime'
import Swal from 'sweetalert2'

function VoteElement({ id }: { id: any }) {
    const [vote, setVote] = useState<any>(null)
    const { data: readData, isLoading: readLoading } = useContractRead({
        address: `0x${address}`,
        abi: abi,
        functionName: 'getVote',
        args: [id]
    })

    const voteData = readData as { [key: string]: any }

    const { data: writeData, isLoading: writeLoading, isSuccess, isError, write } = useContractWrite({
        address: `0x${address}`,
        abi: abi,
        functionName: 'voteVote',
        args: [parseInt(id), vote]
    })

    const loading = () => {
        Swal.fire({
            title: "Confirm in your wallet",
            icon: "question",
            showConfirmButton: false,
        })
    }

    const success = () => {
        Swal.fire({
            title: "Vote voted with success!",
            text: `Transaction: ${JSON.stringify(writeData)}`,
            icon: "success",
            showCloseButton: true,
            allowEscapeKey: true,
            confirmButtonText: `<a href="/">Continue</a>`,
        })
    }

    const error = () => {
        Swal.fire({
            title: "Oops!",
            text: "It seems you already voted this one...",
            icon: "error",
            showCloseButton: true,
            allowEscapeKey: true,
            confirmButtonText: `<a href="/">Cancel</a>`,
        })
    }

    return (
        <>
            <div className="mx-auto p-4 w-4/5">
                {readLoading ? <div>Loading...</div> : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Property</th>
                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Value</th>
                            </tr>
                        </thead>
                        <tbody className="text-center bg-white divide-y divide-gray-200">
                        {Object.entries(voteData).map(([key, value] : [any, any]) => (
                            key !== 'id' && ( 
                                key === 'date' || key === 'timestamp' ? (
                                    <tr className='hover:bg-gray-200' key={key}>
                                        <td className='px-6 py-4 whitespace-nowrap'>{key[0].toLocaleUpperCase() + key.substring(1)}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{unixTimestampToReadableDateTime(value)}</td>
                                    </tr>
                                ) : (
                                    <tr className='hover:bg-gray-200' key={key}>
                                        <td className='px-6 py-4 whitespace-nowrap'>{key[0].toLocaleUpperCase() + key.substring(1)}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{value}</td>
                                    </tr>
                                )
                            )
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className='mx-auto p-4 w-4/5 text-center'>
                <h1 className='font-mono text-3xl font-bold leading-loose'>Participate</h1>
                <p className='text-xl'>Choose an option to vote</p>
                {readLoading ? <div>Loading...</div> : (
                    <div className='mx-auto p-4 mt-3 w-4/5 flex justify-center'>
                        {(voteData.options).map((value : any) => (
                            <label className='mx-10' key={value}>
                                <input type='radio' name='voteOption' title={value} className='mx-1' onChange={() => setVote({value})}/>
                                {value}
                            </label>
                        ))}
                    </div>
                )}
                <button onClick={() => write()} className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-5'>
                    Validate Vote
                </button>
                <>
                    {writeLoading && (
                        loading()
                    )}
                    {isSuccess && (
                        success()
                    )}
                    {isError && (
                        error()
                    )}
                </>
            </div>
        </>
    )
}

export default VoteElement
