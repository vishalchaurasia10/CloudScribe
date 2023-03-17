import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import footer from '../assets/footer.svg'
import modeContext from '../context/modes/modeContext'

const Footer = () => {
  const context = useContext(modeContext);
  const { darkMode } = context;
  return (
    <>
      <div className={`${darkMode?'bg-[#212E35]':''} transition-all duration-300 footer`}>
        <div className="image pt-4 lg:mt-0">
          <img className='w-full' src={footer} alt="footer" />
        </div>

        <div className="details pb-10 px-4 lg:px-0 lg:pl-24 w-full text-white bg-[#C62467]">
          <div className="wrapper space-y-6 lg:space-y-0 flex-col lg:flex-row w-fit lg:space-x-20 lg:mx-auto flex">

            <div className="vishal lg:px-24 space-y-5 lg:w-1/2">
              <h3 className='font-DancingScript text-7xl'>Vishal Chaurasia</h3>
              <p className='text-xl font-jost'>I am a full stack developer with a passion for coding. I enjoy working on projects late into the night and always strive to improve my skills.</p>
            </div>

            <div className="projects space-y-6 lg:pl-12 lg:w-1/2">
              <h3 className='text-5xl font-DancingScript'>Some of my Projects</h3>
              <ul className='list-disc space-y-1'>
                <Link target={'_blank'} to=''>
                  <li className='ml-8'>Portfolio Site</li>
                </Link>
                <Link target={'_blank'} to='https://the-daily-scoop.vercel.app/'>
                  <li className='ml-8'>Blogging Site</li>
                </Link>
                <Link target={'_blank'} to='https://the-insight-news.vercel.app/'>
                  <li className='ml-8'>The Insight News</li>
                </Link>
                <Link target={'_blank'} to='https://vishalchaurasia10.github.io/Notes-Web-App/'>
                  <li className='ml-8'>Todo App</li>
                </Link>
              </ul>
              <div className="ml-2 socials flex space-x-6">
                <Link target={'_blank'} to='https://github.com/vishalchaurasia10'>
                  <FontAwesomeIcon className='text-2xl hover:text-black transition-all duration-300' icon={faGithub} />
                </Link>
                <Link target={'_blank'} to='https://twitter.com/vishalstwt'>
                  <FontAwesomeIcon className='text-2xl hover:text-blue-400 transition-all duration-300' icon={faTwitter} />
                </Link>
                <Link target={'_blank'} to='https://www.linkedin.com/in/vishal-chaurasia-9a421022a/'>
                  <FontAwesomeIcon className='text-2xl hover:text-black transition-all duration-300' icon={faLinkedin} />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Footer
