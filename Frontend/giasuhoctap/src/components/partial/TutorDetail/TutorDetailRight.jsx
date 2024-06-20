import StarRateIcon from '@mui/icons-material/StarRate';
import { Button } from '@mui/material';

function TutorDetailRight() {
  return (
    <div className="ml-5" style={{width: "28%"}}>
      <div style={{ width: "100%", height: "auto", borderRadius: "15px", padding: "10px", border: "1px solid #e2e6ea" }}>
        <div style={{
          fontSize: "24px", fontWeight: "700", fontStyle: "normal",
          fontStretch: "normal", lineHeight: "normal", letterSpacing: "normal", color: "#f0564a"
        }}>80,000 đ/h</div>
        <div>
          <StarRateIcon sx={{ color: "#ff9948" }} />
          <StarRateIcon sx={{ color: "#ff9948" }} />
          <StarRateIcon sx={{ color: "#ff9948" }} />
          <StarRateIcon sx={{ color: "#ff9948" }} />
          <StarRateIcon sx={{ color: "#ff9948" }} />
        </div>
        <Button sx={{
          width: "100%", color: "white", border: "1px solid #e2e6ea",
          height: "54px", borderRadius: "10px", fontWeight: "700", fontSize: "16px",
          margin: "20px 0px 20px 0px", backgroundColor: "#f0564a"
        }}>Thuê</Button>
        <Button sx={{
          width: "100%", color: "#354052", border: "1px solid #e2e6ea",
          height: "54px", borderRadius: "10px", fontWeight: "700", fontSize: "16px",
          margin: "0px 0px 10px 0px"
        }}>Đánh giá</Button>
      </div>
    </div>
  );
}

export default TutorDetailRight;
