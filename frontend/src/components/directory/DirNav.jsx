import React, { useState } from 'react'
import { ReactComponent as Hamburger } from '../assests/burger.svg'

function DirNav() {


    const [showNav, setShowNav] = useState(true);

    const handleNavButton = () => {
        setShowNav(!showNav);
    }

    return (
        <div>
            <nav class="bg-[#B6EAFA] text-[#11009E]">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" class="flex items-center hover:bg-[#8696FE] hover:text-[#11009E] text-white bg-[#4942E4] p-2 rounded-lg">
                        {/* <img src="/" class="h-8 mr-3" alt="Flowbite Logo" /> */}
                        <span class="self-center text-2xl font-semibold whitespace-nowrap">Young Founder's Directory</span>
                    </a>
                    <div className="md:hidden" onClick={handleNavButton}>
                        <Hamburger />
                    </div>
                    <div class={`${showNav && "hidden"} w-full md:block md:w-auto`}>
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-blue-900 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <li>
                                <a href="#!" class="block py-2 text-black px-4 hover:bg-[#8696FE] p-4 rounded-lg cursor-pointer">Guide-to-guide Starter</a>
                            </li>
                            <li>
                                <a href="#!" class="block py-2 text-black px-4 hover:bg-[#8696FE] p-4 rounded-lg cursor-pointer">Founder's Directory</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default DirNav
