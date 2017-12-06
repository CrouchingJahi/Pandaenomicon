import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastUpdated: 'never',
    attendants: [],
    chores: [],
    meals: {},
    events: {},
    volunteers: {}
  },
  mutations: {
    update (state, newState) {
      state.lastUpdated = newState.lastUpdated
      state.attendants = newState.attendants
      state.chores = newState.chores
      state.meals = newState.meals
      state.events = newState.events
      state.volunteers = newState.volunteers
    }
  },
  getters: {
    goingAttendants: state => state.attendants.filter(p => !!p.arrival),
    mealList: state => !state.meals.sat ? [] : [
      state.meals.sat.dinner,
      state.meals.sun.breakfast,
      state.meals.sun.dinner,
      state.meals.mon.breakfast,
      state.meals.mon.dinner,
      state.meals.tue.breakfast,
      state.meals.tue.dinner,
      state.meals.wed.breakfast,
      state.meals.wed.dinner,
      state.meals.thur.breakfast,
      state.meals.thur.dinner,
      state.meals.fri.breakfast,
      state.meals.fri.dinner,
      state.meals.sat2.breakfast
    ]
  },
  actions: {
    pullData ({ commit }) {
      fetch(`${process.env.API_URL}/pull`).then(resp => {
        resp.json().then(data => commit('update', data))
      })
    }
  }
})
