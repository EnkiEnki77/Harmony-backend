const User = require('../models/User')


async function creates(data){
    let user = await User.create(data)
}

async function getAll(){
    return User.find({}).lean()
}

module.exports = creates, getAll