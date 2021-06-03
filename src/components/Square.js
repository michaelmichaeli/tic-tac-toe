import React from 'react';

const Square = ({ value, onClick }) => {

    const style = value ?
        `squares ${value}`
        : `squares`

    return (
        <button
            onClick={onClick}
            className={style}
        >
            {value ? value : "O"}
        </button>
    )
}

export default Square;