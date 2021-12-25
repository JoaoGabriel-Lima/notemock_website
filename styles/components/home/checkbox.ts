import styled from "styled-components";
interface CheckboxContainerProps {
  groupcolor: string;
  color: any;
}

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  .checkbox:checked {
    background-color: ${(props) => props.groupcolor} !important;
  }
  h5,
  i {
    color: ${(props) => props.color};
  }
`;
