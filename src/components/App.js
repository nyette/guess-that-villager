import { useState } from "react";
import Home from "./Home";
import Villager from "./Villager";

const App = () => {

  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      {gameStarted ? <Villager gameStarted={gameStarted} setGameStarted={setGameStarted} /> : <Home gameStarted={gameStarted} setGameStarted={setGameStarted} />}
    </div>
  );
}

export default App;