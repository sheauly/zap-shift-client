import React from "react";
import Banner from "./Banner";
import ServicesSection from "./ServicesSection";
import ClientLogosMarquee from "./ClientLogosMarquee";
import BenefitsSection from "./BenefitsSection";
import BeMarchant from "./BeMarchant";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <ClientLogosMarquee></ClientLogosMarquee>
            <BenefitsSection></BenefitsSection>
            <BeMarchant></BeMarchant>
        </div>
    );
};

export default Home;
