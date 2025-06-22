import React from 'react';
import amazon from '../assets/brands/amazon.png';
import amazon_vector from '../assets/brands/amazon_vector.png';
import casio from '../assets/brands/casio.png';
import moonstar from '../assets/brands/moonstar.png';
import randstad from '../assets/brands/randstad.png';
import startPeople from '../assets/brands/start-people 1.png';
import start from '../assets/brands/start.png';
import Marquee from 'react-fast-marquee';

const logos = [amazon, amazon_vector, casio, moonstar, randstad, startPeople, start];

const ClientLogoMarquee = () => {
    return (
      
        <section className='py-10 bg-gray-100'>
            <div className='max-w-7xl mx-auto px-4'>
                <h2 className='text-2xl font-bold text-center mb-6'>Trusted By Leading Brands</h2>
                <Marquee pauseOnHover speed={60} gradient={false}>
                    {
                        logos.map((logo, idx) => (
                            <div key={idx} className='mx-10 flex items-center'>
                                <img src={logo} alt={`Client logo ${idx + 1}`} className='h-6' />
                            </div>
                        ))
                    }
                </Marquee>
            </div>
        </section>
    );
};

export default ClientLogoMarquee;
