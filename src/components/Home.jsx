import React from 'react'
import Hero from './Hero'

const Home = () => {
  return (
    <div>
      <div className="hero overflow-hidden">
        <Hero color='yellow-400' position='left' />
        <Hero color='green-300' position='right' />
      </div>
    </div>
  )
}

export default Home
