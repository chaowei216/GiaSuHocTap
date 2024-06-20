import TutorDetailLeft from "./TutorDetailLeft";
import TutorDetailMain from "./TutorDetailMain";
import TutorDetailMiddle from "./TutorDetailMiddle";
import TutorDetailRight from "./TutorDetailRight";

function TutorDetailContainer() {
  return (
    <div
      className="flex"
      style={{ justifyContent: "center", marginTop: "20px" }}
    >
      <TutorDetailMain>
        <TutorDetailLeft />
        <TutorDetailMiddle />
        <TutorDetailRight />
      </TutorDetailMain>
    </div>
  );
}

export default TutorDetailContainer;
