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

export function post(url, body) {
  return execute('POST', url, body)
}

export const getRestaurants = async () => {
  const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/unsecure/restaurants`, {
    method: 'GET'
  })
  return response.json()
}
