import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import actions from './actions'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  actions,
  mutations,
  state,
  plugins: [vuexLocal.plugin]
})
