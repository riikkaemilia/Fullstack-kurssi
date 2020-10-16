import React from 'react'

const PersonForm = ({ addInfo, newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={addInfo}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange} />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm