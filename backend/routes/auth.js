const express = require('express')
const User = require('../models/User.js')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'thisisasecret^.^'

//Route 1: Create a user using: POST "/api/auth/createuser". No login required

router.post('/createuser', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 8 }),
    body('name', 'Enter valid name').isLength({ min: 5 }),
], async (req, res) => {
    //if there are validation errors, return Bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with this email exists already
    try
    {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: 'A user with this email already exists' })
        }
        else {
            //create a new user
            user = await User.create({
                email: req.body.email,
                password: secPass,
                name: req.body.name
            })
            const authToken = jwt.sign({ id: user.id }, JWT_SECRET)
            success = true;
            return res.status(200).json({success, authToken, name : user.name})
        }
    }
    catch(err)
    {
        return res.status(500).json({success, error: 'Internal Server Error' })
    }
})


//Route 2: Authenticate a user using: POST "/api/auth/login". No login required

router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 8 }),
], async (req, res) => {
    //if there are validation errors, return Bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with this email exists already
    try
    {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({success, error: 'Please try to login with correct credentials'})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({success, error: 'Please try to login with correct credentials'})
        }
        const authToken = jwt.sign({ id: user.id }, JWT_SECRET)
        success = true;
        return res.status(200).json({success, authToken, name : user.name})
    }
    catch(err)
    {
        return res.status(500).json({success, error: 'Internal Server Error' })
    }})

//Route 3: Get logged in user details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchUser, async (req, res) => {
    try
    {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({user})
    }
    catch(err)
    {
        return res.status(500).json({success: false, error: 'Internal Server Error' })
    }})

module.exports = router