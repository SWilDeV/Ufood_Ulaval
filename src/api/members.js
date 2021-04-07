import { _delete, get, post } from './index'

export function follow(id) {
  return post('/follow', { id })
}

export function getMember(id) {
  return get(`/users/${id}`)
}

export function getMembers({ limit, page, search }) {
  const params = []
  if (limit) {
    params.push(`limit=${limit}`)
  }
  if (page) {
    params.push(`page=${page}`)
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
