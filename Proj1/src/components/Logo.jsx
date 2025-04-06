import React from 'react'

function Logo({width = '100px'}) {
  return (
    <img src="src/assets/logo.png" alt="Logo" width={width} className='rounded'/>
  )
}

export default Logo