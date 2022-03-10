const express = require('express')
const app = express()
const config = require('./index')

const cors = require('cors')
const bodyParser = require('body-parser')
const formData = require('express-form-data')
const fetch = require('cross-fetch')
const asynchandler = require('express-async-handler')
const userService = require('../services/userService')




function setupExpress(app){
  app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(formData.parse())
    app.use(express.json())
    app.use(cors({
      origin: 'https://www.section.io'
  }));
 
}

module.exports = setupExpress