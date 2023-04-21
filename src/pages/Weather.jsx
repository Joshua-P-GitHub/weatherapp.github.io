import NavBar from "../components/NavBar";
import sunnyBG from '../public/sunny.jpg'
import rainyBG from '../public/rainy2.jpg'
import cloudyBG from '../public/cloudy.jpg'
import WeatherCard from "../components/WeatherCard";
import axios from 'axios'
import { useEffect, useState } from "react";

function makeProperTitle(title){
  let arr = []
  let arr2 = []
  let finalString = ''
  let finalString2 = ''
  if (title.split(' ').length > 1){
    let wordArr = title.split(' ')
    for(let word of wordArr){
      arr = []
      finalString = ''
      for(let character of word){
        arr.push(character)
      }
      for (let i = 0; i < arr.length; i++){
        if (i === 0){
          arr[i] = arr[i].toUpperCase()
        }
        finalString += arr[i]
      }
      arr2.push(finalString)
    }
    for (let i = 0; i < arr2.length; i++){
      finalString2 += `${arr2[i]} `
    }
    finalString2.trimEnd()
    return finalString2
  } else {
    for(let character of title){
      arr.push(character)
    }
    for (let i = 0; i < arr.length; i++){
      if (i === 0){
        arr[i] = arr[i].toUpperCase()
      }
      finalString += arr[i]
    }
    return finalString
  }
}
const sleep = async (milliseconds) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  })
}
export default function Weather() {
  let go = false
  const [places, changePlaces] = useState({})
  console.log(places)



  
const getWeather = async (city, state) => {
  let lat;
  let lon;
  let stateName;
  go = false
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
     if (response.data.length > 0){
      go = true
      if (state){
        let foundOne = false
       for(let stateOBJ of response.data){
        if (stateOBJ.state.toLowerCase() === state.toLowerCase()){
          foundOne = true
          lat = stateOBJ.lat
          lon = stateOBJ.lon
          stateName = stateOBJ.state
        }
       } 
       if (!foundOne){
        lat = response.data[0].lat
        lon = response.data[0].lon
        stateName = response.data[0].state  
       }       
      } else {
      lat = response.data[0].lat
      lon = response.data[0].lon
      stateName = response.data[0].state        
      }
      let cityName = response.data[0].name
      const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      return {...weather.data, stateName, cityName}
    }  else {
    }
  } catch (error) {

  }
}

async function handleSubmit(e){
  if(e.key === 'Enter'){
   let city = e.target.value.split(',')[0]
   city = city.trim()
   let state = '';
   if (e.target.value.split(',').length > 1){
     state = e.target.value.split(',')[1]
     state = state.trim()
   }
  let placeWeather = await getWeather(city, state)

  if (places && go){
    changePlaces(() => ({
      ...places,
      [`${placeWeather.cityName.replace(/ /g, '-')}${placeWeather.stateName.replace(/ /g, '-')}`]: placeWeather
     }),)
    } 
  }

}

  function handleDelete(key){
    console.log(key);
    let data = {...places}
    delete data[key]
    localStorage.setItem('places', JSON.stringify(data))
    changePlaces(data)
  }


 useEffect(() => {
  const data = localStorage.getItem('places')
  if (data !== null){
    changePlaces(JSON.parse(data))
  }
 }, [])

 useEffect(() => {
  localStorage.setItem('places', JSON.stringify(places))
 }, [places])

  return (
    <div id="weather">
        <header>
          <NavBar />
          <input className="full-input glass" placeholder="Enter City" onKeyDown={handleSubmit}/>
        </header>
        <main>
          <div className="card-holder">
            {Object.values(places).map((place) => {
              let weather = place.weather[0].main
              return <WeatherCard key={`${place.cityName.replace(/ /g, '-')}${place.stateName.replace(/ /g, '-')}`} name={`${place.cityName}, ${place.stateName}`} backGround={ weather === 'Clear' ? sunnyBG : weather === 'Clouds' ? cloudyBG: rainyBG} temp={place.main} weather={place.weather[0]} delete={handleDelete} keyName={`${place.cityName.replace(/ /g, '-')}${place.stateName.replace(/ /g, '-')}`}/>
            })}          
          </div>
        </main>
    </div>
  )
}
