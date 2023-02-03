import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000/api/notes";
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    const fetchAllNotes = async () => {
        const response = await fetch(`${host}/getallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDgyYTI5ZDEwZDkxZjJhZGMwNDc0MSIsImlhdCI6MTY3NTExNTE4Nn0.2Af5WZ27KKLRAaOGdqPPKE72JrNVohn3bcfpkOxBz0c'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDgyYTI5ZDEwZDkxZjJhZGMwNDc0MSIsImlhdCI6MTY3NTExNTE4Nn0.2Af5WZ27KKLRAaOGdqPPKE72JrNVohn3bcfpkOxBz0c'
            },
            body: JSON.stringify({ title, description, tag })
        })

    }

    const deleteNote = async (id) => {
        console.log("Deleting" + id)
        await fetch(`${host}/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDgyYTI5ZDEwZDkxZjJhZGMwNDc0MSIsImlhdCI6MTY3NTExNTE4Nn0.2Af5WZ27KKLRAaOGdqPPKE72JrNVohn3bcfpkOxBz0c'
            },
        })
        fetchAllNotes();
    }

    const editNote = async (id, title, description, tag) => {
        await fetch(`${host}/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDgyYTI5ZDEwZDkxZjJhZGMwNDc0MSIsImlhdCI6MTY3NTExNTE4Nn0.2Af5WZ27KKLRAaOGdqPPKE72JrNVohn3bcfpkOxBz0c'
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