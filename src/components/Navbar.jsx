import { faMoon, faSearch, faSun, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Button from './Button';
import modeContext from '../context/modes/modeContext';
import queryContext from '../context/query/queryContext';

const Navbar = (props) => {

  const [search, expandSearch] = useState(false);
  const [mode, setMode] = useState('light');
  const [expand, setExpand] = useState(false);
  const [username, setUsername] = useState(false);
  const [tempQuery, setTempQuery] = useState('');
  const context = useContext(modeContext);
  const { darkMode, setDarkMode } = context;
  const query_Context = useContext(queryContext);
  const { setQuery } = query_Context;

  let navigate = useNavigate()

  let location = useLocation();
  useEffect(() => {
    setExpand(false)
  }, [location.pathname])

  const changeMode = () => {
    if (mode === 'light') {
      setMode('dark')
      setDarkMode(true)
      props.showAlert('success', 'Dark mode has been enabled.')
    } else {
      setMode('light')
      setDarkMode(false)
      props.showAlert('success', 'Light mode has been enabled.')
    }
  }

  const expandNav = () => {
    if (expand) {
      setExpand(false)
    } else {
      setExpand(true)
    }
  }

  const userLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const showUsername = () => {
    if (username) { setUsername(false) }
    else { setUsername(true) }
    setTimeout(() => {
      setUsername(false)
    }, 3000);
  }

  const performSearch = () => {
    const inputSmall = document.getElementById('inputSearchSmall');
    const input = document.getElementById('inputSearch');
    if (search) {
      input.blur();
      inputSmall.blur();
      expandSearch(false)

    }
    else {
      expandSearch(true)
      input.focus();
      inputSmall.focus();
    }
  }

  const setSearchQuery = (e) => {
    setTempQuery(e.target.value)
  }

  const handleSearch = () => {
    setQuery(tempQuery);
    performSearch();
    navigate('/music')
    let input = document.getElementById('inputSearch');
    input.value = '';
    let inputSmall = document.getElementById('inputSearchSmall');
    inputSmall.value = '';
  }


  window.addEventListener('locationchange', function () {
    console.log('location changed!');
  });

  return (
    <>
      <nav className={`${darkMode ? 'text-white' : ''} transition-all duration-300 fixed top-0 shadow-2xl w-full z-50`}>
        <div className="navWrapperLargeScreen p-2 bg-[rgba(255,255,255,0.2)] backdrop-blur-2xl hidden lg:flex justify-between items-center px-8">

          <div className="left">
            <Link to='/'>
              <div className="logo font-bold font-jost text-2xl">Cloud Scribe</div>
            </Link>
          </div>

          <div className="center">
            <ul className='flex justify-center font-poppins text-lg items-center space-x-8'>
              <li className={`flex flex-col`}>
                <Link to="/">Home</Link>
                <span className={`${darkMode ? 'bg-white' : 'bg-black'} ${location.pathname === '/' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
              </li>
              <li className={`flex flex-col`}>
                <Link to="/notes">Notes</Link>
                <span className={`${darkMode ? 'bg-white' : 'bg-black'} ${location.pathname === '/notes' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
              </li>
              <li className={`flex flex-col`}><Link to="/addnote">Create Notes</Link>
                <span className={`${darkMode ? 'bg-white' : 'bg-black'} ${location.pathname === '/addnote' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
              </li>
              <li className={`flex flex-col`}>
                <Link className='flex justify-center items-center' to="/music">
                  Music
                  <FontAwesomeIcon onClick={performSearch} className='text-blue-400 mx-1 w-5 h-5 cursor-pointer' icon={faSearch} />
                </Link>
                <span className={`${darkMode ? 'bg-white' : 'bg-black'} ${location.pathname === '/music' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
              </li>
            </ul>
            <div className={`transition-all lg:left-1/4 lg:w-1/2 duration-500 ${search ? 'top-20' : 'top-[-45rem]'} absolute w-full z-40`}>
              <div className={`search ${darkMode ? 'bg-gray-500 text-white' : 'bg-white text-black'} space-x-6 flex mx-4 lg:mx-16 rounded-xl p-8 shadow-2xl border border-[rgba(255,255,255,0.1)]`}>
                <input onChange={setSearchQuery} className={`input w-full outline-none  bg-transparent border-b p-2 ${darkMode ? 'border-[rgba(255,255,255,0.5)] placeholder:text-white' : 'border-black placeholder:text-black'} `} type="text" placeholder='Search for songs, artists...' name="search" id="inputSearch" />
                <button onClick={handleSearch} className={`text-left w-fit p-2 rounded-md ${darkMode ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-gray-200'} transition-all duration-150 hover:shadow-lg hover:-translate-y-1  border border-[rgba(255,255,255,0.1)]`}>Search</button>
              </div>
            </div>
          </div>



          <div className="right flex items-center space-x-4">

            <div className="mode flex flex-col h-6 overflow-hidden">
              <div className={`flex flex-col transition-all duration-500 ${mode === 'light' ? '' : '-translate-y-9'}  space-y-4`}>
                <FontAwesomeIcon className={`w-5 h-5 cursor-pointer text-blue-400`} id='moon' onClick={changeMode} icon={faMoon} />
                <FontAwesomeIcon className={` w-5 h-5 pl-[0.1rem] cursor-pointer transition-all duration-500 text-blue-400`} id='sun' onClick={changeMode} icon={faSun} />
              </div>
            </div>
            {!localStorage.getItem('token') ? <div className="buttons space-x-4">
              <Link to='/login'>
                <Button title='Login' padding='2' />
              </Link>
              <Link to='/signup'>
                <Button title='Sign Up' padding='2' />
              </Link>
            </div> :
              <div className='flex items-center space-x-3'>
                <div>
                  <FontAwesomeIcon onClick={showUsername} className='text-2xl cursor-pointer text-blue-400' icon={faUserCircle} />
                </div>
                <div className={`username ${username ? 'scale-100' : 'scale-0'} flex flex-col transition-all duration-300 absolute top-16 right-[6rem] font-jost text-black bg-white p-2 rounded-lg`}>
                  <p><span className='font-jost font-bold'>name : </span>{localStorage.getItem('name')}</p>
                  <p><span className='font-jost font-bold'>email : </span>{localStorage.getItem('email')}</p>
                </div>
                <button onClick={userLogout} className={`text-left w-fit p-2 rounded-md transition-all duration-150 hover:shadow-lg hover:-translate-y-1 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]`}>Logout</button>
              </div>}
          </div>
        </div>

        <div className="navwrapperSmallScreen bg-[rgba(255,255,255,0.2)] backdrop-blur-2xl flex lg:hidden p-2 justify-between items-center">
          <div className="left">
            <Link to='/'>
              <h1 className='logo font-jost font-bold text-2xl' >Cloud Scribe</h1>
            </Link>
          </div>

          <div className="right flex items-center space-x-2">
            <FontAwesomeIcon onClick={performSearch} className='text-blue-400 cursor-pointer' icon={faSearch} />

            <div className="mode flex flex-col h-5 overflow-hidden">
              <div className={`flex flex-col transition-all duration-500 ${mode === 'light' ? '' : '-translate-y-[2.15rem]'}  space-y-4`}>
                <FontAwesomeIcon className={`w-5 h-5 text-blue-400`} id='moon' onClick={changeMode} icon={faMoon} />
                <FontAwesomeIcon className={` w-4 h-4 pl-[0.1rem] transition-all duration-500 text-blue-400`} id='sun' onClick={changeMode} icon={faSun} />
              </div>
            </div>
            {!localStorage.getItem('token') ? '' :
              <div>
                <div className='flex items-center'>
                  <FontAwesomeIcon onClick={showUsername} className='w-5 h-5 cursor-pointer text-blue-400' icon={faUserCircle} />
                </div>
                <div className={`username ${username ? 'scale-100' : 'scale-0'} flex flex-col font-jost transition-all duration-300 absolute top-14 right-4 text-black bg-white p-2 rounded-lg`}>
                  <p><span className='font-jost font-bold'>name : </span>{localStorage.getItem('name')}</p>
                  <p><span className='font-jost font-bold'>email : </span>{localStorage.getItem('email')}</p>
                </div>
              </div>
            }
            <div className="hamburger z-50 space-y-1">
              <div onClick={expandNav} className={`${expand ? '-rotate-45 translate-y-[0.45rem]' : ''} w-6 transition-all duration-300 rounded-full bg-black h-1`}></div>
              <div onClick={expandNav} className={`${expand ? 'scale-0' : ''} w-6 transition-all duration-300 rounded-full bg-black h-1`}></div>
              <div onClick={expandNav} className={`${expand ? 'rotate-45 -translate-y-2' : ''} w-6 transition-all duration-300 rounded-full bg-black h-1`}></div>
            </div>
          </div>

          <div className={`transition-all duration-500 ${search ? 'top-16' : 'top-[-45rem]'} absolute -ml-1 w-full z-40`}>
            <div className={`search ${darkMode ? 'bg-gray-500 text-white' : 'bg-white text-black'} space-x-6 flex mr-2 rounded-xl p-8 shadow-2xl border border-black`}>
              <input id="inputSearchSmall" onChange={setSearchQuery} className={`input w-full outline-none  bg-transparent border-b p-2 ${darkMode ? 'border-[rgba(255,255,255,0.5)] placeholder:text-white' : 'border-black placeholder:text-black'} `} type="text" placeholder='Search for songs, artists...' name="search" />
              <button onClick={handleSearch} className={`text-left w-fit p-2 rounded-md ${darkMode ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-gray-200'} transition-all duration-150 hover:shadow-lg hover:-translate-y-1  border border-[rgba(255,255,255,0.1)]`}>Search</button>
            </div>
          </div>


        </div>
      </nav>
      <div className={`expanded lg:hidden transition-all duration-500 fixed top-0 h-screen z-30 w-full flex items-center justify-center backdrop-blur-3xl ${darkMode ? 'text-white' : ''} ${expand ? '' : 'translate-x-[60rem]'}`}>
        <div className="navItems">
          <ul className='flex flex-col space-y-3 justify-center font-poppins text-lg items-center'>
            <li className="logo font-jost font-bold text-2xl">
              <Link onClick={() => { setExpand(false) }} to='/'>Cloud Scribe</Link></li>
            <li className={`flex flex-col`}>
              <Link onClick={() => { setExpand(false) }} to="/">Home</Link>
              <span onClick={() => { setExpand(false) }} className={`bg-orange-400 ${location.pathname === '/' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
            </li>
            <li className={`flex flex-col`}>
              <Link onClick={() => { setExpand(false) }} to="/notes">Notes</Link>
              <span className={`bg-orange-400 ${location.pathname === '/notes' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
            </li>
            <li className={`flex flex-col`}><Link onClick={() => { setExpand(false) }} to="/addnote">Create Notes</Link>
              <span className={`bg-orange-400 ${location.pathname === '/addnote' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
            </li>
            <li className={`flex flex-col`}><Link onClick={() => { setExpand(false) }} to="/music">Music</Link>
              <span className={`bg-orange-400 ${location.pathname === '/music' ? 'animate-expand' : 'invisible'} rounded-xl h-[0.15rem]`}></span>
            </li>
            {!localStorage.getItem('token') ? <div className="buttons space-x-4">
              <Link onClick={() => { setExpand(false) }} to='/login'>
                <Button title='Login' padding='2' />
              </Link>
              <Link onClick={() => { setExpand(false) }} to='/signup'>
                <Button title='Sign Up' padding='2' />
              </Link>
            </div> :
              <div className='flex items-center space-x-3'>
                <button onClick={userLogout} className={`text-left w-fit p-2 rounded-md transition-all duration-150 hover:shadow-lg hover:-translate-y-1 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]`}>Logout</button>
              </div>}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
