import React from 'react'

const Search = ({ handler }) => {
    return (
        <p>
            Search countries: <input onChange={handler} />
        </p>
    )
}

export default Search

