import React from 'react';
import Banner from './component/Banner';
import ClientLogoSlider from './component/ClientLogo';
import HomeTopClasses from './component/HomeTopClass';
import Feedback from './component/Feedback';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <ClientLogoSlider></ClientLogoSlider>
          <HomeTopClasses></HomeTopClasses>
          <Feedback></Feedback>
        </div>
    );
};

export default Home;