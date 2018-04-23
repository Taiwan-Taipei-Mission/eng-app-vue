import Vuex from 'vuex'
import Vue from 'vue'

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
    setUser (state, user) {
      state.user = user
    },
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
  }
})
