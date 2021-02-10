export default {
  login({ commit }, { email, id, name, token }) {
    commit('setToken', token)
    commit('setUser', { email, id, name })
  }
}
