import React from "react";
import PageTitle from "./../Shared/PageTitle";
import HeroSlider from "./HeroSlider";
import PopularServices from './PopularServices';
import WhyFixItNow from './../../Components/WhyFixItNow';


import JourneyCounters from "./JourneyCounters";
import WorkingStrategy from './WorkingStrategy';


const Home = () => {
  return (
    <div className="relative w-full">
      <PageTitle title="Home" />
      <HeroSlider />
      <PopularServices></PopularServices>
      <WorkingStrategy></WorkingStrategy>
      <WhyFixItNow></WhyFixItNow>
      <JourneyCounters></JourneyCounters>
    </div>
  );
};

export default Home;
