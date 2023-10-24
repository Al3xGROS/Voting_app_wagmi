'use client'

import React, { useState } from 'react'

function InputsCreate() {
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [question, setQuestion] = useState("")
    const [options, setOptions] = useState<string[]>([])
    const [newOption, setNewOption] = useState("")
    const [bool, setBool] = useState(false)

    const addOption = () => {
        if (newOption) {
          setOptions([...options, newOption])
          setNewOption('')
        }
    }

    const deleteOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index)
        setOptions(updatedOptions)
    }

    return (
        <>
            <div className='flex flex-col w-1/2 mx-auto text-lg p-5 shadow-lg
                border border-gray-300 rounded-lg mb-4'>
                <label className="my-2 text-center">
                    <p className='mx-auto'>Name of the vote :</p>
                    <input 
                        type='text' 
                        placeholder='Name' 
                        className="border border-gray-300 p-2 rounded-lg w-4/5 mx-auto shadow-lg"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className="my-2 text-center">
                    <p className='mx-auto'>Date of ending for the voting session :</p>
                    <input 
                        type='date' 
                        placeholder='Date' 
                        className="border border-gray-300 p-2 rounded-lg w-4/5 mx-auto shadow-lg"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label className="my-2 text-center">
                    <p className='mx-auto'>Question of the vote :</p>
                    <input 
                        type='text' 
                        placeholder='Question' 
                        className="border border-gray-300 p-2 rounded-lg w-4/5 mx-auto shadow-lg"
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </label>
                <div>
                    <label className="my-2 text-center">
                        <p className='mx-auto'>Options :</p>
                        <div className="flex flex-row w-4/5 mx-auto">
                            <input
                                type="text"
                                placeholder="Option"
                                className="border border-gray-300 p-2 rounded-lg mx-auto shadow-lg basis-3/4"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                            />
                            <button className="border border-gray-300 p-2 rounded-lg mx-auto shadow-lg basis-1/4 hover:bg-green-300"
                                onClick={addOption}>
                                Add
                            </button>
                        </div>
                    </label>
                    <ul className='my-2 text-center'>
                        {options.map((option, index) => (
                            <li key={index} className='hover:bg-gray-300 w-4/5 mx-auto cursor-pointer' 
                                onClick={() => deleteOption(index)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="mb-2 mt-4 border border-gray-300 p-2 rounded-lg w-4/5 mx-auto shadow-lg bg-gray-300 hover:bg-green-300" 
                    onClick={() => setBool(true)}>
                    Let's go
                </button>
            </div>
            {bool && (
                <div className='text-center'>
                    <p>Name: {name}</p>
                    <p>Date: {date}</p>
                    <p>Question: {question}</p>
                    {options.map((option, index) => (
                        <p key={index}>
                            {option}
                        </p>
                    ))}
                </div>
            )}
        </>
    )
}

export default InputsCreate