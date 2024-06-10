import React, { useState } from "react";

// Components import
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import NavbarResponsive from "../../components/partial/HomePage/NavbarResponsive/NavbarResponsive";
import Hero from "../../components/partial/HomePage/Hero/Hero";
import Features from "../../components/partial/HomePage/Features/Features";
import Growth from "../../components/partial/HomePage/Growth/Growth";
import Questions from "../../components/partial/HomePage/Questions/Questions";
import Programs from "../../components/partial/HomePage/Programs/Programs";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import '../../index.css'

// Import data
import { programs_user } from "../../data/programs_user";
import { programs_shopper } from "../../data/programs_shopper";

const HomePage = () => {
  const [hamActive, setHamActive] = useState(false);
  return (
    <div className="App">
      <Navbar hamActive={hamActive} setHamActive={setHamActive} />
      <NavbarResponsive hamActive={hamActive} />
      <Hero />
      <Growth />
      <Programs/>
      <Features />
      <Questions />
      {/* <Programs programs={programs_user} /> */}
      <Footer />
    </div>
  );
};

export default HomePage;