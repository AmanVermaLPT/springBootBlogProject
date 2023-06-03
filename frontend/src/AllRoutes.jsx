import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Directory from './components/directory/Directory';
import Blog from './components/blog/Blog';
import EditDirectoryForm from './components/directory/EditDirectoryForm';
import CreateBlogForm from './components/blog/CreateBlogForm';
import EditBlogForm from './components/blog/EditBlogForm';
import Login from './components/navbar/Login';
import RegisterForm from './components/navbar/RegisterForm';

function AllRoutes() {
    return (
        <div>
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/createBlog" element={<CreateBlogForm />} />
                <Route path="/editDir/:directoryId" element={<EditDirectoryForm />} />
                <Route path="/editBlog/:blogId" element={<EditBlogForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </div>
    )
}

export default AllRoutes
