import Cookies from 'js-cookie'

const getExpiration = token => {
  const parts = token.split('.')
  const decoded = atob(parts[1])
  const claims = JSON.parse(decoded)
  return new Date(claims.exp)
}

export default {
  hideError({ commit }) {
    commit('setErrorCounter', 0)
  },
  login({ commit }, { email, id, name, token }) {
    const expires = getExpiration(token)
    Cookies.set('token', token, { expires })
    commit('setUser', { email, id, name })
  },
  logout({ commit }) {
    Cookies.remove('token')
    commit('setUser', null)
  },
  showError({ commit }) {
    commit('setErrorCounter', 10)
  },
  updateError({ commit }, counter) {
    commit('setErrorCounter', counter)
  }
}
