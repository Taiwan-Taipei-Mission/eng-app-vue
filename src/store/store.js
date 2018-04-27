import Vuex from 'vuex'
import Vue from 'vue'

import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    teacherName: 'President Jergensen',
    classLocation: '',
    user: {
      id: ''
    }
  },
  mutations: {
    classLocation: (state, payload) => {
      state.classLocation = payload
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
