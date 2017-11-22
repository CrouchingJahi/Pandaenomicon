const config = require('./config.json')
const functions = require('firebase-functions')
const google = require('googleapis')

exports.test = functions.https.onRequest((req, res) => {
  const sheets = google.sheets('v4')
  sheets.spreadsheets.values.get({
    key: config.apiKey,
    spreadsheetId: config.mainSheet,
    range: 'Roster 2017!A:A'
  }, (err, sheet) => {
    if (err) {
      res.status(500).send(err)
      return
    }
    res.send(sheet.values)
  })
})
