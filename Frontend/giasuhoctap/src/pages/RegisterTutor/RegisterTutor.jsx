// Components import
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Profile from "../../components/partial/HomePage/Profile/Profile";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import Hero from "../../components/partial/HomePage/Hero/Hero";


const RegisterTutor = () => {
  return (
    <div style={{background: '#F0F9FC'}}>
      <Navbar  />
      <Hero />
      <Profile />
      <Footer />
    </div>
  );
};

export default RegisterTutor;