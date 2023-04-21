import React from 'react'
import {motion} from "framer-motion"

export default function WeatherCard(props) {
  return (
    <div className="container" style={{backgroundImage: `url(${props.backGround})`}}>
    <motion.div className="card glass"
    animate={{ opacity: [0 ,1], y: [30, 0] }}
    exit={{opacity: [1,0]}}
    transition={{ duration: 5 }}>
      <div className='card-header'>
        <h1>{props.name}</h1>
      </div>
      <div className='weather-description'>
          <h3>{props.weather.main}</h3>
      </div>
      <div className='temp'> 
        <div className='temp-now'>
          <h3>{props.temp.temp}</h3>
        </div>
        <div className='temp-hi-low'>
          <div className='temp-hi'>
            <h3>HI:{props.temp.temp_max}</h3>
          </div>
          <div className='temp-low'>
            <h3>Low:{props.temp.temp_min}</h3>
          </div>
        </div>
      </div>
      <div className='wind'>
        <div className='wind-title'>
          <h3>WIND</h3>
        </div>
        <div className='wind-data'>
        <h3>Speed: {props.wind.speed}</h3>
        {props.wind.gust && <h3>Gust: {props.wind.gust}</h3>}
        <h3>Deg: {props.wind.deg}</h3>
        </div>
      </div>
      <div className='card-footer' onClick={() => {
        props.delete(props.keyName)
      }}>
        <h3>Remove</h3>
      </div>
    </motion.div>            
    </div> 
  )
}
