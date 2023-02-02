import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';

const Contact = () => {

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
    <div ref={targetRef} className={`contact ${isInView ? ' scale-100' : 'scale-0'} relative transition-all duration-1000 lg:top-20 backdrop-blur-lg lg:flex border border-[rgba(255,255,255,0.1)] shadow-2xl rounded-2xl m-1 lg:p-8 lg:mx-32`}>
      <div className="details space-y-8 p-6 lg:w-1/2">
        <h1 className='text-6xl font-jost font-bold'>We believe there's a better way to Scale your Business.</h1>
        <p className='text-xl font-medium text-[#392E33]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor commodi assumenda possimus corporis odit harum tempora ipsam laborum asperiores totam.</p>
        <Button title='Get Started!' padding={3} />
      </div>
      <div className="form p-6 lg:p-0 lg:w-1/2">
        <h1 className='text-2xl font-bold font-jost'>Got a
          <span className='ml-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-500 relative inline-block'>
            <span className='relative text-white text-6xl font-bold'>Project</span>
          </span>
        </h1>
        <form className='flex pt-8 pb-5 space-y-6 flex-col' action="">
          <input className='outline-none border-slate-400 drop-shadow-sm border-2 rounded-xl p-4' type="text" placeholder='Enter Full Name*' required name="clientname" id="clientname" />
          <input className='outline-none border-slate-400 drop-shadow-sm border-2 rounded-xl p-4' type="email" placeholder='Enter Email Address' name="email" id="email" />
          <textarea className='outline-none border-slate-400 drop-shadow-sm border-2 rounded-xl p-4' name="" id="" placeholder='Tell Us Something About Your Project' cols="30" rows="4"></textarea>
        </form>
        <Button title='Contact Me' padding='3' />
      </div>
    </div>
  )
}

export default Contact
