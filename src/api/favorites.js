import { _delete, get, post, put } from './index'

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

export function updateFavorite({ id, name }, owner) {
  return put(`/unsecure/favorites/${id}`, {
    name: name,
    owner: owner
  })
}

export function deleteRestaurantFromList(restaurantId, listId) {
  return _delete(`/unsecure/favorites/${listId}/restaurants/${restaurantId}`)
}

export function addRestaurantToList({ restaurantId, favoriteId }) {
  return post(`/unsecure/favorites/${favoriteId}/restaurants`, {
    id: restaurantId
  })
}
