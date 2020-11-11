import React, { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

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
            setErrorMessage(`You must insert a name.`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
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
                    setSuccessMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    console.log(error.response.data)
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
                    // console.log('returned person is', returnedPerson)
                    setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setSuccessMessage(`Changed number of ${name} to ${number}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(`Information of ${name} has already been removed from the server.`)
                    setPersons(persons.filter(p => p.id !== person.id))
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                }
                )
        }
    }

    const deletePersonOf = (name, id) => {
        if (window.confirm(`Do you want to remove ${name} from phonebook?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(n => n.id !== id))
                    // console.log('deleted person with id', id)
                    setSuccessMessage(`Deleted ${name} from phonebook.`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(`Information of ${name} has already been removed from the server.`)
                    setPersons(persons.filter(n => n.id !== id))
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                }
                )
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
            <h1>Phonebook</h1>
            <Filter handleFilter={handleFilter} />
            <h2>Add a new number:</h2>
            <PersonForm
                addInfo={addInfo}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange} />

            <Notification
                successMessage={successMessage}
                errorMessage={errorMessage}
            />

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