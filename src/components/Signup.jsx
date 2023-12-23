import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import modeContext from '../context/modes/modeContext';

const Login = (props) => {
    const mode = useContext(modeContext)
    const { darkMode } = mode
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "", username:"" });


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const createUser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password, name: credentials.username })
        })
        const json = await response.json()
        console.log(json)

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('name', json.name);
            localStorage.setItem('email', json.email);
            navigate("/");
            props.showAlert("success","Signed Up successfully")
        }
        else {
            if(credentials.username.length<3){ props.showAlert("failure","Username must be atleast 5 characters long")}
            else if(credentials.password.length<8){ props.showAlert("failure","Password must be atleast 8 characters long") }
            else{props.showAlert("failure","Invalid credentials")}
        }
    }

    return (
        <>
            <div className={`${darkMode?'bg-[#212E35]':''} transition-all duration-300 mainBlock bg-cover bg-center bg-no-repeat bg-[url('/src/assets/loginBackground.svg')] flex flex-col lg:flex-row justify-center items-center`}>

                {/* 1st container starts here */}

                <div className="container1 lg:order-2 space-y-0 flex flex-col justify-center items-center lg:h-screen lg:w-1/2">
                    <div className={`${darkMode?'text-white':'text-[#392E33]'} transition-all duration-300 text-lg lg:px-32 lg:pt-20 animate-scale p-4 tracking-wide pt-24 pb-8 lg:pb-1 text-center font-jost font-extrabold`}>
                        <span className='font-jost text-3xl font-extrabold '>Welcome! </span>
                        to Cloud Scribe.
                        <span className='font-jost text-3xl font-extrabold'> Join </span>
                        our community and experience a new way of organizing your thoughts and ideas.
                        <Link className='' to='/register' > Sign up</Link> now to create unlimited notes, access them from anywhere.
                        <span className='font-jost text-3xl font-extrabold'> Let's get started! </span>
                    </div>
                    <div className='animate-scale w-full y-4 bg-no-repeat h-96 lg:h-[32rem] lg:-mt-20 lg:w-[32rem] mx-auto lg:z-40 relative bg-center bg-cover bg-[url("/src/assets/signup.svg")]'>
                    </div>
                </div>

                {/* 2nd container starts over here */}

                <div className="container2 px-4 lg:px-0 lg:order-1 w-full lg:w-1/2 py-3 flex justify-center items-center">
                    <div className="form flex flex-col backdrop-blur-lg bg-white relative space-y-6 border rounded-lg border-gray-300 shadow-lg  p-4  w-[26rem]">
                        <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 py-3 font-jost text-2xl font-bold'>SIGN UP</h1>
                        <form onSubmit={createUser}>
                            <div className='flex w-full flex-col space-y-6'>
                                <div className="name flex items-center px-2 py-1 border-2 rounded-lg border-[#E6E9F1]">
                                    <FontAwesomeIcon className='w-3 h-3 pl-2' icon={faUserCircle} />
                                    <input onChange={onChange} className='text-lg bg-transparent w-full pl-4 p-2 outline-none text-[#ACB2BD] bg-white ' placeholder='Username' value={credentials.username} type="text" name="username" id="username" />
                                </div>
                                <div className="email flex items-center px-2 py-1 border-2 rounded-lg border-[#E6E9F1]">
                                    <FontAwesomeIcon className='w-3 h-3 pl-2' icon={faEnvelope} />
                                    <input onChange={onChange} className='text-lg w-full bg-transparent pl-4 p-2 outline-none text-gray-500 bg-white ' placeholder='Email Id' value={credentials.email} type="email" name="email" id="email" />
                                </div>
                                <div className="email flex items-center px-2 py-1 border-2 rounded-lg border-[#E6E9F1]">
                                    <FontAwesomeIcon className='w-3 h-3 pl-2' icon={faLock} />
                                    <input onChange={onChange} className='text-lg w-full pl-4 p-2 outline-none text-gray-500 bg-transparent ' placeholder='Password' value={credentials.password} type="password" name="password" id="password" />
                                </div>
                                <button className='py-2 mt-8 w-1/2 mx-auto hover:-translate-y-[0.1rem] text-white  bg-[#FE538D] duration-150 font-nunito font-semibold border rounded-md px-3 shadow-[#FE538D] border-[rgba(255,255,255,0.1)]'>Sign Up</button>
                            </div>
                        </form>
                        <div className='horizontalRule mx-auto h-[0.1rem] relative my-3 w-[30%] bg-[#FE538D]'></div>
                        <div className="google pb-3 flex justify-center space-x-4 items-center">
                            <FontAwesomeIcon className='text-[#ACB2BD] text-xl hover:text-gray-400' icon={faGoogle} />
                            <FontAwesomeIcon className='text-[#ACB2BD] text-xl hover:text-gray-400' icon={faGithub} />
                        </div>
                        <div className="login flex items-center space-x-1 justify-center text-sm">
                            <span>New User?</span> <Link to='/login' className='text-[#FE538D]'>Login</Link>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Login
