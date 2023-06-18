import axios from 'axios';

// export const baseURL = 'http://localhost:8080';
export const baseURL = 'http://yfclub-env.eba-mkvkvukm.ap-south-1.elasticbeanstalk.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true ",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control",
        'Content-Type': 'application/json'
    }
};

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthToken = (token) => {
    window.localStorage.setItem('auth_token', token);
};


export const request = (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};