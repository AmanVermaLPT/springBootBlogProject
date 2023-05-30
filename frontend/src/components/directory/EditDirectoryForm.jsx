import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditDirectoryForm() {
    const { directoryId } = useParams();
    const nevigate = useNavigate();

    const [editedDirectory, setEditedDirectory] = useState({
        name: '',
        age: 0,
        company: '',
        startingDate: '',
        industry: '',
        idea: '',
        education: '',
        number: 0
    });

    useEffect(() => {
        fetchDirectoryData();
        // eslint-disable-next-line
    }, []);

    const fetchDirectoryData = () => {

        var requestOptions = {
            method: 'GET'
        };

        try {
            fetch(`http://localhost:8080/api/dir/get`, requestOptions)
                .then(response => response.json())
                .then(results => {
                    setEditedDirectory(results.filter(result => result.id === Number(directoryId))[0]);
                    console.log(results.filter(result => result.id === Number(directoryId)));
                    // console.log("name : ", editedDirectory[0].name);
                })
            // .catch(error => console.log('error', error));
        } catch (error) {
            console.log('Error fetching directory data:', error);
        }
    };

    const updateDirectory = async () => {
        try {
            await axios.put(`http://localhost:8080/api/dir/update/${directoryId}`, editedDirectory);
            nevigate("/directory");
        } catch (error) {
            console.log('Error updating directory:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedDirectory({ ...editedDirectory, [name]: value });
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-3xl">Edit Directory</h2>
            <form className='flex flex-col border border-blue-900 rounded-lg p-8 m-8 w-1/3'>
                <label className="font-semibold">Name:</label>
                <input type="text" name="name" value={editedDirectory.name} onChange={handleInputChange} />

                <label className="font-semibold">Age:</label>
                <input type="number" name="age" value={editedDirectory.age} onChange={handleInputChange} />

                <label className="font-semibold">Company:</label>
                <input type="text" name="company" value={editedDirectory.company} onChange={handleInputChange} />

                <label className="font-semibold">Starting Date:</label>
                <input type="text" name="startingDate" value={editedDirectory.startingDate} onChange={handleInputChange} />

                <label className="font-semibold">Industry:</label>
                <input type="text" name="industry" value={editedDirectory.industry} onChange={handleInputChange} />

                <label className="font-semibold">Idea:</label>
                <input type="text" name="idea" value={editedDirectory.idea} onChange={handleInputChange} />

                <label className="font-semibold">Education:</label>
                <input type="text" name="education" value={editedDirectory.education} onChange={handleInputChange} />

                <label className="font-semibold">Number:</label>
                <input type="number" name="number" value={editedDirectory.number} onChange={handleInputChange} />

                <button className='border rounded-lg bg-[#11009E] text-white' onClick={updateDirectory}>Update</button>
            </form>
        </div>
    );
}

export default EditDirectoryForm;
