import { faPen, faThumbTack, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import modeContext from '../context/modes/modeContext';

const NoteItem = (props) => {

    const targetRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const context = useContext(noteContext)
    const { deleteNote } = context
    const mode = useContext(modeContext)
    const { darkMode } = mode

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

        // eslint-disable-next-line
    }, [isInView]);

    function formatDateInIST(dateString) {
        const date = new Date(dateString);
        const options = { timeZone: 'Asia/Kolkata', hour12: true, day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleString('en-IN', options);
    }


    return (
        <div ref={targetRef} className={`${darkMode ? 'text-white' : ''} noteItem overflow-hidden transition-all duration-300 ${isInView ? ' scale-100' : 'scale-0'} p-4 lg:w-[30%] m-4 border bg-[rgba(255,255,255,0.2)] border-[rgba(255,255,255,0.1)] shadow-2xl rounded-lg backdrop-blur-2xl`} key={props.id}>
            <div className='px-3 pr-4 space-y-2 font-jost'>
                <h2 className='text-4xl transition-all duration-300 font-jost'>{props.title}</h2>
                <ul className='list-disc flex space-x-6 text-xs font-light pl-4'>
                    <li className='transition-all duration-300'>{props.tag}</li>
                    <li className='transition-all duration-300'>{formatDateInIST(props.date)}</li>
                </ul>
                <p className='text-lg transition-all duration-300'>{props.description}</p>
            </div>
            <div className="edits h-full bg-[rgba(255,255,255,0.1)] translate-x-7 backdrop-blur-3xl flex flex-col space-y-4 p-2 transition-all duration-150 absolute top-0 right-0">
                <FontAwesomeIcon onClick={() => { props.pinNote(props.id) }} className={` cursor-pointer hover:scale-125 transition-all duration-300`} icon={faThumbTack} />
                <FontAwesomeIcon onClick={() => { props.updateNotes(props.id, props.title, props.tag, props.description) }} className='cursor-pointer hover:scale-125 transition-all duration-300' icon={faPen} />
                <FontAwesomeIcon onClick={() => { deleteNote(props.id); props.showAlert("success", "Note deleted successfully"); props.fetchAllNotes(); }} className='cursor-pointer hover:scale-125 transition-all duration-300' icon={faTrash} />
            </div>
        </div>
    )
}

export default NoteItem
