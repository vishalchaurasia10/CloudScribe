import React, { useContext } from 'react'
import image from '../assets/comingsoon.png'
import modeContext from '../context/modes/modeContext'

const Music = () => {
  const mode = useContext(modeContext)
  const { darkMode } = mode
  return (
    <>
      <div className={`h-screen ${darkMode?'bg-[#5A6064]':'bg-slate-200'} w-full flex items-center justify-center`}>
        <img className='lg:w-[43rem] lg:mt-16 animate-scale lg:h-[43rem]' src={image} alt="comingsoon" />
      </div>
    </>
  )
}

export default Music
