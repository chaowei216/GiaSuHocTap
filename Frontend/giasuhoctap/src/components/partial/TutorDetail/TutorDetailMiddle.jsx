import InfoIcon from "@mui/icons-material/Info";
function TutorDetailMiddle() {
  return (
    <div className="w-2/3">
      <div className="flex gap-3 align-middle">
        <div className="font-mono font-bold text-3xl">Lưu Chao Wei</div>
        <div className="text-2xl">🌸</div>
      </div>
      <div className="mt-4 flex">
        <div className="w-1/4">
          <div>Số lượt thuê</div>
          <div>120 lượt</div>
        </div>
        <div className="w-1/4">
          <div>Đã được thuê</div>
          <div>1721 giờ</div>
        </div>
        <div className="w-1/4">
          <div>Tỷ lệ hoàn thành</div>
          <div>99%</div>
        </div>
        <div className="w-1/4">
          <div>Tình trạng thiết bị</div>
          <div>Mic</div>
        </div>
      </div>
      <div>
        <div>Cart Item</div>
      </div>
      <hr />
      <div>
        <div>Thông tin</div>
        <div>Nội dung nè</div>
      </div>
      <hr />
      <div>
        <div>Đánh giá</div>
        <div>Cart đánh giá nè</div>
      </div>
    </div>
  );
}

export default TutorDetailMiddle;
