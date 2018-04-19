import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    classLocation: {},
    user: {
      id: ''
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user

    }
  },
  actions: {
    signin ({commit}, {email, password}) {
      commit('setUser', {id: 1, firstName: 'Tony', lastName: 'Stark'})
    }
  }
})
