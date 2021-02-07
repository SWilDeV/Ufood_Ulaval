import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Restaurant from '@/components/Restaurant'
import User from '@/components/User'
import '@/config/fontAwesome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/restaurant',
      name: 'Restaurant',
      component: Restaurant
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
