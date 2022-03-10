const {Router} = require('express')
const router = Router()
let request = require('request')
const querystring = require('querystring');
const client_id = 'f3b57c11149e42998c6e4fb0e2f3ef54';
const secret = '55f34a03690a4fe986a47d25626deba6'
const crypto = require("crypto");
const state = crypto.randomBytes(16).toString('hex');
const scope = 'user-read-private user-read-email';
const userService = require('../services/userService');
const User = require('../models/User');
const fetch = require('cross-fetch')
const cors = require('cors');
const axios = require('axios')

async function creates(data){
  let user = await User.create(data)
  return user
}

let access_token = ''
let redirect_uri = 
process.env.REDIRECT_URI || 
'http://localhost:3001/callback'



router.get('/login', function(req, res) {
  res.redirect( `https://accounts.spotify.com/authorize?show_dialog=true&${
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: 'user-read-private user-read-email user-top-read',
      redirect_uri: redirect_uri
    })}`)
  })

  router.get('/callback', function(req, res) {
    let code = req.query.code || null
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(
          client_id + ':' + secret
        ).toString('base64'))
      },
      json: true
    }
    
    request.post(authOptions, function(error, response, body) {
      access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000/onboarding'
      // res.send(console.log(res.query))
      res.redirect(uri + '?access_token=' + access_token)
    })
  })

  router.post('/callback', (req, res) => {
    console.log(req.body)
    let uri = 'http://localhost:3000/dashboard'
    
    if(req.body.zipCode !== '' ){
     creates(req.body).then(() => {res.redirect(uri + '?access_token=' + access_token)})
     // res.render('addCat', {message: 'Successfully added new pet'})
   }else{
     res.redirect('/callback')
   }
   })

   async function fetchTopArtists(){
     console.log(access_token)
    const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: {'Authorization': 'Bearer ' + access_token }
    })
    return await response.json()
  }

  async function fetchTicket(artistItems){
    let artistTickets = [] ;
    let artists =[];
    console.log(artistItems);
    artistItems && await artistItems.map((artist) => artists.push(artist.name) )

    // for(let i = 5; i < 10; i++){
    //   await axios.get(
    //     `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TnZ0TAmAIg23wmcPtZkvFbppZpp2dMxr&keyword=${artists[i]}`
    //       ).then(res => console.log(res.data))
    // }
  

    setTimeout(async () => {for(let i = 0; i < 5; i++){
      await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TnZ0TAmAIg23wmcPtZkvFbppZpp2dMxr&keyword=${artists[i]}`
              ).then(res => console.log(res.data))
                          }
      setTimeout(async () => {for(let i = 5; i < 10; i++){
        await axios.get(
              `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TnZ0TAmAIg23wmcPtZkvFbppZpp2dMxr&keyword=${artists[i]}`
                ).then(res => console.log(res.data))
      }setTimeout(async () => {for(let i = 10; i < 15; i++){
        await axios.get(
              `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TnZ0TAmAIg23wmcPtZkvFbppZpp2dMxr&keyword=${artists[i]}`
                ).then(res => console.log(res.data))
      }
      // setTimeout(async () => {for(let i = 15; i < 20; i++){
      //   await axios.get(
      //         `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TnZ0TAmAIg23wmcPtZkvFbppZpp2dMxr&keyword=${artists[i]}`
      //           ).then(res => console.log(res.data))
      // }}, 1500)
    }, 1500)}
      , 1500)
  }, 1500)

   
    
    // for(let i = 10; i < 15; i++){
    //   await axios.get(
    //     `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TnZ0TAmAIg23wmcPtZkvFbppZpp2dMxr&keyword=${artist}`
    //       ).then(res => console.log(res.data._embedded.events))
 
    // for(let i = 15; i < 20; i++){
    //   await axios.get(
    //     `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TnZ0TAmAIg23wmcPtZkvFbppZpp2dMxr&keyword=${artist}`
    //       ).then(res => console.log(res.data._embedded.events))
    // }
  }


   router.get('/artistapi', async (req, res) => {
     const topArtists = await fetchTopArtists()
     const tickets = await fetchTicket(topArtists.items)
     console.log(tickets)
    
     res.json(tickets)
   })

module.exports = router