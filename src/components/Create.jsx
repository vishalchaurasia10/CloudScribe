import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import modeContext from '../context/modes/modeContext'
import { Link, useNavigate } from 'react-router-dom'

const Create = (props) => {
    const context = useContext(noteContext)
    const mode = useContext(modeContext)
    const { darkMode } = mode
    let navigate = useNavigate()
    const { addNote } = context
    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const handleAddNote = (e) => {
        if (note.title.length < 3 || note.description.length < 5) {
            props.showAlert("failure", "Title must be atleast 3 characters long and and description must be 5 characters long");
        }
        else {
            props.showAlert("success", "Note added successfully");
            addNote(note.title, note.description, note.tag)
            setNote({ title: '', description: '', tag: '' })
            let inputs = document.getElementsByClassName('input')
            Array.from(inputs).forEach((input) => {
                input.value = ''
            })
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className={`h-screen ${darkMode?'bg-[#212E35]':''} transition-all duration-300 lg:mb-0 -mb-36 lg:px-36 pt-24 lg:pt-36 bg-cover bg-center bg-[url("/src/assets/addBackground.svg")]`}>
            <div className='createNote bg-[rgba(255,255,255,0.1)] text-white bg-[url("/src/assets/notesBackground.svg)] bg-no-repeat bg-cover bg-center flex flex-col mx-4 lg:mx-16 rounded-xl space-y-8 p-8 backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.1)]'>
                <input onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' type="text" placeholder='Title' name="title" id="title" />
                <input onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' type="text" placeholder='#tag' name="tag" id="tag" />
                <textarea onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' name="description" placeholder='Start typing...' id="description" cols="30" rows="8"></textarea>
                <Link to={(note.title.length > 3 || note.description.length > 5) ? '/notes' : ''}>
                    <button onClick={handleAddNote} className={`text-left w-fit p-2 rounded-md transition-all duration-150 hover:shadow-lg hover:-translate-y-1 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]`}>Add note</button>
                </Link>
            </div>
        </div>
    )
}

export default Create
