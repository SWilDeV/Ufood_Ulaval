import Cookies from 'js-cookie'
import router from '../router'
import store from '@/store'

const applicationJson = 'application/json'
const contentType = 'Content-Type'

const execute = async (method, url, data) => {
  let body = null
  const headers = { Accept: applicationJson }
  if (data) {
    if (data instanceof URLSearchParams) {
      headers[contentType] = 'application/x-www-form-urlencoded; charset=UTF-8'
      body = data
    } else {
      headers[contentType] = `${applicationJson}; charset=UTF-8`
      body = JSON.stringify(data)
    }
  }
  const isLogin = url.endsWith('/login')
  const isPrivate = !url.includes('/unsecure/') && !isLogin && !url.endsWith('/signup')
  if (isPrivate) {
    const token = Cookies.get('token')
    if (token) {
      headers['Authorization'] = token
    }
  }
  const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}${url}`, {
    body,
    headers,
    method
  })
  if (!response.ok) {
    if (response.status === 401) {
      if (isPrivate) {
        store.dispatch('logout')
        router.push({ hash: '#expired', name: 'SignIn' }).catch(() => {})
        throw response
      } else if (isLogin) {
        throw response
      }
    }
    store.dispatch('showError')
    throw response
  }
  const dataType = response.headers.get(contentType)
  if (dataType) {
    if (dataType.includes(applicationJson)) {
      return response.json()
    } else {
      throw new Error(`Unsupported Content-Type: ${dataType}`)
    }
  }
}

export function _delete(url) {
  return execute('DELETE', url)
}

export function get(url) {
  return execute('GET', url)
}

export function post(url, data) {
  return execute('POST', url, data)
}

export function put(url, data) {
  return execute('PUT', url, data)
}
