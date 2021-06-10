import React, { useEffect, useState } from "react";
import { calculateWinner, bestMove } from "../service";
import Board from "./Board";
import logo from "../assets/img/tic-tac-toe.svg";
import restart from "../assets/img/restart.svg";
import x from "../assets/img/x.svg";
import o from "../assets/img/o.svg";

const Game = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [step, setStep] = useState(0);
	const [isXsTurn, setIsXsTurn] = useState(true);
	const [isAiMode, setIsAiMode] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const winner = calculateWinner(history[step]);
	const currentPlayer = isXsTurn ? "X" : "O";


	// For animating Next Player block on endgame
	useEffect(() => {
		const nextPlayerEl = document.querySelector("h3.next-player");
		if (nextPlayerEl) {
			nextPlayerEl.style.display = "block";
			nextPlayerEl.style.opacity = 1;
			setTimeout(() => {
				nextPlayerEl.style.opacity = 0;
				nextPlayerEl.style.display = "none";
			}, 1000);
		}
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
			setIsXsTurn(false)
			setIsLoading(true);
			setTimeout(() => {
				makeAiMove(historyPoint, squares);
				setIsLoading(false);
				setIsXsTurn(true)
			}, 1000);
		} else {
			setIsXsTurn(!isXsTurn);
		}
	};

	const makeAiMove = (historyPoint, squares) => {
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

	const onToggleAiMode = () => {
		setIsAiMode(!isAiMode);
		setHistory([history[0]]);
		jumpTo(0);
	};

	const onRestart = () => {
		setHistory([history[0]]);
		jumpTo(0);
	};

	const NextPlayerPreview = ({ currentPlayer, winner }) => {
		return (
			<div className={`next-player-preview ${winner && "won"}`}>
				<p>Next Player</p>
				<img
					src={currentPlayer === "X" ? x : o}
					alt={currentPlayer === "X" ? x : o}
				/>
			</div>
		);
	};

	return (
		<>
			<div className="app-container">
				<div className="header">
					<img src={logo} alt={logo} />
					<h1>Tic Tac Toe</h1>
					<h3>With Ai</h3>
				</div>
				<section className="settings">
					<div className="toggles">
						<input
							type="checkbox"
							name="checkbox1"
							id="checkbox1"
							className="ios-toggle"
							checked={isAiMode}
							onChange={onToggleAiMode}
						/>
						<label
							htmlFor="checkbox1"
							className="checkbox-label"
							data-off="Multiplayer"
							data-on="Single Player"
						></label>
					</div>
					{/* {<div className="toggles">
						<input
							type="checkbox"
							name="checkbox2"
							id="checkbox2"
							className="ios-toggle"
							checked={isAiMode}
							onChange={onToggleAiMode}
						/>
						<label
							htmlFor="checkbox2"
							className="checkbox-label"
							data-off="Remote"
							data-on="Local"
						></label>
					</div>} */}
				</section>

				<div className="board-wrapper">
					{isLoading && !winner && (
						<div class="lds-ripple">
							<div></div>
							<div></div>
						</div>
					)}
					{winner === "Tie" && <h3 className="winner">It's a Tie!</h3>}
					{(winner === "X" || winner === "O") && (
						<div className="winner">
							<img src={winner === "X" ? x : o} alt={winner === "X" ? x : o} />
							<h3>Won!</h3>
						</div>
					)}
					<Board
						winner={winner}
						squares={history[step]}
						onClick={handleClick}
					/>
				</div>
				<section className="bottom">
					<NextPlayerPreview winner={winner} currentPlayer={currentPlayer} />
					{history.length > 1 && (
						<div className="history-wrapper">
							<h3>Recent Moves</h3>
							<ul>
								<HistoryMoves />
							</ul>
						</div>
					)}
					<button className={`restart  ${winner && "won"}`} onClick={onRestart}>
						<img src={restart} alt={restart} />
						<p>Restart</p>
					</button>
				</section>
			</div>
		</>
	);
};

export default Game;
