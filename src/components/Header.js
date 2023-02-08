import styled from "styled-components";
import { useSelector } from "react-redux";
import Button from "./Button";

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const Header = () => {
  const settings = useSelector((state) => state.settings);

  return (
    <StyledHeader>
      <Button
        content={
          settings.mode === "dark" ? "Enable Light Mode" : "Enable Dark Mode"
        }
      />
    </StyledHeader>
  );
};

export default Header;
