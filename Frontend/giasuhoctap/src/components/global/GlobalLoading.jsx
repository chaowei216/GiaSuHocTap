import React from "react";
import styled from "styled-components";
import logoImg from "/img/logo.png";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Logo = styled.img`
  height: 60px;
`;

const TextContainer = styled.div`
  overflow: hidden;
  background-color: #fff;
  padding: 5px;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  font-size: 15px;
  font-weight: bold;
`;

const GlobalLoading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <LoadingContainer>
      <TextContainer>
        <Logo src={logoImg} alt="FPT Logo" />
        <LoadingText>Loading...</LoadingText>
      </TextContainer>
    </LoadingContainer>
  );
};

export default GlobalLoading;
