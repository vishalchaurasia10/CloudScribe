import React, { useContext } from 'react'
import Hero from './Hero'
import modeContext from '../context/modes/modeContext'
import AddShortcut from './AddShortcut';

const Home = () => {
  const context = useContext(modeContext);
  const { darkMode } = context;
  return (
    <div>
      <div className="hero overflow-hidden">
        <Hero color={`${darkMode?'bg-[#212E35]':'bg-yellow-400'}`} darkMode={darkMode} position='left' />
        <Hero color={`${darkMode?'bg-[#5A6064]':'bg-green-400'}`} darkMode={darkMode} position='right' />
      </div>
       {localStorage.getItem('token')?<AddShortcut/>:''} 
    </div>
  )
}

export default Home
