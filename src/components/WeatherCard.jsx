import React from 'react'

export default function WeatherCard(props) {
  return (
    <div className="container" style={{backgroundImage: `url(${props.backGround})`}}>
    <div className="card glass">
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
        <h3>Speed: 4.1</h3>
        <h3>Gust: 6.78</h3>
        <h3>Deg: 277</h3>
        </div>
      </div>
    </div>            
    </div> 
  )
}
