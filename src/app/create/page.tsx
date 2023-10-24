// offer the possibility to create a vote
// need a name, options of vote and date of end
// button to validate
import { ConnectButton } from '../../components/ConnectButton'
import Navbar from "../../components/Navbar"
import InputsCreate from '../../components/InputsCreate'

function Create() {
    
    return (
        <>
            <div className='flex flex-row justify-between my-7'>
                <Navbar />
                <div className='mx-5'>
                    <ConnectButton />
                </div>
            </div>
            <div className='flex flex-col w-fit mx-auto text-center my-5'>
                <h1 className='font-mono text-3xl font-bold leading-loose'>Create a new vote</h1>
                <p className='text-xl'>Here you can create your own vote with your settings</p>
            </div>
            <InputsCreate />
        </>
    )
}

export default Create