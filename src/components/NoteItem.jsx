import { faFloppyDisk, faPen, faThumbTack, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'

const NoteItem = (props) => {

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

    }, [isInView]);

    function formatDateInIST(dateString) {
        const date = new Date(dateString);
        const options = { timeZone: 'Asia/Kolkata', hour12: true, day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleString('en-IN', options);
      }
      
      

    return (
        <div ref={targetRef} className={`noteItem overflow-hidden transition-all duration-500 ${isInView ? ' scale-100' : 'scale-0'} p-4 lg:w-[30%] m-4 border bg-[rgba(255,255,255,0.2)] border-[rgba(255,255,255,0.1)] shadow-2xl rounded-lg backdrop-blur-2xl`} key={props._id}>
            <div className='px-3 pr-4 space-y-2 font-jost'>
                <h2 className='text-4xl font-jost'>{props.title}</h2>
                <ul className='list-disc flex space-x-6 text-xs font-light pl-4'>
                    <li>{props.tag}</li>
                    <li>{formatDateInIST(props.date)}</li>
                    </ul>
                <p className='text-lg'>{props.description}</p>
                <p className=''></p>
            </div>
            <div className="edits h-full bg-[rgba(255,255,255,0.1)] translate-x-7 backdrop-blur-3xl flex flex-col space-y-4 p-2 transition-all duration-150 absolute top-0 right-0">
                <FontAwesomeIcon icon={faThumbTack}/>
                <FontAwesomeIcon icon={faPen}/>
                <FontAwesomeIcon icon={faTrash}/>
                <FontAwesomeIcon className='h-5' icon={faFloppyDisk}/>
            </div>
        </div>
    )
}

export default NoteItem
