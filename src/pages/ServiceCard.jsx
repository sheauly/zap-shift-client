import React from 'react';

const ServiceCard = ({ service }) => {
    const { icon: Icon, title, description } = service;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 
                        hover:bg-primary/10 transition duration-300 flex flex-col items-center justify-center h-full">
            <div className="text-5xl text-primary">
                <Icon />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default ServiceCard;
