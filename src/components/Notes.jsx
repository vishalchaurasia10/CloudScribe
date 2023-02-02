import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, setNotes } = context

    
    return (
        <>
            <div className='notesContainer lg:px-32 bg-no-repeat bg-center bg-cover pt-28 bg-[url(/src/assets/notesBackground3.svg)] space-y-10'>
                <h1 className='text-5xl -mt-8 lg:mt-0 m-4 font-extrabold font-jost'>Your Notes</h1>
                <div className={`notes lg:flex flex-wrap`}>
                    {notes.map((note) => {
                        return (
                            <NoteItem title={note.title} description={note.description} tag={note.tag} date={note.date} />
                        )
                    }
                    )}
                </div>
                <FontAwesomeIcon className='w-12 h-12 hover:scale-105 transition-all duration-300 text-white fixed bottom-4 right-4 bg-[#000] rounded-full p-2' icon={faPlus}/>
            </div>
        </>
    )
}

export default Notes
