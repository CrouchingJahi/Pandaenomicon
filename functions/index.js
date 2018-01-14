const cors = require('cors')
const functions = require('firebase-functions')
const pull = require('./pull')

function processMainSheet (sheet) {
  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday 2']
  let menuSheet = sheet[1].values

  function getWeek (data) {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((dayNo) => {
      return Object.assign(
        { day: days[dayNo - 1] },
        data(dayNo)
      )
    })
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
  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday 2']
  function getMeal (vals, mealNo) {
    return {
      day: days[Math.ceil(mealNo / 2) - 2],
      chef: vals[0][0],
      meal: vals[0][1],
      count: sheet[0].values.reduce((c, row) => {
        return c + (row.length < mealNo ? 0 : !!row[mealNo])
      }, 0),
      ingredients: vals.filter(row => !!row[2]).map(row => {
        return {
          name: row[2],
          amountPer: row[3],
          pricePer: row[4],
          totalAmount: row[5],
          totalPrice: row[6]
        }
      })
    }
  }

  let meals = {
    sat: {
      dinner: getMeal(sheet[1].values, 4)
    },
    sun: {
      breakfast: getMeal(sheet[2].values, 5),
      dinner: getMeal(sheet[3].values, 6)
    },
    mon: {
      breakfast: getMeal(sheet[4].values, 7),
      dinner: getMeal(sheet[5].values, 8)
    },
    tue: {
      breakfast: getMeal(sheet[6].values, 9),
      dinner: getMeal(sheet[7].values, 10)
    },
    wed: {
      breakfast: getMeal(sheet[8].values, 11),
      dinner: getMeal(sheet[9].values, 12)
    },
    thur: {
      breakfast: getMeal(sheet[10].values, 13),
      dinner: getMeal(sheet[11].values, 14)
    },
    fri: {
      breakfast: getMeal(sheet[12].values, 15),
      dinner: getMeal(sheet[13].values, 16)
    },
    sat2: {
      breakfast: getMeal(sheet[14].values, 17)
    },
  }
  return {
    meals
  }
}

function pullData(req, res) {
  let config = functions.config().gapis
  Promise.all([pull.mainData(config),pull.mealData(config)]).then(([mainSheet, mealSheet]) => {
    let data = {
      lastUpdated: new Date(),
      apiVersion: require('./package.json').version
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
