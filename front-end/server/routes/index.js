const request = require('request-promise')
const exploreRoute = require('./explore')
const convertRoute = require('./convert')
const profileRoute = require('./profile')
const loginRoute = require('./login')
const fs = require('fs')

const wrap = fn => (...args) => fn(...args).catch(args[2])

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.send('hello world.')
  })

  // explore and about pdf
  app.get('/api/explore/getPublicWorks', wrap(exploreRoute.getPublicWorks))
  app.post('/api/explore/openpdf', wrap(exploreRoute.openPDF))
  app.post('/api/explore/downloadpdf', wrap(exploreRoute.downloadPDF))
  app.post('/api/explore/download_sep_piano', wrap(exploreRoute.downloadSepPiano))
  app.post('/api/explore/download_sep_human', wrap(exploreRoute.downloadSepHuman))

  // convert
  app.post('/api/convert/music', wrap(convertRoute.convert_for_music))
  app.post('/api/convert/information', wrap(convertRoute.convert_for_music_information))

  // login
  app.post('/api/login/google', wrap(loginRoute.GoogleLogin))
  app.get('/api/login/check_status', wrap(loginRoute.CheckLoginStatus))
  app.get('/api/logout', wrap(loginRoute.Logout))

  //profile
  app.post('/api/profile/edit_profile', wrap(profileRoute.edit_profile))
  app.get('/api/profile/get_profile', wrap(profileRoute.get_profile))
}
