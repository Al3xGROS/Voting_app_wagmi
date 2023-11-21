import { ConnectButton } from '../components/ConnectButton'
import { Connected } from '../components/Connected'
import Navbar from '../components/Navbar'
import VotesTable from '../components/VotesTable'

function Votes() {
    return (
        <>
            <div className='flex flex-row justify-between my-7'>
                <Navbar />
                <div className='mx-5'>
                    <ConnectButton />
                </div>
            </div>
            <Connected>
                <div className='flex flex-col w-fit mx-auto text-center my-7'>
                    <h1 className='font-mono text-3xl font-bold leading-loose'>Votes</h1>
                    <p className='text-xl'>Here you can find the list of the votes available</p>
                </div>
                <VotesTable />
            </Connected>
        </>
    )
}

export default Votes
