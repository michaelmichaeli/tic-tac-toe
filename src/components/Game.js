import React, { useState } from "react";
import { calculateWinner, bestMove } from "../helper";
import Board from "./Board";

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
		if (isAiMode && calculateWinner(squares) === null) {
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
		setIsXsTurn(step % 2 === 0);
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
			.slice(0, -1);
	};

	return (
		<>
			<h1>React Tic Tac Toe - With Ai</h1>
			<div className="settings">
				<button
					onClick={() => {
						setIsAiMode(!isAiMode);
						jumpTo(0);
					}}
				>
					Ai is {isAiMode ? "on" : "off"}
				</button>
			</div>
			<div className="board-container">
				<Board squares={history[step]} onClick={handleClick} />
			</div>
			<div className="info-wrapper">
				<div>
					<h3>History</h3>
					<ul>
						<HistoryMoves />
					</ul>
				</div>
				<h3>
					{winner ? "Winner: " + winner : "Next Player: " + currentPlayer}
				</h3>
			</div>
		</>
	);
};

export default Game;
