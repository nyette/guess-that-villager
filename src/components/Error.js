import styled from "styled-components";
import Button from "./Button";

const StyledHeading = styled.h1`
  color: red;
`;

const Error = () => {
  return (
    <div>
      <StyledHeading>Oops</StyledHeading>
      <p>The server might be down. Try again later.</p>
      <Button content="Quit" />
    </div>
  );
};

export default Error;
