import { get, post, _delete } from './index'

export function getRestaurantsFromApi(limit) {
  return get(`/unsecure/restaurants?limit=${limit}`)
}

export function deleteRestaurantFromList(restaurantId, listId) {
  return _delete(`/unsecure/favorites/${listId}/restaurants/${restaurantId}`)
}

export function AddRestaurantToList({ restaurantId, favoriteId }) {
  return post(`/unsecure/favorites/${favoriteId}/restaurants`, {
    id: restaurantId
  })
}
