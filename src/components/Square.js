import React from "react";
import x from "../assets/img/x.svg";
import o from "../assets/img/o.svg";

const Square = ({ value, onClick, winner }) => {
	return (
		<button
			className={`squares ${value && value} ${winner && "win"}`}
			onClick={onClick}
			disabled={winner}>
			{value === "X" && <img src={x} alt={x} />}
			{value === "O" && <img src={o} alt={o} />}
			{value === "" && null}
		</button>
	);
};

export default Square;
