import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Restaurant from '@/components/Restaurant'
import SignIn from '@/components/SignIn'
import SignOut from '@/components/SignOut'
import SignUp from '@/components/SignUp'
import userPage from '@/components/UserPage/UserPage'

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
      path: '/restaurant/:id',
      name: 'Restaurant',
      component: Restaurant
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
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
      path: '/UserPage/UserPage',
      name: 'UserPage',
      component: userPage
    }
  ]
})
