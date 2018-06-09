import Vue from 'vue'
import Router from 'vue-router'

import auth from '@/auth'

import CheckIn from '@/components/Class/CheckIn'
import QR from '@/components/Class/QR'
import ClassPage from '@/components/Class/ClassPage'
import Auth from '@/components/User/Auth'
import Help from '@/components/User/Help'
import aboutMissionaries from '@/components/Class/aboutMissionaries'

Vue.use(Router)

var routes = [
  { path: '/auth', name: 'auth', component: Auth, meta: { guestOnly: true } },
  { path: '/checkin', name: 'checkin', component: CheckIn, meta: { requireAuth: true } },
  { path: '/QR', name: 'QR', component: QR, meta: { requireAuth: true } },
  { path: '/classpage', name: 'ClassPage', component: ClassPage, meta: { requireAuth: true } },
  { path: '/help', name: 'Help', component: Help, meta: { requireAuth: true } },
  { path: '/about-missionaries', name: 'aboutMissionaries', component: aboutMissionaries, meta: { requireAuth: true } },
  { path: '*', redirect: '/classpage' }
]

export const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.user()
  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requireAuth && !currentUser) next('auth')
  else if (guestOnly && currentUser) next('classpage')
  else next()
})
