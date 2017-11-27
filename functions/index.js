const cors = require('cors')
const functions = require('firebase-functions')
const pull = require('./pull')

function processMainSheet (sheet) {
  let menuSheet = sheet[1].values
  function getWeek (data) {
    return [
      data(1),
      data(2),
      data(3),
      data(4),
      data(5),
      data(6),
      data(7),
      data(8)
    ]
  }
  function getChores (col) {
    return {
      mornClean: menuSheet[7][col],
      bfastPrep: menuSheet[8][col],
      bfastClean: menuSheet[9][col],
      pdinnerClean: menuSheet[10][col],
      dinnerPrep: menuSheet[11][col],
      dinnerClean: menuSheet[12][col]
    }
  }
  function getEvents (col) {
    return {
      morning: menuSheet[22][col],
      afternoon: menuSheet[23][col],
      evening: menuSheet[24][col],
      night: menuSheet[25][col]
    }
  }
  function getVolunteers (col) {
    return {
      morning: menuSheet[15][col],
      afternoon: menuSheet[16][col],
      evening: menuSheet[17][col],
      night: menuSheet[18][col]
    }
  }

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
  let chores = getWeek(getChores)
  let events = getWeek(getEvents)
  let volunteers = getWeek(getVolunteers)

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
