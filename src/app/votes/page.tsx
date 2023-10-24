// display all votes
// add a check box to show only votes I participated in
// when click on a vote -> goes to [vote] page

import { ConnectButton } from '../../components/ConnectButton'
import Navbar from '../../components/Navbar'

function Votes() {
    return (
        <>
            <div className='flex flex-row justify-between my-7'>
                <Navbar />
                <div className='mx-5'>
                    <ConnectButton />
                </div>
            </div>
            <div className='flex flex-col w-fit mx-auto text-center my-7'>
                <h1 className='font-mono text-3xl font-bold leading-loose'>Votes</h1>
                <p className='text-xl'>Here you can find the list of the votes available</p>
            </div>
            {/* Wait for the smart contract but need to make a component that takes in a list of votes and display them*/}
        </>
    )
}

export default Votes
