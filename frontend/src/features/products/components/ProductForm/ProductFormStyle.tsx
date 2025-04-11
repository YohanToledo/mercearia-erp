import { color } from "@/styles/_colors";
import styled from "styled-components";

export const Content = styled.div`
  background-color: ${color.white};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`
export const BoxShadow = styled.div`
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`