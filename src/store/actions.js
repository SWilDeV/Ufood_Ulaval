import Cookies from 'js-cookie'

export default {
  login({ commit }, { email, id, name, token }) {
    Cookies.set('token', token)
    commit('setUser', { email, id, name })
  },
  logout({ commit }) {
    Cookies.remove('token')
    commit('setUser', null)
  }
}
