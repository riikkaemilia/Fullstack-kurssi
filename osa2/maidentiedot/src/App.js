import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import ShowCountries from './components/ShowCountries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newSearch, setSearch] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    //  console.log('render', countries.length, 'countries')

    const handleSearch = (event) => {
        // console.log(event.target.value)
        setSearch(event.target.value)
    }

    const handleShow = (clickShow) => {
        setSearch(clickShow)
    }

    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
    //  console.log('countries to show is', countriesToShow)

    return (
        <div>
            <Search handler={handleSearch} />
            <ShowCountries countriesToShow={countriesToShow} handleShow={handleShow} />
        </div>
    )
}

export default App