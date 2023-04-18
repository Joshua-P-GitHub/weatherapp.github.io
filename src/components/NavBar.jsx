import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
  return (
    <div id='nav-bar' className='sunny'>
      <div id='nav-bar-left'>
        <h3>New York</h3>
      </div>
      <div id='nav-bar-right'>
        <Link to={'/'}>
        <h3>Home</h3>       
        </Link>
        <Link to={'/about'}>
        <h3>About</h3>        
        </Link>
        <Link to={'/weather'}>
        <h3>Check Weather</h3>        
        </Link>
      </div>
    </div>
  )
}
