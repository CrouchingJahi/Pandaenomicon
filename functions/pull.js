const google = require('googleapis')

function sheet (config) {
  return new Promise((resolve,reject) => {
    google.sheets('v4').spreadsheets.values.batchGet(config, (err, data) => {
      if (err) {
        console.log('err for ' + config.spreadsheetId)
        reject({
          sheet: config.spreadsheetId,
          err
        })
      }
      else {
        resolve(data.valueRanges)
      }
    })
  })
}

exports.mainData = function (config) {
  return sheet({
    key: config.apikey,
    spreadsheetId: config.mainsheet,
    ranges: [
      'Roster 2017!A2:K',
      'Menu & Schedules!A1:I26'
    ]
  })
}

exports.mealData = function (config) {
  return sheet({
    key: config.apikey,
    spreadsheetId: config.foodsheet,
    ranges: [
      'Pandas!A2:S',
      'sat dinner!A2:G',
      'sun breakfast!A2:G',
      'sun dinner!A2:G',
      'mon breakfast!A2:G',
      'mon dinner!A2:G',
      'tue breakfast!A2:G',
      'tue dinner!A2:G',
      'wed breakfast!A2:G',
      'wed dinner!A2:G',
      'thur breakfast!A2:G',
      'thur dinner!A2:G',
      'fri breakfast!A2:G',
      'fri dinner!A2:G',
      'sat2 breakfast!A2:G'
    ]
  })
}
