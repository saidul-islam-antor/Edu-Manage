import React from 'react';
import Banner from './component/Banner';
import ClientLogoSlider from './component/ClientLogo';
import HomeTopClasses from './component/HomeTopClass';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <ClientLogoSlider></ClientLogoSlider>
          <HomeTopClasses></HomeTopClasses>
        </div>
    );
};

export default Home;