import axios from 'axios';
import React from 'react';
import useAuth from '../hooks/useAuth';


const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})
const useAxioSecure = () => {
    const { user } = useAuth();

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxioSecure;