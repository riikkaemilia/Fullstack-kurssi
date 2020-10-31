import React from 'react'

const Filter = ({ handleFilter }) => {
    return (
        <div>
            <label>
                Filter numbers: <input
                    onChange={handleFilter} />
            </label>
        </div>
    )
}

export default Filter