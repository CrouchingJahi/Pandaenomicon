const functions = require('firebase-functions')
const pull = require('./pull')

function processRosterSheet (sheet) {
  let attendants = sheet[0].values.filter(row => !!row[0]).map(row => {
    return {
      name: row[0],
      tented: row[1],
      preReg: row[2],
      campFee: row[3],
      arrival: row[4],
      deptarture: row[5],
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

exports.pull = functions.https.onRequest((req, res) => {
  Promise.all([pull.rosterData(),pull.mealData()]).then(([rosterSheet, mealSheet]) => {
    let data = Object.assign({}, processRosterSheet(rosterSheet), processMealSheet(mealSheet))
    console.log(data.attendants.length)
    res.send(data)
  }, (err) => {
    res.status(500).send(err)
  })
})
