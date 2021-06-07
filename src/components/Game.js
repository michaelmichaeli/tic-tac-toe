import React, { useEffect, useState } from "react";
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

	useEffect(() => {
		// setTimeout(() => {
		const nextPlayerEl = document.querySelector("h3.next-player");
		if (nextPlayerEl) {
				nextPlayerEl.style.display = "block";
				nextPlayerEl.style.opacity = 1;
				setTimeout(() => {
					nextPlayerEl.style.opacity = 0;
					nextPlayerEl.style.display = "none";
				}, 2000);
			}
			// }, 1000);
	}, [currentPlayer]);

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
							data-off="Multiplayer"
							data-on="Single Player"
						></label>
					</div>
				</div>
				<div className="board-wrapper">
					{winner && (
						<h3 className="winner">
							{winner !== "Tie" ? winner + " won!" : "It's a Tie!"}
						</h3>
					)}
					{!isAiMode && !winner && (
						<h3 className="next-player">
							{"It's " + currentPlayer + "'s turn"}
						</h3>
					)}
					<Board squares={history[step]} onClick={handleClick} />
				</div>
				{history.length > 1 && (
					<section className="bottom">
						<div className="history-wrapper">
							<h3>Recent Moves</h3>
							<ul>
								<HistoryMoves />
							</ul>
						</div>
						<div className="restart" onClick={onRestart}>
							<img src={restart} alt={restart} />
							<p>Restart</p>
						</div>
					</section>
				)}
			</div>
		</>
	);
};

export default Game;
