// Components import
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Hero from "../../components/partial/HomePage/Hero/Hero";
import Features from "../../components/partial/HomePage/Features/Features";
import Growth from "../../components/partial/HomePage/Growth/Growth";
import Questions from "../../components/partial/HomePage/Questions/Questions";
import Programs from "../../components/partial/HomePage/Programs/Programs";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import '../../index.css'


const HomePage = () => {
  return (
    <div className="App">
      <Navbar  />
      <Hero />
      <Features />
      <Growth />
      <Programs/>
      <Questions />
      <Footer />
    </div>
  );
};

export default HomePage;