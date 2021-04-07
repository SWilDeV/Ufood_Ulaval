import { _delete, get, post, put } from './index'

export function addFavoriteToList(listId, restaurantId) {
  return post(`/favorites/${listId}/restaurants`, {
    id: restaurantId
  })
}

export function addRestaurantToList({ restaurantId, favoriteId }) {
  return post(`/unsecure/favorites/${favoriteId}/restaurants`, {
    id: restaurantId
  })
}

export function createList({ name, owner }) {
  return post('/favorites', { name, owner })
}

export function deleteFavoriteList(deleteId) {
  return _delete(`/unsecure/favorites/${deleteId}`)
}

export function deleteRestaurantFromList(restaurantId, listId) {
  return _delete(`/unsecure/favorites/${listId}/restaurants/${restaurantId}`)
}

export function getFavorites(count) {
  return get(`/favorites?limit=${count}`)
}

export function updateFavorite({ id, name }, owner) {
  return put(`/unsecure/favorites/${id}`, {
    name: name,
    owner: owner
  })
}
