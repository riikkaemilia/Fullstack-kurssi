import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryView = (props) => {
    const { countryToShow } = props
    return (
        <div>
            <h2>{countryToShow[0].name}</h2>
            <p>Capital: {countryToShow[0].capital}</p>
            <p>Population: {countryToShow[0].population}</p>
            <h3>Languages</h3>
            <ul>
                {countryToShow[0].languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <img width='10%' src={countryToShow[0].flag} alt={countryToShow[0].name}></img>
        </div>
    )
}

const ShowCountries = (props) => {
    const { countriesToShow } = props

    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter.</p>
    } else if (countriesToShow.length === 0) {
        return <p>There are only 0 matches.</p>
    } else if (countriesToShow.length === 1) {
        return (
            <CountryView countryToShow={countriesToShow} />
        )
    } else {
        return (<ul>{countriesToShow
            .map(country => <li key={country.alpha2Code}>{country.name}<button type="button">show</button></li>)}
        </ul>)
    }
}

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
        //     console.log(event.target.value)
        setSearch(event.target.value)
    }

    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
    console.log('countries to show is', countriesToShow)

    return (
        <div>
            <p>
                Search countries:
            <input onChange={handleSearch} />
            </p>
            <ShowCountries countriesToShow={countriesToShow} />
        </div>
    )
}

export default App