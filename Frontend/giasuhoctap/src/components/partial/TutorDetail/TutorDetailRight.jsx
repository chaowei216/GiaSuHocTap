import StarRateIcon from '@mui/icons-material/StarRate';
import { Button } from '@mui/material';
import HiringTuor from './HiringTuor';
import { useState } from 'react';

function TutorDetailRight({ data }) {
  const [tutorHire, setTutorHire] = useState()
  const [basicModal, setBasicModal] = useState(false);
  const handleHire = (item) => {
    setTutorHire(item);
    setBasicModal(true);
  }
  const calculateStarRating = (numberRent, rentHour) => {
    // Tính toán số sao dựa vào điều kiện của numberRent hoặc rentHour
    if (numberRent < 20 || rentHour < 20) {
      return Array.from({ length: 3 }, (_, index) => (
        <StarRateIcon key={index} sx={{ color: "#ff9948" }} />
      ));
    } else if (numberRent < 30 || rentHour < 30) {
      return Array.from({ length: 4 }, (_, index) => (
        <StarRateIcon key={index} sx={{ color: "#ff9948" }} />
      ));
    } else if (numberRent < 40 || rentHour < 40) {
      return Array.from({ length: 5 }, (_, index) => (
        <StarRateIcon key={index} sx={{ color: "#ff9948" }} />
      ));
    } else {
      return Array.from({ length: 5 }, (_, index) => (
        <StarRateIcon key={index} sx={{ color: "#ff9948" }} />
      ));
    }
  };
  return (
    <div className="ml-5" style={{ width: "28%" }}>
      <div style={{ width: "100%", height: "auto", borderRadius: "15px", padding: "10px", border: "1px solid #e2e6ea" }}>
        <div style={{
          fontSize: "24px", fontWeight: "700", fontStyle: "normal",
          fontStretch: "normal", lineHeight: "normal", letterSpacing: "normal", color: "#f0564a", marginBottom: "10px"
        }}>50 xu/h</div>
        <div>
          {calculateStarRating(10, 10)}
        </div>
        <Button onClick={handleHire} variant="contained" color="error" sx={{
          width: "100%", color: "white", border: "1px solid #e2e6ea",
          height: "54px", borderRadius: "10px", fontWeight: "700", fontSize: "16px",
          margin: "20px 0px 20px 0px", backgroundColor: "#f0564a"
        }}>Thuê</Button>
        <HiringTuor basicModal={basicModal} setBasicModal={setBasicModal} data={data} />
      </div>
    </div>
  );
}

export default TutorDetailRight;
