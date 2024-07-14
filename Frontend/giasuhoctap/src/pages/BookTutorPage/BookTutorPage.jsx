// Components import
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import BookTutor from "../../components/partial/HomePage/BookTutor/BookTutor";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import Hero from "../../components/partial/HomePage/Hero/Hero";


const BookTutorPage = () => {
  return (
    <div style={{ background: '#F0F9FC' }}>
      <Navbar />
      <Hero />
      <BookTutor />
      <Footer />
    </div>
  );
};

export default BookTutorPage;