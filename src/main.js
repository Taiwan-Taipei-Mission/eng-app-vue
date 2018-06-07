// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from '@/router'
import auth from '@/auth'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueQrcodeReader from 'vue-qrcode-reader'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Vuex from 'vuex'
import {store} from './store/store.js'
import VueAnalytics from 'vue-analytics'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven
  .config('https://5abe71266a774037b0f3ff0c448cf0f1@sentry.io/1221611')
  .addPlugin(RavenVue, Vue)
  .install()

Vue.use(Vuetify, { theme: {
  primary: '#4CAF50',
  secondary: '#81c784',
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
Vue.use(VueAnalytics, {
  id: 'UA-111818409-2',
  router,
  autoTracking: {
    exception: true
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    auth.init(this)
  },
  components: { App },
  template: '<App/>'
})

export const db = firebase.firestore()
