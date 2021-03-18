import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFastBackward,
  faFastForward,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faStepBackward,
  faStepForward,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faFastBackward,
  faFastForward,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faStepBackward,
  faStepForward,
  faUser
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
