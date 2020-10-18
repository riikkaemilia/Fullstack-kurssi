import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    console.log('persons', persons.length, 'length')

    const addInfo = (event) => {
        event.preventDefault()
        const infoObject = {
            name: newName,
            number: newNumber
        }

        const nameExists = persons.some(person => person.name === newName)

        if (infoObject.name === '') {
            window.alert(`You must insert a name.`)
        } else if (nameExists) {
            window.alert(`${newName} is already in the phonebook.`)
        } else {
            setPersons(persons.concat(infoObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())
    || person.number.includes(newFilter))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilter={handleFilter} />
            <h2>Add a new:</h2>
            <PersonForm
                addInfo={addInfo}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <ul>
                {numbersToShow.map(person =>
                    <Person key={person.name} persons={person} />
                )}
            </ul>
        </div>
    )

}

export default App