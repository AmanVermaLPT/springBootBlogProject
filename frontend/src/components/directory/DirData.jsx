import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { baseURL } from '../Helper';
import axios from 'axios';
import Modal from '../modal/Modal';

function DirData() {

    const [directoryData, setDirectoryData] = useState([]);
    const [show, setShow] = useState(null);
    const [viewData, setViewData] = useState({});
    const [showModal, setShowModal] = useState(false);

    let userRole = '';
    let loggedInUserId = '';
    let viewDate = new Date();

    // Decode the JWT token
    const roles = localStorage.getItem('userRoles');
    const UserId = localStorage.getItem('userId');
    if (roles) {
        userRole = roles;
    }

    if (UserId) {
        loggedInUserId = UserId;
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/dir/getWithSort?field=createdDate`);
                setDirectoryData(response.data);

            } catch (error) {
                console.log('Error fetching directory data:', error);
            }
        };

        fetchData();
    }, []);

    const showNumber = async (directoryId) => {


        const checkUserName = localStorage.getItem('userName');
        if (!checkUserName) {
            setShowModal(true);
            return;
        }

        if (show === directoryId) {
            setShow(null);
            return;
        }

        setShow((prevShow) => (prevShow === directoryId ? null : directoryId));

        if (userRole !== "ROLE_ADMIN") {
            setViewData((prevData) => ({
                ...prevData,
                [directoryId]: {
                    userId: loggedInUserId,
                    directoryId: directoryId,
                    viewCount: prevData[directoryId] ? prevData[directoryId].viewCount + 1 : 1,
                    viewDate: viewDate
                },
            }));

            try {
                if (viewData[directoryId]) {
                    await axios.post(`${baseURL}/api/saveViewData`, viewData[directoryId]);
                    console.log('View data saved successfully!');
                }
            } catch (error) {
                console.log('Error saving view data:', error);
            }
        }
    };

    useEffect(() => {
        console.log(viewData);
    }, [viewData]);

    return (
        <div>
            {directoryData.map((directory) => (
                <div className="grid grid-cols-10 gap-2 border-b border-black pb-2" key={directory.id}>
                    <div className="border-r border-black pr-2"><p>{directory.name}</p></div>
                    <div className="border-r border-black pr-2"><p>{directory.age}</p></div>
                    <div className="border-r border-black pr-2"><p>{directory.company}</p></div>
                    <div className="border-r border-black pr-2"><p>{directory.startingDate}</p></div>
                    <div className="border-r border-black pr-2"><p>{directory.industry}</p></div>
                    <div className="border-r border-black pr-2"><p>{directory.idea}</p></div>
                    <div className="border-r border-black pr-2"><p>{directory.education}</p></div>

                    <div className="border-r border-black pr-2 col-span-2 flex py-1 items-center justify-evenly">
                        <button className='border rounded-lg bg-[#8696FE] px-2'
                            onClick={() => showNumber(directory.id)}>
                            {show === directory.id ? "Hide" : "Show"}
                        </button>
                        <p>{show === directory.id && <span>{directory.number}</span>}</p>
                    </div>
                    {userRole === "ROLE_ADMIN" && (
                        <Link to={`/editDir/${directory.id}`}>
                            <div className="py-1">
                                <button className='border rounded-lg bg-[#11009E] text-white px-2'>Edit</button>
                            </div>
                        </Link>
                    )}
                </div>
            ))}
            {showModal && (
                <div className="absolute top-1/3 left-1/3">
                    <Modal
                        header="Unknown User !"
                        message="Please log in....."
                        showModal={showModal}
                        onClose={() => setShowModal(false)} />
                </div>
            )}
        </div>
    )
}

export default DirData
