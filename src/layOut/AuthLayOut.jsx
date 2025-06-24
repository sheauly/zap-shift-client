import React from 'react';
import authImage from '../assets/authImage.png';
import Login from '../pages/Authentication/Login';
import ProFAstLogo from '../shared/ProFAstLogo';
import { Outlet } from 'react-router-dom';

const AuthLayOut = () => {
    return (
        <div className="p12 bg-base-200 ">
            <ProFAstLogo></ProFAstLogo>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='fle'>
                    <img
                        src={authImage}
                        className='max-w-sm rounded-xl shadow-2xl' />
               </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
               </div>
            </div>
        </div>
    );
};

export default AuthLayOut;