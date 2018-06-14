import Vuex from 'vuex'
import Vue from 'vue'

import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    teacherName: 'President Jergensen',
    classLocation: '',
    snackbar2: false,
    user: {
      id: ''
    }
  },
  mutations: {
    classLocation: (state, payload) => {
      state.classLocation = payload
    },
    successfulCheckin: (state) => {
      state.snackbar2 = true
      setTimeout(function () { state.snackbar2 = false }, 6000) // Has a 6 second timeout so that the confirmation snackbar will not reappear even when the user has not registered a class https://www.w3schools.com/jsref/met_win_settimeout.asp
    }
  },
  actions: {
    signin ({commit}, {email, password}) {
      commit('setUser', {id: 1, firstName: 'Tony', lastName: 'Stark'})
    },
    classLocation: ({ commit }, payload) => {
      commit('classLocation', payload)
    }
  },
  modules: {
    user
  }
})
