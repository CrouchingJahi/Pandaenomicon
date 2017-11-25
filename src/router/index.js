import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Attendance from '@/pages/Attendance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: Attendance
    },
  ]
})
