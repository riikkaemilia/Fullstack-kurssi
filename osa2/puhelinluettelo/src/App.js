import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '567-9456532' },
        { name: 'Bentti Papparainen', number: '432-54-679432' },
        { name: 'Jarmo Joukkinen', number: '5435-23565' },
        { name: 'Sintti Saapas', number: '0000-55555' },
        { name: 'Kaali Maa', number: '433566-2234565' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter] = useState('')

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
            {numbersToShow.map(person =>
                <Person key={person.name} persons={person} />
            )}
        </div>
    )

}

export default App