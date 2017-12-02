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
    goingAttendants: state => state.attendants.filter(p => !!p.arrival)
  },
  actions: {
    pullData ({ commit }) {
      fetch(`${process.env.API_URL}/pull`).then(resp => {
        resp.json().then(data => commit('update', data))
      })
    }
  }
})
