import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBan,
  faEdit,
  faEye,
  faFastBackward,
  faFastForward,
  faMinus,
  faPaperPlane,
  faPlus,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faStar,
  faStepBackward,
  faStepForward,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faBan,
  faEdit,
  faEye,
  faFastBackward,
  faFastForward,
  faMinus,
  faPaperPlane,
  faPlus,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faStar,
  faStepBackward,
  faStepForward,
  faTimes,
  faUser
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
