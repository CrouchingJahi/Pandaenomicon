const functions = require('firebase-functions')
const pull = require('./pull')

exports.pull = functions.https.onRequest((req, res) => {
  pull.rosterData().then((sheet) => {
    // process sheet into json object
    res.send(sheet)
  }, (err) => {
    res.status(500).send(err)
  })
})
