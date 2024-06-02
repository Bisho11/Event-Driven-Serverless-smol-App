import React from 'react'
import './Topbar.css'
import Devola from "../assets/Devola_Icon.png"


function Topbar() {
  return (
    <div className='topbar gap-3'>

      <div className='logo'>
        <img src={Devola} alt='Devola'/>
      </div>
      <h1 className='font-open text-3xl'>Devola's Machen</h1>
    </div>
    
  )
}

export default Topbar;