import React from 'react'
import { useNavigate } from 'react-router-dom'





export default function UnloggedMain(props) {
  const navigate = useNavigate()
  return (
    <div id='unlogged-main'>
      <div id='unlogged-main-text'>
        <h3>IS WHERE YOU ARE AT</h3>
        <h3 style={{opacity: `${props.opacity}`}}>{props.weather}</h3>
      </div>
      <div id='unlogged-main-btn' onClick={() => {
        navigate('/weather')
      }}> 
        <h3 >Find Out</h3>
      </div>
    </div>
  )
}
