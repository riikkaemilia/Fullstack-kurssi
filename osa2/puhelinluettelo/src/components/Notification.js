import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
    const successStyle = {
        color: '#1F513B',
        background: '#C4E2A2',
        padding: '0.8em',
        width: 'fit-content'
    }

    const errorStyle = {
        color: 'white',
        background: '#E13C09',
        padding: '0.8em',
        width: 'fit-content'
    }

    if (successMessage === null && errorMessage === null) {
        return null
    } else if (errorMessage === null) {
        return (
            <div style={successStyle}>
                {successMessage}
            </div>
        )
    } else if (successMessage === null) {
        return (
            <div style={errorStyle}>
                {errorMessage}
            </div>
        )
    }

    return (
        <>
            <div style={successStyle}>
                {successMessage}
            </div>
            <div style={errorStyle}>
                {errorMessage}
            </div>
        </>
    )
}

export default Notification