import { get, post } from './index'

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
