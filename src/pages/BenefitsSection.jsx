import React from 'react';

import BenefitCard from './BenefitCard';

const BenefitsSection = () => {
    // src/data/benefits.js

    const benefits = [
        {
            id: 1,
            title: "Live Parcel Tracking",
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image: "/src/assets/big-deliveryman.png"
        },
        {
            id: 2,
            title: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: "/src/assets/live-tracking.png"
        },
        {
            id: 3,
            title: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: "/src/assets/safe-delivery.png"
        }
    ];

    
  
    return (
        <section className="max-w-6xl mx-auto px-4 py-12 space-y-8">
            <h2 className="text-3xl font-bold text-center">Why Choose Us</h2>

            <div className="space-y-6">
                {benefits.map(benefit => (
                    <BenefitCard key={benefit.id} benefit={benefit} />
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
