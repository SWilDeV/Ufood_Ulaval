import Vue from 'vue'
import App from './App.vue'
import Gravatar from 'vue-gravatar'
import i18n from './i18n'
import router from './router'
import store from './store'
//import VueI18n from 'vue-i18n';
import '@/config/bootstrap'
import '@/config/fontAwesome'

Vue.config.productionTip = false
Vue.component('v-gravatar', Gravatar)

new Vue({
  i18n,
  render: h => h(App),
  router,
  store
}).$mount('#app')
