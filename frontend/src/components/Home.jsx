import React from 'react'
import { FaTwitter, FaInstagramSquare, FaLinkedin, FaYoutube, FaMedium } from "react-icons/fa";
import office from './assests/office.jpg'

function Home() {
    return (
        <div>
            <div className="w-full flex flex-col-reverse  items-center sm:flex-row">
                <div className="absolute top-[45%] sm:right-[45%] sm:bottom-[30%] flex sm:flex-col">
                    <div className="flex border border-blue-950 items-center rounded-lg bg-[#8696FE] hover:bg-[#B6EAFA] p-2 m-2 md:p-8 md:m-2">
                        <a href="https://youtube.com/" className="font-bold md:text-xl">Become YF</a>
                    </div>
                    <div className="rounded-lg border border-blue-950 bg-[#8696FE] hover:bg-[#B6EAFA] p-2 m-2 md:p-8 md:m-2">
                        <a href="https://youtube.com/" className="font-bold md:text-xl">YF Directory</a>
                    </div>
                </div>
                <div className="md:w-1/2 w-full md:p-40 p-6">
                    <div className="">
                        {/* <h1 className="font-semibold md:text-5xl text-3xl p-2">Why Choose</h1> */}
                        <h1 className="font-black md:text-5xl text-2xl p-2 text-[#4942E4] hover:text-[#11009E]">Young Founder's Club</h1>
                    </div>
                    <div className="p-4">
                        <p className="text-xl">"We empower startups with an unbeatable edge."</p>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-sky-400 hover:bg-sky-700 m-4 cursor-pointer">
                            <a href="https://twitter.com/"><FaTwitter /></a>
                        </div>
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-pink-400 hover:bg-pink-700  m-4 cursor-pointer">
                            <a href="https://twitter.com/"><FaInstagramSquare /></a>
                        </div>
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-900 hover:bg-sky-700 m-4 cursor-pointer">
                            <a href="https://twitter.com/"><FaLinkedin /></a>
                        </div>
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-700 hover:bg-sky-700 m-4 cursor-pointer">
                            <a href="https://twitter.com/"><FaYoutube /></a>
                        </div>
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-black hover:bg-sky-700 m-4 cursor-pointer">
                            <a href="https://twitter.com/"><FaMedium /></a>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div>
                        <img src={office} alt="office-img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
