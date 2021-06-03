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
            {value}
        </button>
    )
}

export default Square;