import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  color: ${(props) => props.theme.light};
  font-weight: 900;
  height: 70px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
`;

const Circle = styled.div`


  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} infinite 5s linear;

  border-radius: 100%;
  width: 40px;
  height: 40px;
  z-index: 10;
  border: dotted ${(props) => props.theme.back} 5px;
`;

function Load() {
  return (
    <Container>
      <Circle />
      <p>Loading</p>
    </Container>
  );
}

export default Load;
