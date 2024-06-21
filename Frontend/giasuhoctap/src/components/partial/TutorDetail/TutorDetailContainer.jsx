import { useParams } from "react-router-dom";
import TutorDetailLeft from "./TutorDetailLeft";
import TutorDetailMain from "./TutorDetailMain";
import TutorDetailMiddle from "./TutorDetailMiddle";
import TutorDetailRight from "./TutorDetailRight";
import PageNavigation from "../TutorManagement/PageNavigation";
import { useState } from "react";

function TutorDetailContainer() {
  let { email } = useParams();
  const [page, setPage] = useState(1);
  console.log(email);
  return (
    <>
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
      <div
        style={{
          display: "flex",
          alignContent: "space-betwwen",
          justifyContent: "center",
          margin: "20px"
        }}
      >
        <div style={{ marginTop: "20px" }}>
          <PageNavigation
            page={page}
            setPage={setPage}
            totalPages={5}
          />
        </div>
      </div>
    </>
  );
}

export default TutorDetailContainer;
