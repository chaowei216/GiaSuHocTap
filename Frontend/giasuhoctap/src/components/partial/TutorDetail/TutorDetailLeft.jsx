import messi from "/img/avatarMessi.png";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
const baseUrl = import.meta.env.VITE_API_HOST;
import emptyPicture from "/img/empty.png"
function TutorDetailLeft({ image }) {
  return (
    <div style={{ marginRight: "30px", width: "26%" }}>
      <div>
        <div className="col-md-7" style={{ width: "100%" }}>
          <img
            style={{ width: "98%", height: "250px" }}
            src={`${baseUrl}/api/Auth/user-image?fileName=${image}`}
            alt="project-image"
            className="rounded"
            onError={(e) => {
              e.currentTarget.src = emptyPicture;
            }}
          />
        </div>
        <div
          className="flex"
          style={{ alignItems: "center", flexDirection: "column" }}
        >
          <div className="my-3" style={{ color: "#27ae60", fontSize: "21px", fontWeight: "700" }}>Đang sẵn sàng</div>
          <div className="my-1 mb-3">Ngày tham gia : 22/07/2003</div>
        </div>
        <div><EmojiEventsIcon /> <span style={{ color: "#f0564a", fontWeight: "bold", fontSize: "20px" }}>Thành tích</span></div>
        <hr style={{ marginTop: "5px" }} />
        <div className="mt-2">Ông xã em number one</div>
      </div>
    </div>
  );
}

export default TutorDetailLeft;
