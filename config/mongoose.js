const mongoose = require('mongoose')
const config = require('./index')

module.exports = (app) => {
    mongoose.connect(config.DB_CONNECTION)
    .then(()=>{console.log('DB connected.')})

    let userSchema = mongoose.Schema({
        id: mongoose.Types.ObjectId,
        email: {type: String, required: true},
        zipCode: {type: String, required: true},
        })

    const userModel = mongoose.model('UserData', userSchema)

    const user1 = new userModel({email: 'none', zipCode: '97232', })

    user1.save(function(err, user){
        if(err){return console.log(err)}
        console.log(user.email + ' saved to guitar collection')
    })

    let data = userModel.find({}).lean()

    data.then((song) => {
        console.log(song)
    })
}