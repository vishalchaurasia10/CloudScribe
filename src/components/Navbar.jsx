import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <nav className='p-2'>
      <div className="navWrapper justify-between flex px-8">

        <div className="left">
          <div className="logo">Cloud Scribe</div>
        </div>

        <div className="center">
          <ul className='flex space-x-8'>
            <li className={`${location.pathname === '/' ? '' : ''}`}><Link to="/">Home</Link></li>
            <li><Link to="/notes">Notes</Link></li>
            <li><Link to="/create">Create Notes</Link></li>
            <li><Link to="/about">About Me</Link></li>
          </ul>
        </div>
        
        <div className="right space-x-8">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
