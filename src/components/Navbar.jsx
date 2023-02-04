import { faMoon, faSearch, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {

  const [mode, setMode] = useState('light');
  const [expand, setExpand] = useState(false);

  let location = useLocation();
  useEffect(() => {
  }, [location])

  const changeMode = () => {
    if (mode === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  const expandNav = () => {
    if (expand) {
      setExpand(false)
    } else {
      setExpand(true)
    }
  }

  return (
    <>
      <nav className=' fixed top-0 shadow-2xl w-full z-50'>
        <div className="navWrapperLargeScreen p-2 bg-[rgba(255,255,255,0.2)] backdrop-blur-2xl hidden lg:flex justify-between items-center px-8">

          <div className="left">
            <div className="logo font-bold text-2xl">Cloud Scribe</div>
          </div>

          <div className="center">
            <ul className='flex justify-center  font-poppins text-lg items-center space-x-8'>
              <li className={`flex flex-col`}>
                <Link to="/">Home</Link>
                <span className={`bg-black ${location.pathname === '/' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
              </li>
              <li className={`flex flex-col`}>
                <Link to="/notes">Notes</Link>
                <span className={`bg-black ${location.pathname === '/notes' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
              </li>
              <li className={`flex flex-col`}><Link to="/addnote">Create Notes</Link>
                <span className={`bg-black ${location.pathname === '/addnote' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
              </li>
              <li className={`flex flex-col`}><Link to="/about">About Me</Link>
                <span className={`bg-black ${location.pathname === '/about' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
              </li>
            </ul>
          </div>



          <div className="right flex items-center space-x-4">
            <div className="mode flex flex-col h-6 overflow-hidden">
              <div className={`flex flex-col transition-all duration-500 ${mode === 'light' ? '' : '-translate-y-8'}  space-y-4`}>
                <FontAwesomeIcon className={`w-5 h-5 text-blue-400`} id='moon' onClick={changeMode} icon={faMoon} />
                <FontAwesomeIcon className={` w-5 h-5 pl-[0.1rem] transition-all duration-500 text-blue-400`} id='sun' onClick={changeMode} icon={faSun} />
              </div>
            </div>
            <div className="buttons space-x-4">
              <Link to='/login'>
                <Button title='Login' padding='2' />
              </Link>
              <Link to='/signup'>
                <Button title='Sign Up' padding='2' />
              </Link>
            </div>
          </div>
        </div>

        <div className="navwrapperSmallScreen bg-[rgba(255,255,255,0.2)] backdrop-blur-2xl flex lg:hidden p-2 justify-between items-center">
          <div className="left">
            <h1 className='logo font-bold text-2xl' >Cloud Scribe</h1>
          </div>

          <div className="right flex items-center space-x-2">
            <FontAwesomeIcon className='text-black' icon={faSearch} />

            <div className="mode flex flex-col h-5 overflow-hidden">
              <div className={`flex flex-col transition-all duration-500 ${mode === 'light' ? '' : '-translate-y-8'}  space-y-4`}>
                <FontAwesomeIcon className={`w-5 h-5 text-black`} id='moon' onClick={changeMode} icon={faMoon} />
                <FontAwesomeIcon className={` w-4 h-4 pl-[0.1rem] transition-all duration-500 text-black`} id='sun' onClick={changeMode} icon={faSun} />
              </div>
            </div>
            <div className="hamburger z-50 space-y-1">
              <div onClick={expandNav} className={`${expand ? '-rotate-45 translate-y-[0.45rem]' : ''} w-6 transition-all duration-300 rounded-full bg-black h-1`}></div>
              <div onClick={expandNav} className={`${expand ? 'scale-0' : ''} w-6 transition-all duration-300 rounded-full bg-black h-1`}></div>
              <div onClick={expandNav} className={`${expand ? 'rotate-45 -translate-y-2' : ''} w-6 transition-all duration-300 rounded-full bg-black h-1`}></div>
            </div>
          </div>


        </div>
      </nav>
      <div className={`expanded lg:hidden transition-all duration-500 fixed top-0 h-screen z-30 w-full flex items-center justify-center backdrop-blur-lg ${expand ? '' : 'translate-x-[60rem]'}`}>
        <div className="navItems">
          <ul className='flex flex-col space-y-3 justify-center font-poppins text-lg items-center'>
            <li className="logo font-bold text-2xl">Cloud Scribe</li>
            <li className={`flex flex-col`}>
              <Link to="/">Home</Link>
              <span className={`bg-orange-400 ${location.pathname === '/' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
            </li>
            <li className={`flex flex-col`}>
              <Link to="/notes">Notes</Link>
              <span className={`bg-orange-400 ${location.pathname === '/notes' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
            </li>
            <li className={`flex flex-col`}><Link to="/addnote">Create Notes</Link>
              <span className={`bg-orange-400 ${location.pathname === '/addnote' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
            </li>
            <li className={`flex flex-col`}><Link to="/about">About Me</Link>
              <span className={`bg-orange-400 ${location.pathname === '/about' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
            </li>
            <li className='flex py-2 text-center flex-col space-y-4'>
              <Link to='/login'>
                <Button title='Login' position='auto' padding='1' />
              </Link>
              <Link to='/signup'>
                <Button title='Sign Up' position='auto' padding='1' />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
