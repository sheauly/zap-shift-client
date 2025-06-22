import React from "react";
import Banner from "./Banner";
// import ServiceCard from "./ServiceCard";
import ServicesSection from "./ServicesSection";
import ClientLogosMarquee from "./ClientLogosMarquee";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            {/* <ServiceCard></ServiceCard> */}
            <ClientLogosMarquee></ClientLogosMarquee>
        </div>
    );
};

export default Home;
