import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Attendance from '@/pages/Attendance'
import ChoreChart from '@/pages/ChoreChart'
import Events from '@/pages/Events'
import Volunteers from '@/pages/Volunteers'
import MealPlan from '@/pages/MealPlan'

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
    {
      path: '/chorechart',
      name: 'ChoreChart',
      component: ChoreChart
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/volunteers',
      name: 'Volunteers',
      component: Volunteers
    },
    {
      path: '/mealplan',
      name: 'Meal Plan',
      component: MealPlan
    }
  ]
})
