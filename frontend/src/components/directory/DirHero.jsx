import React, { useState } from 'react'
import DirData from './DirData'
import { baseURL } from '../Helper';

function DirHero() {

    const [file, setFile] = useState(null);

    let userRole = '';

    // Decode the JWT token
    const roles = localStorage.getItem('userRoles');
    if (roles) {
        userRole = roles;
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch(`${baseURL}/api/dir/import`, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        console.log('File uploaded successfully');
                    } else {
                        throw new Error('File upload failed');
                    }
                })
                .catch(error => {
                    console.error('Error occurred during file upload:', error);
                });
        } else {
            console.error('No file selected');
        }
    };

    return (
        <div>
            {userRole === "ROLE_ADMIN" && (
                <div className="p-8 border border-blue-900 rounded-md m-4">
                    <h2 className="font-bold text-xl mb-2">Upload Your File</h2>
                    <input type="file" name="file" onChange={handleFileChange} />
                    <button className='border rounded-lg bg-[#11009E] text-white px-4 py-2' onClick={handleUpload}>Upload</button>
                </div>
            )}
            <div className="p-8 border border-blue-900 rounded-md m-4">
                <div className="grid grid-cols-10 gap-2 border-b border-black pb-2">
                    <div className="border-r border-black pr-2 font-bold"><p>Name</p></div>
                    <div className="border-r border-black pr-2 font-bold"><p>Age</p></div>
                    <div className="border-r border-black pr-2 font-bold"><p>Company</p></div>
                    <div className="border-r border-black pr-2 font-bold"><p>Starting Date</p></div>
                    <div className="border-r border-black pr-2 font-bold"><p>Industry</p></div>
                    <div className="border-r border-black pr-2 font-bold"><p>Idea</p></div>
                    <div className="border-r border-black pr-2 font-bold"><p>Education</p></div>
                    <div className="border-r border-black pr-2 font-bold col-span-2"><p>Number</p></div>
                    <div className=""></div>
                </div>
                <div>
                    <DirData />
                </div>
            </div>
        </div>
    )
}

export default DirHero
