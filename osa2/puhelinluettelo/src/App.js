import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                console.log('promise fulfilled')
                setPersons(initialPersons)
            })
    }, [])

    // console.log('persons', persons.length, 'length')

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
            changeInfo(newName, newNumber)
        } else {
            personService
                .create(infoObject)
                .then(returnedPerson => {
                    //  console.log('returned person is', returnedPerson)
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const changeInfo = (name, number) => {
        const person = persons.find(n => n.name === name)
        const changedPerson = { ...person, number: number }

        if (person.number === '' || window.confirm(`${name} is already added in the phonebook, do you wish to replace the old number with a new one?`)) {
            personService
                .update(person.id, changedPerson)
                .then(returnedPerson => {
                    console.log('returned person is', returnedPerson)
                    setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deletePersonOf = (name, id) => {
        if (window.confirm(`Do you want to delete ${name} from phonebook?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(n => n.id !== id))
                    console.log('deleted person with id', id)
                })
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
                    <Person
                        key={person.id}
                        persons={person}
                        deletePerson={() => deletePersonOf(person.name, person.id)} />
                )}
            </ul>
        </div>
    )

}

export default App