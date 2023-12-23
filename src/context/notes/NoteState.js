import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = `${process.env.REACT_APP_API_URL}/api/notes`;
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    const fetchAllNotes = async () => {
        const response = await fetch(`${host}/getallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json();
        setNotes(json);

    }
    const addNote = async (title, description, tag) => {
        await fetch(`${host}/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        fetchAllNotes();

    }

    const deleteNote = async (id) => {
        const reponse = await fetch(`${host}/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        fetchAllNotes();
        return await reponse.json();
    }

    const editNote = async (id, title, description, tag) => {
        await fetch(`${host}/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        fetchAllNotes();
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;