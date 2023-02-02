import React from 'react'
import footer from '../assets/footer.svg'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="image mt-4 lg:mt-0">
          <img className='w-full' src={footer} alt="footer" />
        </div>
        {/* <div className="details bg-[#C62467]"></div> */}
      </div>
    </>
  )
}

export default Footer
