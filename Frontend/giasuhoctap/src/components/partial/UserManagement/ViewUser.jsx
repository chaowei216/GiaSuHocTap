import React, { useEffect, useState } from "react";
import Container from "./Container";
import Search_Input from "../../global/Search_Input";
import Header from "./Header";
import Body from "./Body";
import UserTable from "./UserTable";
import Title from "./Title";
import PageNavigation from "../TutorManagement/PageNavigation";
import PageSize from "../TutorManagement/PageSize";
import { GetActiveTutor } from "../../../api/TutorManagementApi";
import { toast } from "react-toastify";
import WaitingModal from "../../global/WaitingModal";
import CreateUser from "./CreateUser";
import { Button } from "@mui/material";

export default function ViewUser() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [centredModal, setCentredModal] = useState(false);
  const handleClickOpen = (email) => {
    setOpen(true);
    setEmail(email);
  };
  useEffect(() => {
    const fetchAllTutor = async () => {
      const response = await GetActiveTutor(page, pageSize);
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
  }, [page, pageSize, isUpdate]);
  console.log(data);
  return (
    <div
      style={{
        padding: "25px 25px 5px 25px",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Container>
        <Title title="Danh sách tài khoản" />

        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" style={{ fontWeight: "bold" }} onClick={() => setCentredModal(true)}>Tạo tài khoản</Button>
        </div>
        <Body>
          <UserTable data={data} handleClickOpen={handleClickOpen} />
        </Body>
        {data && data.length > 0 && (
          <>
            <div
              style={{
                position: "relative",
                minHeight: "80px"
              }}
            >
              <ul style={{
                marginTop: "25px", marginBottom: "10px", position: "absolute",
                left: "50%",
                transform: "translate(-50%)",
              }}>
                <PageNavigation
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </ul>
              <ul style={{ float: "right", marginTop: "12px" }} >
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
              </ul>
            </div>
          </>
        )}
      </Container>
      <WaitingModal open={false} setOpen={setIsModalOpen} />
      <CreateUser centredModal={centredModal} setCentredModal={setCentredModal} isCreated={isUpdate} setIsCreated={setIsUpdate} />
    </div>
  );
}
