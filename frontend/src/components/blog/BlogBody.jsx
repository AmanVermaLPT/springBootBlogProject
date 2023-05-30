import React from 'react'
import BlogBodyLeft from './BlogBodyLeft'
import BlogBodyRight from './BlogBodyRight'

function BlogBody() {
    return (
        <div className="m-20 flex">
            <div className="w-full md:h-1/2 md:w-1/3 flex justify-center border border-blue-800 rounded-md"><BlogBodyLeft /></div>
            <div className="pl-16"><BlogBodyRight /></div>
        </div>
    )
}

export default BlogBody
