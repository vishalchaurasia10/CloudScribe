import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { Link } from 'react-router-dom'

const Create = () => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({title: '', description: '', tag: ''})

    const handleAddNote = (e) => {
        addNote(note.title, note.description, note.tag)
        setNote({title: '', description: '', tag: ''})
        let inputs = document.getElementsByClassName('input')
        Array.from(inputs).forEach((input) => {
            input.value = ''
        })
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className='h-screen -mb-36 lg:px-36 pt-24 lg:pt-36 bg-cover bg-center bg-[url("/src/assets/addBackground.svg")]'>
            <div className='createNote bg-[rgba(255,255,255,0.1)] text-white bg-[url("/src/assets/notesBackground.svg)] bg-no-repeat bg-cover bg-center flex flex-col mx-4 lg:mx-16 rounded-xl space-y-8 p-8 backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.1)]'>
                <input onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' type="text" placeholder='Title' name="title" id="title" />
                <input onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' type="text" placeholder='#tag' name="tag" id="tag" />
                <textarea onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' name="description" placeholder='Start typing...' id="description" cols="30" rows="8"></textarea>
                <Link to='/notes'>
                <button onClick={handleAddNote} className={`text-left w-fit p-2 rounded-md transition-all duration-150 hover:shadow-lg hover:-translate-y-1 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]`}>Add note</button>
                </Link>
            </div>
        </div>
    )
}

export default Create
