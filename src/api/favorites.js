import { get, post, _delete, put } from './index'

export function addFavoriteToList(listId, restaurantId) {
  return post(`/unsecure/favorites/${listId}/restaurants`, {
    id: restaurantId
  })
}

export function createList({ name, owner }) {
  return post('/unsecure/favorites', { name, owner })
}

export function getFavorites(limit) {
  return get(`/unsecure/favorites?limit=${limit}`)
}

export function deleteFavoriteList(deleteId) {
  return _delete(`/unsecure/favorites/${deleteId}`)
}

export function editFavorite(id) {
  return put(`/unsecure/favorites/${id}`)
}
