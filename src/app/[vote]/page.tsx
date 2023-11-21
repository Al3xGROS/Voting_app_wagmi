// show infos about a specific vote
// offer the possibility to vote if this isn't already the case

import VoteElement from "../../components/VoteElement"
import Navbar from "../../components/Navbar"
import { ConnectButton } from '../../components/ConnectButton'

function Vote({ params }: { params: { vote: number } }) {
    return (
        <>
            <div className='flex flex-row justify-between my-7'>
                <Navbar />
                <div className='mx-5'>
                    <ConnectButton />
                </div>
            </div>
            <div className='flex flex-col w-fit mx-auto text-center my-7'>
                <h1 className='font-mono text-3xl font-bold leading-loose'>Vote {params.vote}</h1>
            </div>
            <VoteElement id={params.vote} />
        </>
    )
}

export default Vote