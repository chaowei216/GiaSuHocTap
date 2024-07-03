// Components import
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import BookTutorOffline from "../../components/partial/HomePage/BookTutor/BookTutorOffline";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import Hero from "../../components/partial/HomePage/Hero/Hero";

const BookTutorOfflinePage = () => {
  return (
    <div style={{background: '#F0F9FC'}}>
      <Navbar  />
      <Hero />
      <BookTutorOffline />
      <Footer />
    </div>
  );
};

export default BookTutorOfflinePage;