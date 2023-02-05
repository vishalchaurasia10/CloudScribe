import React from 'react'
import image from '../assets/comingsoon.png'

const Music = () => {
  return (
    <>
      <div className='h-screen bg-slate-200 w-full flex items-center justify-center'>
        <img className='lg:w-[43rem] lg:mt-16 animate-scale lg:h-[43rem]' src={image} alt="comingsoon" />
      </div>
    </>
  )
}

export default Music
