// Components import
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Hero from "../../components/partial/HomePage/Hero/Hero";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import NewsDetail from "../../components/partial/HomePage/News/NewsDetail";



const NewDetailPage = () => {
  return (
    <div className="App">
      <Navbar  />
      <Hero />
      <NewsDetail />
      <Footer />
    </div>
  );
};

export default NewDetailPage;