export default {
  login({ commit }, { email, id, name, token }) {
    commit('setToken', token)
    commit('setUser', { email, id, name })
  },
  logout({ commit }) {
    commit('setToken', null)
    commit('setUser', null)
  }
}
