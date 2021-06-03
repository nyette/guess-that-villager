const Home = (props) => {
	return (
		<div className="container">
			<h1>Guess That Villager</h1>
			<p>Identify as many Animal Crossing villagers as you can!</p>
			<button className="btn btn-primary btn-lg" onClick={() => props.setGameStarted(!props.gameStarted)}>Play</button>
		</div>
	);
}

export default Home;