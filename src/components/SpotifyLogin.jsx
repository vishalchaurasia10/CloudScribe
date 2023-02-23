import React, { useContext, useEffect, useRef, useState } from 'react'
import modeContext from '../context/modes/modeContext';
import heroMusic from '../assets/heroMusic.svg'
import { Link } from 'react-router-dom';


const SpotifyLogin = () => {

    const imageRef = useRef(null);
    const textRef = useRef(null);
    const [isImageInView, setIsImageInView] = useState(false);
    const [isTextInView, setIsTextInView] = useState(false);
    const mode = useContext(modeContext)
    const { darkMode } = mode
    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=284354a086ec4f069cf58bfaf2de243e&response_type=token&redirect_uri=http://localhost:3000/music&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

    // code=AQD1IC-lkzWXIvjwmGZxKxNcDgQGWIY2L0MyTaBDU20zU25pDvq7D7G4hQFKiSlt3FYILsXsMEltIm3xWQCOzPpj--Ym5ilJ_p4AtS7QPCIvq3-u6UYMc8SmheQ1_VnQNBUcZ-cZp5_tRwPchdNRulRRwf_-JgIDRcmTYl249F2SIYqSxsV2vC4etGvrXPXpmRKdy_pIVni5DC1Ex7A88SlMwWlH6BnD3hEqEvnAurJc3SS73oEx3FMbxs_fmgL5PDQDW8mLolvWD6hanKkO5ezhC93_viUwOrw4GpY1R_vZdOM9ADEe7VhaGg0AhpbbkfL-bX6DWjbqm9PMSEYHe-vTIG89ig
    
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
        <div ref={textRef} className={` ${darkMode ? 'text-white bg-black' : ''} py-8 lg:py-0 pt-12 lg:pt-0 transition-all duration-500 flex flex-col lg:flex-row lg:px-36 bg-cover lg:bg-center px-6 lg:space-x-10 bg-[url("/src/assets/musicLoginBackground.svg")] lg:h-screen w-full lg:justify-center lg:items-center`}>
            <div ref={textRef} className={`${isTextInView ? 'scale-100' : 'scale-0'} h-1/2 order-2 lg:order-1 transition-all duration-1000 details space-y-8 lg:w-1/2`}>
                <div className="para font-DancingScript text-4xl lg:text-5xl">
                    Welcome to our music listening page! To start enjoying our carefully curated playlist, we kindly ask you to log in using your Spotify credentials.
                </div>
                
                <button className={`${darkMode ? 'bg-green-500 hover:bg-gray-400' : 'bg-green-500 hover:text-white hover:bg-gray-500'}  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3 lg:p-4 rounded-lg`}>
                <Link to={AUTH_URL}>Login with Spotify</Link>
                </button>
            </div>
            <img
                ref={imageRef}
                className={`${isImageInView ? 'scale-100' : 'scale-0'} h-1/2 order-1 lg:order-2 lg:w-1/2 transition-all duration-1000 lg:h-full lg:p-12`}
                src={heroMusic}
                alt="heroNote"
            />
        </div>
    )
}

export default SpotifyLogin
