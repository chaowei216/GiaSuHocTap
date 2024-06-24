import { useState } from "react";
import BuyCoin from "../../components/partial/BuyCoin/BuyCoin";
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";

function BuyCoinPage() {
  const [hamActive, setHamActive] = useState(false);
  return (
    <div>
      <div
        className="fixed top-0 left-0 right-0 z-10"
        style={{ border: "1px solid #dcdcdc" }}
      >
        <Navbar hamActive={hamActive} setHamActive={setHamActive} />
      </div>
      <div style={{ marginTop: "10rem" }}>
        <BuyCoin />
      </div>
    </div>
  );
}

export default BuyCoinPage;
