import React, { useState } from "react";
import { calculateWinner, bestMove } from "../helper";
import Board from "./Board";
import logo from "../assets/img/tic-tac-toe.svg";
import restart from "../assets/img/restart.svg";

const Game = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [step, setStep] = useState(0);
	const [isXsTurn, setIsXsTurn] = useState(true);
	const [isAiMode, setIsAiMode] = useState(true);
	const winner = calculateWinner(history[step]);
	const currentPlayer = isXsTurn ? "X" : "O";

	const handleClick = (i) => {
		const historyPoint = history.slice(0, step + 1);
		const current = historyPoint[step];
		const squares = [...current];
		if (winner || squares[i]) return; // don't do anything if one won or occupied
		squares[i] = currentPlayer;
		setHistory([...historyPoint, squares]);
		setStep(historyPoint.length);
		if (isAiMode && !winner) {
			AIMove(historyPoint, squares);
		} else {
			setIsXsTurn(!isXsTurn);
		}
	};

	const AIMove = (historyPoint, squares) => {
		// debugger
		let aiMoveIndex = bestMove(squares);
		squares[aiMoveIndex] = "O";
		setHistory([...historyPoint, squares]);
		setStep(historyPoint.length);
	};

	const jumpTo = (step) => {
		setStep(step);
		if (!isAiMode) setIsXsTurn(step % 2 === 0);
		else setIsXsTurn(true);
	};

	const HistoryMoves = () => {
		return history
			.map((_step, move) => {
				const destination = move ? `Go to Move #${move}` : "Go to Start";
				return (
					<li key={move}>
						<button onClick={() => jumpTo(move)}>{destination}</button>
					</li>
				);
			})
			.slice(0, -1)
			.reverse();
	};

	const toggleAiMode = () => {
		setIsAiMode(!isAiMode);
		setHistory([history[0]]);
		jumpTo(0);
	};
	
	const onRestart = () => {
		setHistory([history[0]]);
		jumpTo(0);
	};

	return (
		<>
			<div className="app-container">
				<div className="header">
					<img src={logo} alt={logo} />
					<h1>Tic Tac Toe</h1>
					<h3>With Ai</h3>
				</div>
				<div className="settings">
					<div id="toggles">
						<input
							type="checkbox"
							name="checkbox1"
							id="checkbox1"
							className="ios-toggle"
							checked={isAiMode}
							onChange={toggleAiMode}
						/>
						<label
							htmlFor="checkbox1"
							className="checkbox-label"
							data-off="Ai off"
							data-on="Ai on"
						></label>
					</div>
					{/* <button onClick={toggleAiMode}>
						{isAiMode ? "Single-Player" : "Multiplayer"}
					</button> */}
					<img className="restart" onClick={onRestart} src={restart} alt={restart} />
					<h3>
						{winner ? "Winner: " + winner : "Next Player: " + currentPlayer}
					</h3>
				</div>
				<div className="board-wrapper">
					{/* <div className="board-container"> */}
					<Board squares={history[step]} onClick={handleClick} />
					{/* </div> */}
				</div>
				{history.length > 1 && (
					<div className="history-wrapper">
						<div>
							<h3>Recent Moves</h3>
							<ul>
								<HistoryMoves />
							</ul>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Game;
