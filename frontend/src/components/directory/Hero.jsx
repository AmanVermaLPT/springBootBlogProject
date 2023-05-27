import React from 'react'
import Data from './Data'

function Hero() {
    return (
        <div>
            <div className="p-8 border border-blue-900 rounded-md m-4">
                <div className="grid grid-cols-11 gap-2 border-b border-black pb-2">
                    <div className="border-r border-black pr-2"><p>Id</p></div>
                    <div className="border-r border-black pr-2"><p>Name</p></div>
                    <div className="border-r border-black pr-2"><p>Age</p></div>
                    <div className="border-r border-black pr-2"><p>Company</p></div>
                    <div className="border-r border-black pr-2"><p>Starting Date</p></div>
                    <div className="border-r border-black pr-2"><p>Industry</p></div>
                    <div className="border-r border-black pr-2"><p>Idea</p></div>
                    <div className="border-r border-black pr-2"><p>Education</p></div>
                    <div className="border-r border-black pr-2"><p>Number</p></div>
                    <div className="border-r border-black pr-2"><p>Created Date</p></div>
                    <div><p>Modified Date</p></div>
                </div>
                <div>
                    <Data />
                </div>
            </div>
        </div>
    )
}

export default Hero
