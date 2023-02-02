import React,{useState} from "react";
import  NoteContext  from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "63d844cab719b590cb218655",
            "user": "63d82a29d10d91f2adc04741",
            "title": "my name is khan Lorem ipsum dolor sit amet ",
            "description": "tell me your name Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore minus saepe iste non aliquam porro quis maxime, aut beatae, consectetur, sint ea deleniti! Sint illum necessitatibus ullam aperiam, laudantium laboriosam.",
            "tag": "movie",
            "date": "2023-01-30T22:29:30.291Z",
            "__v": 0
        },
        {
            "_id": "63d844cab719b590cb218657",
            "user": "63d82a29d10d91f2adc04741",
            "title": "my name is khan",
            "description": "tell me your name Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore minus saepe iste non aliquam porro quis maxime, aut beatae, consectetur, sint ea deleniti! Sint illum necessitatibus ullam aperiam, laudantium laboriosam.",
            "tag": "movie",
            "date": "2023-01-30T22:29:30.615Z",
            "__v": 0
        },
        {
            "_id": "63d844cab719b590cb218659",
            "user": "63d82a29d10d91f2adc04741",
            "title": "my name is khan",
            "description": "tell me your name Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore minus saepe iste non aliquam porro quis maxime, aut beatae, consectetur, sint ea deleniti! Sint illum necessitatibus ullam aperiam, laudantium laboriosam.",
            "tag": "movie",
            "date": "2023-01-30T22:29:30.839Z",
            "__v": 0
        },
        {
            "_id": "63d844cab719b590cb218659",
            "user": "63d82a29d10d91f2adc04741",
            "title": "my name is khan",
            "description": "tell me your name Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore minus saepe iste non aliquam porro quis maxime, aut beatae, consectetur, sint ea deleniti! Sint illum necessitatibus ullam aperiam, laudantium laboriosam.",
            "tag": "movie",
            "date": "2023-01-30T22:29:30.839Z",
            "__v": 0
        },
        {
            "_id": "63d844cab719b590cb218659",
            "user": "63d82a29d10d91f2adc04741",
            "title": "my name is khan",
            "description": "tell me your name Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore minus saepe iste non aliquam porro quis maxime, aut beatae, consectetur, sint ea deleniti! Sint illum necessitatibus ullam aperiam, laudantium laboriosam.",
            "tag": "movie",
            "date": "2023-01-30T22:29:30.839Z",
            "__v": 0
        },
        {
            "_id": "63d844cab719b590cb218659",
            "user": "63d82a29d10d91f2adc04741",
            "title": "my name is khan",
            "description": "tell me your name Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore minus saepe iste non aliquam porro quis maxime, aut beatae, consectetur, sint ea deleniti! Sint illum necessitatibus ullam aperiam, laudantium laboriosam.",
            "tag": "movie",
            "date": "2023-01-30T22:29:30.839Z",
            "__v": 0
        },
        {
            "_id": "63d844cab719b590cb218659",
            "user": "63d82a29d10d91f2adc04741",
            "title": "my name is khan",
            "description": "tell me your name Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore minus saepe iste non aliquam porro quis maxime, aut beatae, consectetur, sint ea deleniti! Sint illum necessitatibus ullam aperiam, laudantium laboriosam.",
            "tag": "movie",
            "date": "2023-01-30T22:29:30.839Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;