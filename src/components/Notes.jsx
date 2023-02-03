import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import { Link } from 'react-router-dom'

const Notes = () => {

    const [edit, setEdit] = useState(false)
    const [note, setNote] = useState({title: '', description: '', tag: ''})
    const [Id, setId] = useState('')
    const context = useContext(noteContext)
    const { notes, fetchAllNotes, editNote } = context

    useEffect(() => {
        fetchAllNotes()
        // eslint-disable-next-line
    }, [])

    const updateNotes = (id,title,tag,description) => {
        setId(id)
        setNote({
            title: title,
            tag: tag,
            description: description
        })
        if (edit) { setEdit(false) }
        else { setEdit(true) }
    }

    const removeModal = () => {
        setEdit(false)
    }

    const handleUpdateNote = (e) => {
        editNote(Id, note.title, note.description, note.tag)
        setNote({title: '', description: '', tag: ''})
        let inputs = document.getElementsByClassName('input')
        Array.from(inputs).forEach((input) => {
            input.value = ''
        })
        removeModal();
        fetchAllNotes();
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const pinNote = (id) => {
    }

    return (
        <>
            <div className={`transition-all lg:left-1/4 lg:w-1/2 duration-500 ${edit ? 'top-20' : 'top-[-45rem]'} absolute w-full z-40`}>
                <div className='createNote bg-[rgba(255,255,255,0.1)] text-white bg-[url("/src/assets/notesBackground.svg)] bg-no-repeat bg-cover bg-center flex flex-col mx-4 lg:mx-16 rounded-xl space-y-8 p-8 backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.1)]'>
                    <div>
                        <FontAwesomeIcon onClick={removeModal} className='absolute w-4 h-4 m-2 rounded-md px-2 py-2 bg-[rgba(255,255,255,0.2)] top-0 right-0' icon={faXmark} />
                        <input onChange={onChange} className='input outline-none w-full placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={note.title} type="text" placeholder='Title' name="title" id="title" />
                    </div>
                    <input onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={note.tag} type="text" placeholder='#tag' name="tag" id="tag" />
                    <textarea onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={note.description} name="description" placeholder='Start typing...' id="description" cols="30" rows="8"></textarea>
                    <Link to='/notes'>
                        <button onClick={handleUpdateNote} className={`text-left w-fit p-2 rounded-md transition-all duration-150 hover:shadow-lg hover:-translate-y-1 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]`}>Update Note</button>
                    </Link>
                </div>
            </div>
            <div className='notesContainer -mb-36 h-screen lg:px-32 bg-no-repeat bg-center bg-cover pt-28 bg-[url(/src/assets/addBackground.svg)] space-y-10'>
                <h1 className='text-5xl -mt-8 lg:mt-0 m-4 font-extrabold font-jost'>Your Notes</h1>
                <div className={`notes lg:flex flex-wrap`}>
                    {notes.map((note) => {
                        return (
                            <NoteItem title={note.title} updateNotes={updateNotes} pinNote={pinNote} id={note._id} description={note.description} tag={note.tag} date={note.date} />
                        )
                    }
                    )}
                </div>
                <Link to='/addnote'>
                    <FontAwesomeIcon className='w-12 z-40 h-12 hover:scale-105 transition-all duration-300 text-white fixed bottom-4 right-4 bg-[#E37B7B] rounded-full p-2' icon={faPlus} />
                </Link>
            </div>
        </>
    )
}

export default Notes
