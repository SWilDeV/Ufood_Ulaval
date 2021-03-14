const execute = async (method, url, body) => {
  const headers = { Accept: 'application/json' }
  if (body) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  return await fetch(`${process.env.VUE_APP_API_BASE_URL}${url}`, {
    body,
    headers,
    method
  })
}

export function _delete(url) {
  return execute('DELETE', url)
}

export function get(url) {
  return execute('GET', url)
}

export function post(url, body) {
  return execute('POST', url, body)
}

<<<<<<< HEAD:src/api.js
export const getRestaurants = async () => {
  const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/unsecure/restaurants`, {
    method: 'GET'
  })
  return response.json()
=======
export function put(url, body) {
  return execute('PUT', url, body)
>>>>>>> 99fd6246f60a0f12a00db9e0415fa9949a7d59b6:src/api/index.js
}
