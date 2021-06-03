export function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	if (squares.findIndex((square) => square === null) === -1) return "Tie";
	return null;
}

export function bestMove(squares) {
	let board = squares;
	let bestScore = -Infinity;
	let move;
	for (let i = 0; i <= 8; i++) {
		if (board[i] === null) {
			board[i] = 'O';
			let score = minimax(board, 0, false);
			board[i] = null;
			if (score > bestScore) {
				bestScore = score;
				move = i;
			}
		}
	}
	return move;
}

const scores = {
	X: -10,
	O: 10,
	Tie: 0,
};

function minimax(board, isMaximizing) {
	let result = calculateWinner(board);
	if (result !== null) {
    let score = scores[result];
		return score;
	}
	if (isMaximizing) {
		let bestScore = -Infinity;
		for (let i = 0; i <= 8; i++) {
			if (board[i] === null) {
				board[i] = 'O';
				let score = minimax(board, false);
				board[i] = null;
				bestScore = Math.max(score, bestScore);
			}
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		for (let i = 0; i <= 8; i++) {
			if (board[i] === null) {
				board[i] = 'X';
				let score = minimax(board, true);
				board[i] = null;
				bestScore = Math.min(score, bestScore);
			}
		}
		return bestScore ;
	}
}
