import React from 'react';
import Banner from './component/Banner';
import ClientLogoSlider from './component/ClientLogo';
import HomeTopClasses from './component/HomeTopClass';
import Feedback from './component/Feedback';
import StatsSection from './component/StartsSection';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <ClientLogoSlider></ClientLogoSlider>
          <HomeTopClasses></HomeTopClasses>
          <StatsSection></StatsSection>
          <Feedback></Feedback>
        </div>
    );
};

export default Home;