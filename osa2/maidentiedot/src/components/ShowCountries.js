import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weather }) => {
    return (
        <>
            {weather ?
                <>
                    <p>Temperature: {weather.temperature} Celsius</p>
                    <img src={weather.weather_icons} alt={weather.weather_descriptions}></img>
                    <p>Wind: {weather.wind_speed} km/h direction {weather.wind_dir}</p>
                </>
                :
                <p>There is no weather available.</p>
            }
        </>
    )
}

const CountryView = ({ countryToShow }) => {
    const [weather, setWeather] = useState([])

    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        let unmounted = false

        const params = {
            access_key: api_key,
            query: countryToShow.capital
        }
        axios
            .get('http://api.weatherstack.com/current', { params })
            .then(response => {
                if (!unmounted) {
                    const apiResponse = response.data.current;
                    setWeather(apiResponse)
                }
            })

        return () => unmounted = true
    }, [api_key, countryToShow.capital])

    //  console.log(weather)

    return (
        <div>
            <h2>{countryToShow.name}</h2>
            <p>Capital: {countryToShow.capital}</p>
            <p>Population: {countryToShow.population}</p>
            <h3>Languages</h3>
            <ul>
                {countryToShow.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <img width='10%' src={countryToShow.flag} alt={countryToShow.name}></img>
            <h3>Weather in {countryToShow.capital}</h3>
            <Weather weather={weather} />
        </div>
    )
}

const ShowCountries = ({ countriesToShow, handleShow }) => {

    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter.</p>
    } else if (countriesToShow.length === 0) {
        return <p>There are only 0 matches.</p>
    } else if (countriesToShow.length === 1) {
        return (
            <div>
                {countriesToShow.map(country =>
                    <CountryView key={country.alpha2Code} countryToShow={country} />
                )
                }
            </div>
        )
    } else {
        return (<ul>
            {countriesToShow.map(country =>
                <li key={country.alpha2Code}>
                    {country.name} <button type="button" onClick={() => handleShow(country.name)}>show</button>
                </li>
            )}
        </ul>
        )
    }
}

export default ShowCountries