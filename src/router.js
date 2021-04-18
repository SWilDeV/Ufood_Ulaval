import Vue from 'vue'
import Router from 'vue-router'
import Favorites from '@/components/Favorites'
import Home from '@/components/Home'
import Member from '@/components/Member'
import Members from '@/components/Members'
import Restaurant from '@/components/Restaurant'
import Search from '@/components/Search'
import SignIn from '@/components/SignIn'
import SignOut from '@/components/SignOut'
import SignUp from '@/components/SignUp'
import Visits from '@/components/Visits'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
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
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/sign-out',
      name: 'SignOut',
      component: SignOut
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/visits',
      name: 'Visits',
      component: Visits
    }
  ]
})
