import React from 'react';
import location from '../assets/location-merchant.png'
const BeMarchant = () => {
    return (
        <div data-aos="zoom-in-up" className="hero bg-[url('assets/be-a-merchant-bg.png')] bg-[#03373D] bg-no-repeat rounded-4xl p-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                />
                <div>
                    <h1 className="text-5xl font-bold text-white">Box Office News!</h1>
                    <p className="py-6 text-white">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary rounded-full text-black">Become A Merchant</button>
                    <button className="btn btn-primary btn-outline rounded-full text-black ms-5">Become A Merchant</button>
                </div>
            </div>
        </div>
    );
};

export default BeMarchant;