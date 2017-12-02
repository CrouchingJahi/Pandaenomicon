import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Attendance from '@/pages/Attendance'
import ChoreChart from '@/pages/ChoreChart'
import Events from '@/pages/Events'
import Volunteers from '@/pages/Volunteers'
import MealPlan from '@/pages/MealPlan'
import Stats from '@/pages/Stats'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: Attendance,
    homeLink: true
  },
  {
    path: '/chorechart',
    name: 'Chore Chart',
    component: ChoreChart,
    homeLink: true
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    homeLink: true
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: Volunteers,
    homeLink: true
  },
  {
    path: '/mealplan',
    name: 'Meal Plan',
    component: MealPlan,
    homeLink: true
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
    homeLink: true
  },
]

export default new Router({
  routes
})
