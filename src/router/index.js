import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member'
import Members from '@/components/Members'
import Restaurant from '@/components/Restaurant'
import SignOut from '@/components/SignOut'
import SignUp from '@/components/SignUp'
import UserPage from '@/components/UserPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { noSearch: true }
    },
    {
      path: '/member/:id',
      name: 'Member',
      component: Member
    },
    {
      path: '/members',
      name: 'Members',
      component: Members,
      meta: { noSearch: true }
    },
    {
      path: '/restaurant/:id',
      name: 'Restaurant',
      component: Restaurant
    },
    {
      path: '/signout',
      name: 'SignOut',
      component: SignOut
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/user',
      name: 'User',
      component: UserPage
    }
  ]
})
