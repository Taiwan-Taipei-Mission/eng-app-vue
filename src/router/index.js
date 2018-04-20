import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import QR from '@/components/Class/QR'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import ClassPage from '@/components/Class/ClassPage'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/signin'
    },
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/QR',
      name: 'QR',
      component: QR,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/classpage',
      name: 'ClassPage',
      component: ClassPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
export default router
