const {Router} = require('express')
const router = Router()

const spotifyController = require('./controller/spotifyController')
router.use('/', spotifyController)

module.exports = router