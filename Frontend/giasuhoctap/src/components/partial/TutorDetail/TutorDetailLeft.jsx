import messi from "/img/avatarMessi.png";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
function TutorDetailLeft() {
  return (
    <div style={{marginRight: "30px", width: "28%"}}>
      <div>
        <div className="col-md-7" style={{ width: "100%" }}>
          <img
            style={{ width: "100%", height: "250px" }}
            src={messi}
            alt="project-image"
            className="rounded"
          />
        </div>
        <div
          className="flex"
          style={{ alignItems: "center", flexDirection: "column" }}
        >
          <div className="my-3" style={{color: "#27ae60", fontSize: "21px", fontWeight: "700"}}>Đang sẵn sàng</div>
          <div className="my-1 mb-3">Ngày tham gia : 22/07/2003</div>
        </div>
        <div><EmojiEventsIcon/> <span style={{color: "#f0564a", fontWeight: "bold", fontSize: "20px"}}>Thành tích</span></div>
        <hr style={{marginTop: "5px"}} />
        <span>Ngu nè</span>
      </div>
    </div>
  );
}

export default TutorDetailLeft;
