const config = require('./config.json')
const google = require('googleapis')

function sheet (config) {
  return new Promise((resolve,reject) => {
    google.sheets('v4').spreadsheets.values.batchGet(config, (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(data.valueRanges)
      }
    })
  })
}

exports.rosterData = function () {
  return sheet({
    key: config.apiKey,
    spreadsheetId: config.mainSheet,
    ranges: [
      'Roster 2017!A2:K',
      'Menu & Schedules!A1:I26'
    ]
  })
}

exports.foodData = function () {
  return sheet({
    key: config.apiKey,
    spreadsheetId: config.foodSheet,
    ranges: [
      'Pandas!A2:S',
      'sat dinner!A1:G16'
    ]
  })
}