import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterForm() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        const userLoginData = {
            userName, email, password
        }

        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(userLoginData),
            headers: {
                'Content-Type': 'application/json',
            }
        };


        fetch('http://localhost:8080/api/auth/registerNewUser', requestOptions)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error("Faild to register user !");
                }
                return response.text();
            })
            .then((body) => {
                console.log(body);
                if (body === 'User registered successfully!') {
                    toast.success('User registered successfully.');
                    navigate('/');
                } else {
                    toast.error('Failed to register user!');
                }
            })
            // .then(() => {
            //     toast.success("User registered successfully.");
            //     navigate('/');
            // })
            .catch((error) => {
                // toast.error("Faild to register user !")
                console.error("Error saving user : ", error)
            })
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