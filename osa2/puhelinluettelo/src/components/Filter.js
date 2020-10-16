import React from 'react'

const Filter = ({ handleFilter }) => {
    return (
        <div>
            filter numbers: <input
                onChange={handleFilter} />
        </div>
    )
}

export default Filter