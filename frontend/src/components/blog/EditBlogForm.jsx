import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditBlogForm() {

    const { blogId } = useParams();
    const nevigate = useNavigate();

    const [editedBlog, setEditedBlog] = useState({
        title: '',
        body: '',
        author: '',
        tags: ''
    });

    useEffect(() => {
        fetchBlogData();
        // eslint-disable-next-line
    }, []);

    const fetchBlogData = () => {

        var requestOptions = {
            method: 'GET'
        };

        try {
            fetch(`http://localhost:8080/api/blogs/get`, requestOptions)
                .then(response => response.json())
                .then(results => {
                    setEditedBlog(results.filter(result => result.id === Number(blogId))[0]);
                    console.log(results.filter(result => result.id === Number(blogId)));
                    // console.log(results);
                    // console.log("name : ", editedBlog[0].name);
                })
            // .catch(error => console.log('error', error));
        } catch (error) {
            console.log('Error fetching directory data:', error);
        }
    };

    const updateBlog = async () => {
        try {
            await axios.put(`http://localhost:8080/api/blogs/update/${blogId}`, editedBlog);
            nevigate("/");
        } catch (error) {
            console.log('Error updating blog:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedBlog({ ...editedBlog, [name]: value });
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-3xl">Edit Blog</h2>
            <form className='flex flex-col border border-blue-900 rounded-lg p-8 m-8 w-1/3'>
                <label className="font-semibold">Title:</label>
                <input type="text" name="title" value={editedBlog.title} onChange={handleInputChange} />

                <label className="font-semibold">Body:</label>
                <input type="text" name="body" value={editedBlog.body} onChange={handleInputChange} />

                <label className="font-semibold">Author:</label>
                <input type="text" name="author" value={editedBlog.author} onChange={handleInputChange} />

                <label className="font-semibold">Tags:</label>
                <input type="text" name="tags" value={editedBlog.tags} onChange={handleInputChange} />

                <button className='border rounded-lg bg-[#11009E] text-white' onClick={updateBlog}>Update</button>
            </form>
        </div>
    )
}

export default EditBlogForm