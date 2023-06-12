import React from 'react'
import { Link } from 'react-router-dom'

function BlogHero() {

    let userRole = '';

    // Decode the JWT token
    const roles = localStorage.getItem('userRoles');
    if (roles) {
        userRole = roles;
    }

    return (
        <div className="p-20 flex justify-between items-center border border-b-gray-700">
            <div>
                <p className="font-bold text-5xl my-4">Insights from our team</p>
                <p className='text-gray-600'>Gaining Valuable Perspectives and Expertise, Powerful Insights from Our Dynamic Team</p>
            </div>
            <div className="flex md:order-2">
                {userRole === "ROLE_ADMIN" && (
                    /* <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                    </div> */
                    <Link to="/createBlog">
                        <button className="border rounded-lg bg-[#4e5dbe] hover:bg-[#11009E] text-white p-4">Create Blog</button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default BlogHero
