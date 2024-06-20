import React, { useEffect, useState } from "react";
import Container from "./Container";
import Search_Input from "../../global/Search_Input";
import Header from "./Header";
import Body from "./Body";
import TableList from "./TableList";
import Title from "./Title";
import ButtonType from "./ButtonType";
import PageNavigation from "./PageNavigation";
import PageSize from "./PageSize";
import { AcceptTutor, GetActiveTutor, GetAllTutor, GetPendingTutor } from "../../../api/TutorManagementApi";
import { toast } from "react-toastify";
import Diablog from "./Diablog";
import WaitingModal from "../../global/WaitingModal";

export default function ViewTutor() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [type, setType] = React.useState("Pending");
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleClickOpen = (email) => {
    setOpen(true);
    setEmail(email);
  };
  useEffect(() => {
    const fetchAllTutor = async () => {
      let response;
      switch (type) {
        case 'All':
          response = await GetAllTutor(page, pageSize);
          break;
        case 'Pending':
          response = await GetPendingTutor(page, pageSize);
          break;
        case 'Active':
          response = await GetActiveTutor(page, pageSize);
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
      if (response.ok) {
        const responseJson = await response.json();
        const user = responseJson.data.data
        setData(user);
        setTotalPages(responseJson.data.totalPages)
      } else {
        toast.error("Error fetching data")
      }
    };
    fetchAllTutor();
  }, [page, pageSize, type, isUpdate]);

  const handleAccept = async (email) => {
    console.log(email);
    const response = await AcceptTutor(email);
    const responseJson = await response.json();
    if (responseJson.statusCode == 200) {
      toast.success("Accepted");
      setIsUpdate(!isUpdate)
    } else {
      toast.error("Something error")
    }
  }
  return (
    <div
      style={{
        padding: "25px 25px 5px 25px",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Container>
        <Title title="Danh sách gia sư" />
        <Header>
          <Search_Input />
        </Header>
        <Body>
          <ButtonType setType={setType} isUpdate={isUpdate} />
          <TableList data={data} handleAccept={handleAccept} handleClickOpen={handleClickOpen} type={type} />
        </Body>
        {data && data.length > 0 && (
          <div
            style={{
              display: "flex",
              alignContent: "space-betwwen",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <PageNavigation
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
            <PageSize pageSize={pageSize} setPageSize={setPageSize} />
          </div>
        )}
      </Container>
      <Diablog open={open} setOpen={setOpen} email={email} setIsUpdate={setIsUpdate} />
      <WaitingModal open={false} setOpen={setIsModalOpen}/>
    </div>
  );
}
