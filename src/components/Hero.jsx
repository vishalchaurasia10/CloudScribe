import React, { useEffect, useRef, useState } from 'react'
import heroNote from '../assets/heroNote.svg'
import heroMusic from '../assets/heroMusic.svg'

const Hero = (props) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [isImageInView, setIsImageInView] = useState(false);
  const [isTextInView, setIsTextInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === imageRef.current) {
            setIsImageInView(entry.isIntersecting);
          }
          if (entry.target === textRef.current) {
            setIsTextInView(entry.isIntersecting);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    observer.observe(imageRef.current);
    observer.observe(textRef.current);


  }, []);

  return (
    <div ref={imageRef} className={`${isImageInView ? 'translate-x-[]' : 'translate-x-0'} transition-all duration-1000 h-screen w-full ${props.position==='left'?'lg:pr-8':'lg:pl-16'} space-y-2 lg:space-y-0 lg:pt-16 pt-12 ${props.position==='left'?'bg-yellow-400':'bg-green-300'} lg:flex lg:flex-row flex-col items-center justify-center`}>
      <img
        ref={imageRef}
        className={`${isImageInView ? 'scale-100' : 'scale-0'} lg:w-1/2  ${props.position === 'left' ? 'order-2' : 'order-2'} transition-all duration-1000 lg:h-full lg:p-12`}
        src={props.position === 'left' ? heroNote : heroMusic}
        alt="heroNote"
      />
      <div
        ref={textRef}
        className={`intro ${isTextInView ? 'scale-100' : 'scale-0'} lg:w-1/2 ${props.position === 'right' ? 'order-1' : 'order-2'} transition-all duration-1000 px-4 text-center text-[#392E33] font-DancingScript text-4xl lg:text-6xl`}
      >
        {props.position === 'left' ? 'Welcome to Cloudscribe, your efficient note taking solution. Quickly jot down thoughts and organize information with ease. Access your notes from anywhere, anytime. Start streamlining your workflow today.' : 'Welcome to our music streaming platform! Enjoy unlimited access to your favorite songs from anywhere, anytime. Start listening now!'}
      </div>
    </div>
  )
}

export default Hero
