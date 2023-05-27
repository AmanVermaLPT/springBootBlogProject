import React, { useState, useEffect } from 'react'

function Data() {

    const [getData, setGetData] = useState([]);

    var raw = "";

    var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/dir/get", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log('error', error));
    }, [])

    return (
        <div>
            <div className="grid grid-cols-11 gap-2 border-b border-black pb-2">
                <div className="border-r border-black pr-2"><p>Id</p></div>
                <div className="border-r border-black pr-2"><p>Name</p></div>
                <div className="border-r border-black pr-2"><p>Age</p></div>
                <div className="border-r border-black pr-2"><p>Company</p></div>
                <div className="border-r border-black pr-2"><p>Starting Date</p></div>
                <div className="border-r border-black pr-2"><p>Industry</p></div>
                <div className="border-r border-black pr-2"><p>Idea</p></div>
                <div className="border-r border-black pr-2"><p>Education</p></div>
                <div className="border-r border-black pr-2"><p>Number</p></div>
                <div className="border-r border-black pr-2"><p>Created Date</p></div>
                <div><p>Modified Date</p></div>
            </div>
        </div>
    )
}

export default Data
