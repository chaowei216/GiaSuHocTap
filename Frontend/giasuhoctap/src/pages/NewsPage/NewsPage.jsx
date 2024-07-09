// Components import
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Hero from "../../components/partial/HomePage/Hero/Hero";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import News from "../../components/partial/HomePage/News/News";



const NewsPage = () => {
  return (
    <div className="App">
      <Navbar  />
      <Hero />
      <News />
      <Footer />
    </div>
  );
};

export default NewsPage;