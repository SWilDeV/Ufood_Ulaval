import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBan,
  faEdit,
  faEnvelope,
  faEye,
  faFastBackward,
  faFastForward,
  faHamburger,
  faMinus,
  faPen,
  faPaperPlane,
  faPizzaSlice,
  faPlus,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faStar,
  faStepBackward,
  faStepForward,
  faTimes,
  faUser,
  faUserFriends,
  faUserPlus,
  faUserTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faBan,
  faEdit,
  faEnvelope,
  faEye,
  faFastBackward,
  faFastForward,
  faHamburger,
  faMinus,
  faPen,
  faPaperPlane,
  faPizzaSlice,
  faPlus,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faStar,
  faStepBackward,
  faStepForward,
  faTimes,
  faUser,
  faUserFriends,
  faUserPlus,
  faUserTimes
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
