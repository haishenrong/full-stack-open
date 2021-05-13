import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Countries = ({countries, text, setNewFilter, weather, setWeather}) => {
    
  let filtered = countries.filter(country => 
    country.name.toUpperCase().includes(text.toUpperCase()));
  if(filtered.length>10){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(filtered.length===1){
    return(
      <ParticularCountry country = {filtered[0]} weather = {weather} setWeather = {setWeather}/>
    )
  }
  else if(filtered.length === 0)
  {
    return(
      <div>
          No match
      </div>
    )
  }
  else{
    return(
      filtered.map(country => 
        <div>
          <Country 
          key = {country.numericCode} 
          country = {country}
          setNewFilter = {setNewFilter}
          />
        </div>
      )
    )
  }
}

const Filter = ({newFilter, handleFilterChange}) => {
  return(
    <div>
    find countries<input value={newFilter} 
    onChange ={handleFilterChange} />
    </div>
  )
}

const Country = ({ country, setNewFilter }) => {
  return (
    <li>
      {country.name + " "} 
      <button onClick={() => setNewFilter(country.name)}>
        show
      </button>
    </li>
  )
}

const ParticularCountry = ({ country, setWeather}) => {
    const hook = () => {
      const params = {
        access_key: '55743320e04ad0ddd0e15faa24747a87',
        query: country.name
      }
    console.log('effect')
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }
  useEffect(hook,[])
  
  //console.log("Current temperature in " + weather.location.name + ' is ' + weather.current.temperature + '℃')
  //console.log('render', weather, 'weather')
  return (
    <div>
      <h1>
        {country.name}
      </h1>
      <div>
        {"capital " + country.capital}
      </div>
      <div>
        {"population " + country.population}
      </div>
      <h2>
        Spoken languages
      </h2>
      <ul>
        {country.languages.map(language =>
          <div>
            {language.name}
          </div>
        )}
      </ul>
      <div>
        <img src={country.flag} alt ='country flag' length = '25%' width = '25%'/>
      </div>

    </div>
  )
}
const Weather = ({weather}) => {
  //console.log('Hi',typeof weather.current.temperature)
  if(typeof(weather.current) == "undefined")
  {
    return(
      <div>
        Nan
      </div>
    )
  }
  return(
    <div>
    <h2>
      Weather in Helsinki
    </h2>
    <div>
      {"temperature: "+ weather.current.temperature + " Celcius"}
    </div>
    <div>
    <img src={weather.current.weather_icons} alt ='weathericon' length = '15%' width = '15%'/>
    </div>
    <div>
      {"wind: "+ weather.current.wind_speed+" kmph direction "+ weather.current.wind_dir}
    </div>
    </div>
  )

}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('Switzerland')
  const [ weather, setWeather ] = useState([])
  
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter
        newFilter = {newFilter}
        handleFilterChange={handleFilterChange}
      />

      <Countries 
        countries={countries} 
        text = {newFilter}
        setNewFilter = {setNewFilter}
        //weather = {weather}
        setWeather = {setWeather}
      />
      <Weather
        weather = {weather}
      />
    </div>
  );
}

export default App;
