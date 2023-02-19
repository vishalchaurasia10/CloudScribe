import React, { useContext, useEffect, useRef, useState } from 'react'
import modeContext from '../context/modes/modeContext';

const Contact = () => {

  const context = useContext(modeContext);
  const { darkMode } = context;
  const targetRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
        else {
          setIsInView(false);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    observer.observe(targetRef.current);

    // return () => {
    //   observer.unobserve(targetRef.current);
    // };
  }, [isInView]);



  return (
    <div className={`wrapper ${darkMode?'bg-[#212E35] text-white':''} py-10 transition-all duration-300 `}>
      <div ref={targetRef} className={`contact ${isInView ? ' scale-100' : 'scale-0'} relative transition-all duration-1000  backdrop-blur-lg lg:top-24 top-10 lg:flex border border-[rgba(255,255,255,0.1)] ${darkMode?'shadow-white shadow-sm':'shadow-2xl'} rounded-2xl m-1 lg:p-8 lg:mx-32`}>
        <div className="details space-y-8 p-6 lg:w-1/2">
          <h1 className='lg:text-6xl text-5xl font-jost font-bold'>We believe there's a better way to Scale your Business.</h1>
          <p className={`text-xl font-medium ${darkMode?'text-white':'text-[#392E33]'} `}>Thank you for visiting our website! If you have any questions, concerns, or feedback, please don't hesitate to reach out to us. Our team is dedicated to providing excellent customer service and support.</p>
          <button className={`bg-orange-400 p-3 rounded-sm transition-all duration-300 hover:-translate-y-1`}>Get Started!</button>
        </div>
        <div className="form p-6 lg:p-0 lg:w-1/2">
          <h1 className='text-2xl font-bold font-jost'>Got a
            <span className='ml-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-500 relative inline-block'>
              <span className='relative text-white text-6xl font-bold'>Project</span>
            </span>
          </h1>
          <form className='flex pt-8 pb-5 space-y-6 flex-col' action="https://formsubmit.co/vishalvc1003@gmail.com" method='post'>
            <input className={`outline-none ${darkMode?'bg-[#212E35]':''} transition-all duration-300 border-slate-400 drop-shadow-sm border-2 rounded-xl p-4`} type="text" placeholder='Enter Full Name*' required name="clientname" id="clientname" />
            <input className={`outline-none ${darkMode?'bg-[#212E35]':''} transition-all duration-300 border-slate-400 drop-shadow-sm border-2 rounded-xl p-4`} type="email" placeholder='Enter Email Address' name="email" id="email" />
            <textarea className={`${darkMode?'bg-[#212E35]':''} transition-all duration-300 outline-none border-slate-400 drop-shadow-sm border-2 rounded-xl p-4`} name="message" id="" placeholder='Tell Us Something About Your Project' cols="30" rows="4"></textarea>
          <input type='submit' value='Contact Us' className={`bg-orange-400 p-3 w-fit rounded-sm transition-all duration-300 hover:-translate-y-1`}/>
          <input type="hidden" name="_next" value="https://cloud-scribe-vishalchaurasia10.vercel.app/"/>
          <input type="hidden" name="_captcha" value="false"></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
