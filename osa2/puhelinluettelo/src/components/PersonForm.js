import React from 'react'

const PersonForm = ({ addInfo, newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={addInfo}>
            <div>
                <label>Name: <input
                        id='name'
                        value={newName}
                        onChange={handleNameChange} />
                </label>
                <br />
                <label>Number: <input
                        id='number'
                        value={newNumber}
                        onChange={handleNumberChange} />
                </label>
                <br />
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm