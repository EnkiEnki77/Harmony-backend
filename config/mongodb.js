const mongodb = require('mongodb')
const config = require('./index')

module.exports = (app) => {
    const MongoClient = mongodb.MongoClient
    const client = new MongoClient(config.DB_CONNECTION)

    client.connect((err) => {
        if(err){throw new Error(err)}
    })
    const db = client.db("febdb")
    const harmonyApp = db.collection('harmonyApp')

    harmonyApp.insertOne({
        zipCode: '97322',
        name: 'Austin'
    }, (err, data) => {
        console.log(data)
        harmonyApp.find({}).toArray((err, data) => {
            // console.log(data)
        })})
}