import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faSignInAlt, faSignOutAlt, faUser)

Vue.component('font-awesome-icon', FontAwesomeIcon)
