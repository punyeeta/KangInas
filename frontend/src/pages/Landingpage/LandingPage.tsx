import React from "react";
import Header from "../../components/Header";
import { Hero } from "./Hero";
import About from "./About";
import Services from "./Services";
import Team from "./Team";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="w-full max-w mx-auto">
      <Header />
      
      {/* Section IDs match the ones used in the Header component */}
      <div id="home" className="pt-20">
        <Hero />
      </div>
      
      <div id="about">
        <About />
      </div>
      
      <div id="services">
        <Services />
      </div>
      
      <div id="team">
        <Team />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;