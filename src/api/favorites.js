import { get, post } from './index'

export function addFavoriteToList(listId, restaurantId) {
  return post(`/favorites/${listId}/restaurants`, {
    id: restaurantId
  })
}

export function createList({ name, owner }) {
  return post('/favorites', { name, owner })
}

export function getFavorites(limit) {
  return get(`/favorites?limit=${limit}`)
}
