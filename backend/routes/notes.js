const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router()

//Route 1: Get all the notes using: GET "/api/notes/getallnotes". Login required

router.get('/getallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.id }).sort({ date: -1 });
        res.json(notes)
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

//Route 2: Add a new note using: POST "/api/notes/addnote". Login required

router.post('/addnote', fetchUser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Enter valid description').isLength({ min: 5 }),
], async (req, res) => {
    //if there are validation errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
        const note = new Notes({
            title, description, tag, user: req.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

//Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        //create a newNote object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).json({ error: "Not Found" }) }
        if (note.user.toString() !== req.id) { return res.status(401).json({ error: "Not Allowed" }) }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

//Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).json({ error: "Not Found" }) }
        if (note.user.toString() !== req.id) { return res.status(401).json({ error: "Not Allowed" }) }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

module.exports = router