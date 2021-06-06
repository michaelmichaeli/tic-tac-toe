import React from "react";
import x from "../assets/img/x.svg";
import o from "../assets/img/o.svg";


const Square = ({ value, onClick }) => {
	const style = value ? `squares ${value}` : `squares`;
	return (
		<button onClick={onClick} className={style}>
			{value === "X" && <img src={x} alt={x} />}
			{value === "O" && <img src={o} alt={o} />}
			{value === "" && null}
		</button>
	);
};

export default Square;
