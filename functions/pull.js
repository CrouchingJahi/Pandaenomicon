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
      'sat dinner!A1:G16'
    ]
  })
}
