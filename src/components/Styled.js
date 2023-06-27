import styled from '@emotion/styled';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContent = styled.div`
  color: wheat;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 300px;
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background-color: #212121;
  border-radius: 10px;
  box-shadow: 0px 0px 29px #d4d4d4, 0px 0px 0px 0px #000,
    0px 0px 0px 0px #252525;
`;
