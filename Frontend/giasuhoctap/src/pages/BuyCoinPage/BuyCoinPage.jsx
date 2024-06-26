import { useState } from "react";
import BuyCoin from "../../components/partial/BuyCoin/BuyCoin";
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Footer from "../../components/partial/HomePage/Footer/Footer";
function BuyCoinPage() {
  const [hamActive, setHamActive] = useState(false);
  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-10"
        style={{ border: "1px solid #dcdcdc" }}
      >
        <Navbar hamActive={hamActive} setHamActive={setHamActive} />
      </div>
      <div style={{ marginTop: "9rem" }}>
        <BuyCoin />
      </div>
      <div style={{ height: "29vh", backgroundColor: "#4DA8DA" }}>
        <Footer />
      </div>
    </>
  )
}

export default BuyCoinPage;
