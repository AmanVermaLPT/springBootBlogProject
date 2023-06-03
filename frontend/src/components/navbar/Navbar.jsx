import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../assests/burger.svg'

function Navbar() {


    const [showNav, setShowNav] = useState(true);

    const handleNavButton = () => {
        setShowNav(!showNav);
    }

    return (
        <div>
            <nav className="bg-[#B6EAFA] text-[#11009E]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center hover:bg-[#8696FE] hover:text-[#11009E] text-white bg-[#4942E4] p-2 rounded-lg">
                        {/* <img src="/" className="h-8 mr-3" alt="Flowbite Logo" /> */}
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Y C</span>
                    </Link>
                    <div className="md:hidden" onClick={handleNavButton}>
                        <Hamburger />
                    </div>
                    <div className={`${showNav && "hidden"} w-full md:block md:w-auto`}>
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-blue-900 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <li>
                                <Link to="/blog" className="block py-2 text-black px-4 hover:bg-[#8696FE] p-4 rounded-lg cursor-pointer">Guide to Get Started</Link>
                            </li>
                            <li>
                                <Link to="/directory" className="block py-2 text-black px-4 hover:bg-[#8696FE] p-4 rounded-lg cursor-pointer">Founder's Directory</Link>
                            </li>
                            <li>
                                <Link to="/login" className="block py-2 text-black px-4 bg-[#8696FE] hover:bg-[#11009E] hover:text-white p-4 rounded-lg cursor-pointer">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
