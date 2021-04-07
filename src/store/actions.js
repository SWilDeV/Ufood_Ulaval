import Cookies from 'js-cookie'

const getExpiration = token => {
  const parts = token.split('.')
  const decoded = atob(parts[1])
  const claims = JSON.parse(decoded)
  return new Date(claims.exp)
}

export default {
  login({ commit }, { email, id, name, token }) {
    const expires = getExpiration(token)
    Cookies.set('token', token, { expires })
    commit('setUser', { email, id, name })
  },
  logout({ commit }) {
    Cookies.remove('token')
    commit('setUser', null)
  }
}
