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
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      meta: { requiresAuth: true }
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
      component: Member,
      meta: { requiresAuth: true }
    },
    {
      path: '/members',
      name: 'Members',
      component: Members,
      meta: { noSearch: true, requiresAuth: true }
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
      component: SignOut,
      meta: { requiresAuth: true }
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/visits',
      name: 'Visits',
      component: Visits,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.user) {
    console.log(to)
    return next({ name: 'SignIn', query: { redirect: to.path } })
  }
  next()
})

export default router
