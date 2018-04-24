// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueQrcodeReader from 'vue-qrcode-reader'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Vuex from 'vuex'
import {store} from './store/store.js'

Vue.use(Vuetify, { theme: {
  primary: '#4CAF50',
  secondary: '#8BC34A',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(VueQrcodeReader)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueFire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCPg6kfcYxuPHwyMW9SsmVqyPO4AUcWQVM',
      authDomain: 'taiwaneng-alpha.firebaseapp.com',
      databaseURL: 'https://taiwaneng-alpha.firebaseio.com',
      projectId: 'taiwaneng-alpha',
      storageBucket: 'taiwaneng-alpha.appspot.com',
      messagingSenderId: '920652444483'
    })
  }
})

export const db = firebase.firestore()
