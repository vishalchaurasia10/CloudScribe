import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const AddShortcut = () => {
    return (
        <Link to='/addnote'>
            <FontAwesomeIcon className='w-12 z-40 h-12 hover:scale-105 transition-all duration-300 text-white fixed bottom-4 right-4 bg-[#E37B7B] rounded-full p-2' icon={faPlus} />
        </Link>
    )
}

export default AddShortcut
