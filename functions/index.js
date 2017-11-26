const cors = require('cors')
const functions = require('firebase-functions')
const pull = require('./pull')

function processMainSheet (sheet) {
  let attendants = sheet[0].values.filter(row => !!row[0]).map(row => {
    return {
      name: row[0],
      tented: row[1],
      preReg: row[2],
      campFee: row[3],
      arrival: row[4],
      departure: row[5],
      ragVet: row[6],
      mealPlan: row[8],
      mealPlanPaid: row[9]
    }
  })
  let chores = {}
  let events = {}
  let volunteers = {}
  return {
    attendants,
    chores,
    events,
    volunteers
  }
}

function processMealSheet (sheet) {
  let meals = {}
  return {
    meals
  }
}

function pullData(req, res) {
  let config = functions.config().gapis
  Promise.all([pull.mainData(config),pull.mealData(config)]).then(([mainSheet, mealSheet]) => {
    let data = {
      lastUpdated: new Date()
    }
    Object.assign(data, processMainSheet(mainSheet), processMealSheet(mealSheet))
    res.send(data)
  }, (err) => {
    res.status(500).send(err)
  })
}

exports.pull = functions.https.onRequest((req, res) => {
  let opts = {
    origin: functions.config().frontend.url
  }
  cors(opts)(req, res, () => pullData(req, res))
})
