import style from "./TutorDetailMiddle.module.css"
import ImageWithPreview from "../../global/ImageWithPreview";
import FeedbackTutor from "./FeedbackTutor";
function TutorDetailMiddle({ data, dataFeedback }) {
  const imageList = [
    'https://picsum.photos/200',
    'https://picsum.photos/200/300',
    'https://picsum.photos/seed/picsum/200/300',
  ];

  return (
    <div style={{ width: "70%" }}>
      <div className="flex gap-3 align-middle">
        <div className="font-mono font-bold text-3xl">{data?.fullname}</div>
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
        {data?.userCourses?.map((item, index) => (
          <div key={index} className={style.field_name}>{item.course.courseName}</div>
        ))}
      </div>
      <hr style={{ margin: "20px 0px 20px 0px" }} />
      <div>
        <div className={style.title_user_profile}>Thông tin</div>
        <div className={style.content_player_profile}>
          <p><b>Lớp dạy: </b>
            {data?.userClasses?.map((item, index) => (
              <>
                {item.class.className}
                {index !== data.userClasses.length - 1 && <span>, </span>}
              </>
            ))}
          </p>
          <p><b>Ngày dạy:</b> {data && data?.timeTables?.map((item) => `Thứ ${item.dayOfWeek}`)}</p>
          <p><b>Thời gian:</b> {data && data?.timeTables?.map((item) => `${item.startTime} - ${item.endTime}`)}</p>
          <div className={style.album_of_player}>
            <ImageWithPreview imageList={imageList} />
          </div>
          <p><b>Liên lạc:</b> {data?.email}</p>
          <p><b>Công việc:</b> {data?.tutorDetail?.job}</p>
          <p><b>Chuyên ngành:</b> {data?.tutorDetail?.major}</p>
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
        <FeedbackTutor dataFeedback={dataFeedback} />
      </div>
    </div>
  );
}

export default TutorDetailMiddle;
