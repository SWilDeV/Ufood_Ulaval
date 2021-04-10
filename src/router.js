import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member'
import Members from '@/components/Members'
import Restaurant from '@/components/Restaurant'
import Search from '@/components/Search'
import SignOut from '@/components/SignOut'
import SignUp from '@/components/SignUp'
import Favorites from '@/components/Favorites'
import Visits from '@/components/Visits'

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
      path: '/search',
      name: 'Search',
      component: Search
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
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/visits',
      name: 'Visits',
      component: Visits
    }
  ]
})
