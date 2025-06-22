import React from 'react';

const BenefitCard = ({ benefit }) => {
    const { title, description, image } = benefit;

    return (
        <div className="flex flex-col md:flex-row items-center bg-base-100 shadow-md p-6 rounded-xl gap-10">
            {/* Left: Image */}
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Vertical Dashed Divider */}
            <div className="hidden md:block h-24 border-l-2 border-dashed border-gray-400"></div>

            {/* Right: Text Content */}
            <div className="text-center md:text-left space-y-2">
                <h3 className="text-xl font-bold text-primary">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default BenefitCard;

