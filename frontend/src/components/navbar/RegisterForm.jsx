import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterForm() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        const userRegisterData = {
            userName, email, password
        }


        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                body: JSON.stringify(userRegisterData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to register user!');
            }

            const responseBody = await response.json();
            const authToken = responseBody.token;

            // Store the authentication token in local storage
            localStorage.setItem('authToken', authToken);

            toast.success('User registered successfully.');
            navigate('/');
        } catch (error) {
            console.error('Error registering user: ', error);
            toast.error('Failed to register user!');
        }
    };

    useEffect(() => {
        const abortController = new AbortController();

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-12 m-auto bg-white border border-blue-950 rounded-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-[#11009E] uppercase">
                    Sign up
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="userName"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="userName"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
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
                            onChange={e => setEmail(e.target.value)}
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
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button type='submit'
                            className="w-full px-4 py-2 tracking-wide text-white bg-[#8696FE] rounded-md hover:bg-purple-600">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;
