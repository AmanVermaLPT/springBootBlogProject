import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../Helper';

function CreateBlogForm() {

    const nevigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const blogData = {
            title,
            body,
            author,
            tags: tags.split(',').map(tag => tag.trim()), // Convert tags string to an array
        };

        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData),
        };

        fetch(`${baseURL}/api/blogs/create`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save blog');
                }
                return response.json();
            })
            .then(response => response.json())
            .catch(error => {
                console.error('Error saving blog:', error);
            });

        nevigate("/");
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-3xl">Create Blog</h2>

            <form className='flex flex-col border border-blue-900 rounded-lg p-8 m-8 w-1/2 h-[50vh]' onSubmit={handleSubmit}>
                <div className="my-2 p-2">
                    <label htmlFor="title">Title:</label>
                    <input className='border border-black' type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="my-2 p-2">
                    <label htmlFor="body">Body:</label>
                    <textarea className='border border-black' id="body" value={body} onChange={e => setBody(e.target.value)} required />
                </div>
                <div className="my-2 p-2">
                    <label htmlFor="author">Author:</label>
                    <input className='border border-black' type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} required />
                </div>
                <div className="my-2 p-2">
                    <label htmlFor="tags">Tags :</label>
                    <input className='border border-black' type="text" id="tags" value={tags} onChange={e => setTags(e.target.value)} required />
                </div>
                <button className='border rounded-lg bg-[#11009E] text-white' type='submit'>Save</button>
            </form>
        </div>
    )
}

export default CreateBlogForm
