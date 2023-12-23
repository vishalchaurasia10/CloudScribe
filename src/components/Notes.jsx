import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import modeContext from '../context/modes/modeContext'
import NoteItem from './NoteItem'
import { Link, useNavigate } from 'react-router-dom'
import AddShortcut from './AddShortcut'

const Notes = (props) => {

    const [edit, setEdit] = useState(false)
    const [note, setNote] = useState({title: '', description: '', tag: ''})
    const [Id, setId] = useState('')
    const [pin, setPin] = useState(false)
    const context = useContext(noteContext)
    const mode = useContext(modeContext)
    const { darkMode } = mode
    let navigate = useNavigate()
    const { notes, fetchAllNotes, editNote, deleteNote, addNote } = context

    useEffect(() => {
        if(localStorage.getItem('token')===null){
            navigate('/login')
        }
        else
        {
            fetchAllNotes()
        }
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
        props.showAlert("success","Note updated successfully");
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

    const pinNote = async (id) => {
        
        if(pin) { setPin(false) }
        else { setPin(true) }

        const json = await deleteNote(id)
        addNote(json.note.title, json.note.description, json.note.tag)
        props.showAlert("success","Note pinned successfully");
        fetchAllNotes()
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
            <div className={`notesContainer min-h-screen transition-all duration-300 ${darkMode?'bg-[#212E35]':''} lg:px-32 bg-no-repeat bg-center bg-cover pt-28 pb-12 lg:pb-0 bg-[url(/src/assets/addBackground.svg)] space-y-10`}>
                <h1 className={`${darkMode?'text-white':''} transition-all duration-500 text-5xl -mt-8 lg:mt-0 m-4 font-extrabold font-jost`}>Your Notes</h1>
                {notes.length !== 0 ? <div className={`notes lg:flex flex-wrap`}>
                    {notes.map((note) => {
                        return (
                            <NoteItem showAlert={props.showAlert} title={note.title} fetchAllNotes={fetchAllNotes} updateNotes={updateNotes} pinNote={pinNote} id={note._id} description={note.description} tag={note.tag} date={note.date} />
                        )
                    }
                    )}
                </div> : <div className='animate-scale bg-no-repeat h-96 lg:h-[32rem] lg:-mt-20 lg:w-[32rem] mx-auto lg:z-40 relative bg-center bg-cover bg-[url("/src/assets/nothing.svg")]'></div>
                }
                <AddShortcut/>
            </div>
        </>
    )
}

export default Notes
