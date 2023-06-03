import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function DirData() {

    // const history = useHistory();

    const [directoryData, setDirectoryData] = useState([]);
    const [show, setShow] = useState(null);

    var requestOptions = {
        method: 'GET'
    };

    useEffect(() => {

        fetch("http://localhost:8080/api/dir/getWithSort?field=createdDate", requestOptions)
            .then(response => response.json())
            .then(result => setDirectoryData(result))
            .catch(error => console.log('error', error));

    });

    const showNumber = (directoryId) => {
        setShow(directoryId === show ? null : directoryId);
    }

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

                    <div className="border-r border-black pr-2 col-span-2 flex py-1">
                        <button className='border rounded-lg bg-[#8696FE] px-2'
                            onClick={() => showNumber(directory.id)}>Show Number</button>
                        {show === directory.id && <p>{directory.number}</p>}
                    </div>
                    <Link to={`/editDir/${directory.id}`}>
                        <div className="py-1">
                            <button className='border rounded-lg bg-[#11009E] text-white px-2'>Edit</button>
                        </div>
                    </Link>
                </div>
            ))}

        </div>
    )
}

export default DirData
