import axios from 'axios';
import React from 'react';
const axiosInstance = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiouse = () => {
    return axiosInstance;
};

export default useAxiouse;