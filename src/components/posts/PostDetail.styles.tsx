import styled from "styled-components";
import { Button } from "antd";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 4em;
  background: papayawhip;
`;

export const MyYesButton = styled(Button)`
  background: green;
  color: white;
  max-width: 350px !important;
`;

export const MyNoButton = styled(Button)`
  background: red;
  color: white;
  max-width: 350px !important;
`;


