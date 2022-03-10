let config = require('../config')
const mongoose = require('mongoose')




    let userSchema = mongoose.Schema({
        id: mongoose.Types.ObjectId,
        zipCode: {type: String, required: true},
        token: {type: String, required: true},
        email: {type: String, required: true},

    })

    module.exports = mongoose.model('User', userSchema)