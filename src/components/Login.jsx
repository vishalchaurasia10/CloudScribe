import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import modeContext from '../context/modes/modeContext';

const Login = (props) => {
    const [remember, setRemember] = useState(0);
    const context = useContext(modeContext);
    const { darkMode } = context;
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const changeRemember = () => {
        if (remember === 0) {
            setRemember(1)
        } else {
            setRemember(0)
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('name', json.name);
            localStorage.setItem('email', json.email);
            navigate("/");
            props.showAlert("success","Logged in successfully")
        }
        else {
            if(credentials.password.length<8){ props.showAlert("failure","Password must be atleast 8 characters long") }
            else{props.showAlert("failure","Invalid credentials")}
        }
    }

    return (
        <>
            <div className={`${darkMode?'bg-[#212E35]':''} transition-all duration-300 mainBlock bg-cover bg-center bg-no-repeat bg-[url('/src/assets/loginBackground.svg')] flex flex-col lg:flex-row justify-center items-center`}>

                {/* 1st container starts here */}

                <div className="container1 lg:order-2 space-y-0 flex flex-col justify-center items-center lg:h-screen lg:w-1/2">
                    <div className={`${darkMode?'text-white':'text-[#392E33]'} text-lg lg:px-32 animate-scale p-4 tracking-wide pt-24 pb-8 lg:pb-1 text-center lg:pt-28 font-jost font-extrabold`}>
                        <span className='font-jost text-3xl font-extrabold '>Welcome! </span>
                        back! We're glad you're here.
                        <span className='font-jost text-3xl font-extrabold'> Login </span>
                        to access all your notes and stay organised. Don't have an account yet?
                        <Link className='' to='/signup' > Sign up</Link>
                    </div>
                    <div className='animate-scale w-full y-4 bg-no-repeat h-96 lg:h-[32rem] lg:-mt-20 lg:w-[32rem] mx-auto lg:z-40 relative bg-center bg-cover bg-[url("/src/assets/login.svg")]'>
                    </div>
                </div>

                {/* 2nd container starts over here */}

                <div className="container2 px-4 lg:px-0 lg:order-1 w-full lg:w-1/2 py-3 flex justify-center items-center">
                    <div className="form flex flex-col backdrop-blur-lg bg-white relative space-y-6 border rounded-lg border-gray-300 shadow-lg  p-4  w-[26rem]">
                        <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 py-3 font-jost text-2xl font-bold'>LOGIN</h1>
                        <form action="">
                            <div className='flex w-full flex-col space-y-6'>
                                {/* <div className="email flex items-center px-2 py-1 border-2 rounded-lg border-[#E6E9F1]">
                                    <FontAwesomeIcon className='w-3 h-3 pl-2' icon={faUserCircle} />
                                    <input className='text-lg bg-transparent pl-4 p-2 outline-none text-[#ACB2BD] bg-white ' placeholder='Username' type="text" name="username" id="username" />
                                </div> */}
                                <div className="email flex items-center px-2 py-1 border-2 rounded-lg border-[#E6E9F1]">
                                    <FontAwesomeIcon className='w-3 h-3 pl-2' icon={faEnvelope} />
                                    <input onChange={onChange} className='text-lg w-full bg-transparent pl-4 p-2 outline-none text-gray-500 bg-white ' placeholder='Email Id' value={credentials.email} type="email" name="email" id="email" />
                                </div>
                                <div className="email flex items-center px-2 py-1 border-2 rounded-lg border-[#E6E9F1]">
                                    <FontAwesomeIcon className='w-3 h-3 pl-2' icon={faLock} />
                                    <input onChange={onChange} className='text-lg w-full pl-4 p-2 outline-none text-gray-500 bg-transparent ' placeholder='Password' value={credentials.password} type="password" name="password" id="password" />
                                </div>
                                <div className='flex remember space-x-2 text-sm pl-2 mt-5 justify-between'>
                                    <div className="rememberMe flex items-center">
                                        <input onClick={changeRemember} className="h-5 w-8 appearance-none bg-green-400 border border-[rgba(255,255,255,0.1)] rounded-full" type="checkbox" name="remember" id="remember" title="Remember me" />
                                        <div onClick={changeRemember} className={`switch transition-all duration-300 relative ${remember === 0 ? '-left-[1.9rem]' : '-left-[1.1rem]'} border border-gray-300 bg-white h-[1rem] w-[1rem] rounded-full`} id=""></div>
                                        <label className='-ml-2' htmlFor="remember">Remember me</label>
                                    </div>
                                    <Link className='hover:text-[#ACB2BD]' to='/'>Forgot Password?</Link>
                                </div>
                                <button onClick={loginUser} className='py-2 mt-8 w-1/2 mx-auto hover:-translate-y-[0.1rem] text-white  bg-[#FE538D] duration-150 font-nunito font-semibold border rounded-md px-3 shadow-[#FE538D] border-[rgba(255,255,255,0.1)]'>Login</button>
                            </div>
                        </form>
                        <div className='horizontalRule mx-auto h-[0.1rem] relative my-3 w-[30%] bg-[#FE538D]'></div>
                        <div className="google pb-3 flex justify-center space-x-4 items-center">
                            <FontAwesomeIcon className='text-[#ACB2BD] text-xl hover:text-gray-400' icon={faGoogle} />
                            <FontAwesomeIcon className='text-[#ACB2BD] text-xl hover:text-gray-400' icon={faGithub} />
                        </div>
                        <div className="login flex items-center space-x-1 justify-center text-sm">
                            <span>New User?</span> <Link to='/signup' className='text-[#FE538D]'>Sign Up</Link>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Login
