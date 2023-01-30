const express = require('express')
const User = require('../models/User.js')
const router = express.Router()
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 8 }),
    body('name', 'Enter valid name').isLength({ min: 5 }),
], async (req, res) => {
    //if there are validation errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exists already
    try
    {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: 'A user with this email already exists' })
        }
        else {
            //create a new user
            user = await User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            })
            return res.status(200).json({ success: 'User created successfully' })
        }
    }
    catch(err)
    {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router