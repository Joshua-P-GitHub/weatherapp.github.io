import NavBar from "../components/NavBar";
import sunnyBG from '../public/sunny.jpg'
import rainyBG from '../public/rainy2.jpg'
import cloudyBG from '../public/cloudy.jpg'
import WeatherCard from "../components/WeatherCard";
import axios from 'axios'
import { useState } from "react";



export default function Weather() {
  const [places, changePlaces] = useState({})
  console.log(places);
const getWeather = async (state) => {
  let lat;
  let lon;
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${state}&limit=5&appid=0a135a1138c0aa9c08da8f85f6c3d9f9`)
    console.log(response.data);
    if (response.data){
      lat = response.data[0].lat
      lon = response.data[0].lon
      const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0a135a1138c0aa9c08da8f85f6c3d9f9`)
      console.log(weather.data);
      return weather.data
    }
  } catch (error) {
    
  }
}

async function handleSubmit(e){
  if(e.key === 'Enter'){

  let placewWeather = await getWeather(e.target.value)
  if (places){
    console.log('ran1');
    changePlaces(() => ({
      ...places,
      [e.target.value]: placewWeather
     }),)
    } 

  }

}

  return (
    <div id="weather">
        <header>
          <NavBar />
          <input className="full-input glass" placeholder="Enter State" onKeyDown={handleSubmit}/>
        </header>
        <main>
          <div className="card-holder">
            {Object.values(places).map((place) => {
              let weather = place.weather[0].main
              return <WeatherCard name={place.name} backGround={ weather === 'Clear' ? sunnyBG : weather === 'Clouds' ? cloudyBG: rainyBG} temp={place.main} weather={place.weather[0]}/>
            })}          
          </div>
        </main>
    </div>
  )
}
