import messi from "/img/avatarMessi.png";
function TutorDetailLeft() {
  return (
    <div className="w-1/3">
      <div>
        <div className="col-md-7" style={{ width: "100%" }}>
          <img
            style={{ width: "90%", height: "250px" }}
            src={messi}
            alt="project-image"
            className="rounded"
          />
        </div>
        <div
          className="flex"
          style={{ alignItems: "center", flexDirection: "column" }}
        >
          <div className="my-3">Đang sẵn sàng</div>
          <div className="my-1 mb-3">Ngày tham gia : 22/07/2003</div>
        </div>
        <div>Thành tích</div>
        <hr style={{marginTop: "5px"}} />
        <span>Ngu nè</span>
      </div>
    </div>
  );
}

export default TutorDetailLeft;
