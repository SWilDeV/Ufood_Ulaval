import { _delete, get, post } from './index'

export function follow(id) {
  return post('/follow', { id })
}

export function getFavorites(id, { count }) {
  const params = []
  if (count) {
    params.push(`limit=${count}`)
  }
  const query = params.length ? `?${params.join('&')}` : ''
  return get(`/users/${id}/favorites${query}`)
}

export function getMember(id) {
  return get(`/users/${id}`)
}

export function getMembers({ count, page, search }) {
  const params = []
  if (count) {
    params.push(`limit=${count}`)
  }
  if (page) {
    params.push(`page=${page - 1}`)
  }
  if (search) {
    params.push(`q=${search}`)
  }
  const query = params.length ? `?${params.join('&')}` : ''
  return get(`/users${query}`)
}

export function unfollow(id) {
  return _delete(`/follow/${id}`)
}
