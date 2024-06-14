import React from "react";
import Container from "./Container";
import Search_Input from "../../global/Search_Input";
import Header from "./Header";
import Body from "./Body";
import TableList from "./TableList";
import Title from "./Title";

export default function ViewTutor() {
  return (
    <div
      style={{
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Container>
        <Title title="List of Tutors" />
        <Header>
          <Search_Input />
        </Header>
        <Body>
          <TableList />
        </Body>
      </Container>
    </div>
  );
}
