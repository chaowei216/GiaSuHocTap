import { useParams } from "react-router-dom";
import TutorDetailLeft from "./TutorDetailLeft";
import TutorDetailMain from "./TutorDetailMain";
import TutorDetailMiddle from "./TutorDetailMiddle";
import TutorDetailRight from "./TutorDetailRight";
import PageNavigation from "../TutorManagement/PageNavigation";
import { useEffect, useState } from "react";
import { GetTutorByEmail } from "../../../api/TutorManagementApi";
import { toast } from "react-toastify";

function TutorDetailContainer() {
  let { email } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetTutorByEmail(email)
      if (response.ok) {
        const responseJson = await response.json();
        const user = responseJson.data
        setData(user);
        setUserImage(user.userImage)
      } else {
        toast.error("Error to fetch data")
      }
    }
    fetchData()
  }, [email])
  return (
    <>
      <div
        className="flex"
        style={{ justifyContent: "center", marginTop: "20px" }}
      >
        <TutorDetailMain>
          <TutorDetailLeft image={userImage} />
          <TutorDetailMiddle data={data} />
          <TutorDetailRight data={data}/>
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
