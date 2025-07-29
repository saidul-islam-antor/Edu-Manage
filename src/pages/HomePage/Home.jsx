import React from 'react';
import Banner from './component/Banner';
import ClientLogoSlider from './component/ClientLogo';
import HomeTopClasses from './component/HomeTopClass';
import Feedback from './component/Feedback';
import StatsSection from './component/StartsSection';
import InspireTeachersSection from './component/InspironTeacherSection';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <ClientLogoSlider></ClientLogoSlider>
          <HomeTopClasses></HomeTopClasses>
          <StatsSection></StatsSection>
          <InspireTeachersSection></InspireTeachersSection>
          <Feedback></Feedback>
        </div>
    );
};

export default Home;