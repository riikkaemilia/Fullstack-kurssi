import React from 'react'

const Person = ({ persons, deletePerson }) => {
    return (
        <li>{persons.name} {persons.number} <button onClick={deletePerson} type="button">delete</button></li>
    )
}

export default Person