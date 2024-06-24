import style from "./TutorDetailMiddle.module.css"
import ImageWithPreview from "../../global/ImageWithPreview";
import FeedbackTutor from "./FeedbackTutor";
function TutorDetailMiddle() {
  const imageList = [
    'https://picsum.photos/200',
    'https://picsum.photos/200/300',
    'https://picsum.photos/seed/picsum/200/300',
  ];

  return (
    <div style={{ width: "70%" }}>
      <div className="flex gap-3 align-middle">
        <div className="font-mono font-bold text-3xl">Lưu Chao Wei</div>
        <div className="text-2xl">🌸</div>
      </div>
      <div className="mt-4 flex">
        <div className="w-1/4">
          <div className={style.nav_item_name}>Số lượt thuê</div>
          <div className={style.nav_item_value}>120 lượt</div>
        </div>
        <div className="w-1/4">
          <div className={style.nav_item_name}>Đã được thuê</div>
          <div className={style.nav_item_value}>1721 giờ</div>
        </div>
        <div className="w-1/4">
          <div className={style.nav_item_name}>Tỷ lệ hoàn thành</div>
          <div className={style.nav_item_value}>99%</div>
        </div>
        <div className="w-1/4">
          <div className={style.nav_item_name}>Tình trạng thiết bị</div>
          <div className={style.nav_item_value}>Mic</div>
        </div>
      </div>
      <hr style={{ margin: "20px 0px 20px 0px" }} />
      <div className="flex flex-wrap">
        <div className={style.field_name}>Lĩnh vực</div>
        <div className={style.field_name}>Toán học</div>
        <div className={style.field_name}>Hóa học</div>
        <div className={style.field_name}>Văn học</div>
        <div className={style.field_name}>Vật lý</div>
        <div className={style.field_name}>Tiếng anh</div>
        <div className={style.field_name}>Tiếng anh</div>
      </div>
      <hr style={{ margin: "20px 0px 20px 0px" }} />
      <div>
        <div className={style.title_user_profile}>Thông tin</div>
        <div className={style.content_player_profile}>
          <p>Xin chào</p>
          <div className={style.album_of_player}>
            <ImageWithPreview imageList={imageList} />
          </div>
          <p><b>Email:</b> luuchaowei@gmail.com</p>
          <p><b>Địa chỉ:</b> TP HCM</p>
          <p><b>Công việc:</b> Sinh viên</p>
          <p><b>Chuyên ngành:</b> Công nghệ thông tin</p>
        </div>
        <div style={{ marginTop: "25px" }}>
          <div>
            <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/yDQ22O7iz6w"></iframe>
          </div>
        </div>
      </div>
      <hr style={{ margin: "20px 0px 10px 0px" }} />
      <div>
        <div className={style.title_user_profile}>Đánh giá</div>
        <FeedbackTutor />
      </div>
    </div>
  );
}

export default TutorDetailMiddle;
