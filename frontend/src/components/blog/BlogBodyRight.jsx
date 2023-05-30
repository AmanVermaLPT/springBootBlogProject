import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function BlogBodyRight() {

    const [blogData, setBlogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const pageSize = 12;

    useEffect(() => {
        fetchBlogData(currentPage);
    }, [currentPage]);

    const fetchBlogData = (page) => {
        var requestOptions = {
            method: 'GET'
        };

        fetch(`http://localhost:8080/api/blogs/getWithPagination?offset=${page}&pageSize=${pageSize}`, requestOptions)
            .then(response => response.json())
            .then(data => setBlogData(data.content))
            .catch(error => console.log('error', error));
    }

    const formatDate = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
        return "Not Defined";
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div>
            <div className='pl-16'>
                <div className="font-semibold text-sky-600 text-3xl">Tranding Blogs</div>
            </div>
            {blogData.map((blog) => (
                <div className='p-8 m-4 border border-gray-500 rounded-md flex flex-col justify-between' key={blog.id}>
                    <div className='flex justify-between'>
                        <div>
                            <p className='text-sky-600 my-2'>{formatDate(blog.createdDate)}</p>
                            <h2 className='text-2xl font-semibold my-2'>{blog.title}</h2>
                            <p className='my-2'>{blog.body}</p>
                            <p className='my-2'>{blog.tags}</p>
                            <p className='text-gray-600'>by {blog.author}</p>
                        </div>
                        <div>
                            <img src='https://picsum.photos/200' alt='img' />
                        </div>
                    </div>
                    <Link to={`/editBlog/${blog.id}`}>
                        <div className="p-2">
                            <button className='border rounded-lg bg-[#11009E] text-white px-2'>Edit Blog</button>
                        </div>
                    </Link>
                </div>
            ))}
            <div className='flex justify-center mt-4'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}>
                    Previous Page
                </button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
                    onClick={() => handlePageChange(currentPage + 1)}>
                    Next Page
                </button>
            </div>
        </div>
    )
}

export default BlogBodyRight
