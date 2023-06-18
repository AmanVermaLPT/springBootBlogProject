import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { baseURL } from '../Helper';
import { toast } from 'react-toastify';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseURL}/login`, {
                email: email,
                password: password
            });
            const authToken = response.data.token;
            // Store the authentication token in local storage
            localStorage.setItem('authToken', authToken);
            console.log('authToken', authToken);

            // Store user roles
            localStorage.setItem('userRoles', response.data.roles);
            console.log("logged in user role : ", response.data.roles);

            // store user Id
            localStorage.setItem('userId', response.data.userId);
            console.log("logged in user id : ", response.data.userId);
            console.log("logged in user data : ", response.data);

            // store user name
            localStorage.setItem('userName', response.data.userName);

            toast.success('User logged in successfully.');
            navigate("/");
            window.location.reload();
        }
        catch (error) {
            console.error("Error logging user : ", error);
        }
    };

    // Function to retrieve the authentication token from local storage
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    // Axios request interceptor to include the authentication token in the request headers
    axios.interceptors.request.use((config) => {
        const authToken = getAuthToken();
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }
        return config;
    });

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-12 m-auto bg-white border border-blue-950 rounded-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-[#11009E] uppercase">
                    Sign in
                </h1>
                <form className="mt-6" onSubmit={handleLogin}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white bg-[#8696FE] rounded-md hover:bg-purple-600"
                            type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <button className="my-4 p-2 rounded-lg bg-blue-800 text-white border border-blue-900">
                    <Link to="/register">
                        <h4>Sign up</h4>
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Login
