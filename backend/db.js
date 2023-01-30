const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/cloud-scribe';

mongoose.set('strictQuery', true)

const connectToMongo = () => {
    mongoose.connect(mongooseURI,()=>{
        console.log('connected to mongoDB')
    })
}

module.exports = connectToMongo