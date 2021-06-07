import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, winner }) => {
    return <div className="board">
        {squares.map((square, i) => {
            return <Square
                key={i}
                value={square}
                onClick={() => onClick(i)}
                winner={winner}
            />
        })}
    </div>;
};

export default Board;