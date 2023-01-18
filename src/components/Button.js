import { useContext } from "react";
import GameContext from "../contexts/game";

const Button = ({ content }) => {
  const { setGame } = useContext(GameContext);

  const handleClick = () => {
    setGame({
      type: content.toUpperCase(),
    });
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;
