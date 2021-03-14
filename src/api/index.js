const execute = async (method, url, data) => {
  let body = null
  const headers = { Accept: 'application/json' }
  if (data) {
    if (data instanceof URLSearchParams) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      body = data
    } else {
      headers['Content-Type'] = 'application/json; charset=UTF-8'
      body = JSON.stringify(data)
    }
  }
  const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}${url}`, {
    body,
    headers,
    method
  })
  if (!response.ok) {
    throw response
  }
  return response.json()
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
