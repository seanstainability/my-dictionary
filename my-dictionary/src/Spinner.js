import React from "react";
import styled from "styled-components";
import img from "./sean.png";

const Spinner = (props) => {
  return (
    <Outter>
      <img src={img} alt="sean" />
    </Outter>
  );
};

const Outter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 150px;
  }
`;

export default Spinner;
