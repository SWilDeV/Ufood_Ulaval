import { get } from './index'

export function getRestaurants(limit) {
  return get(`/unsecure/restaurants?limit=${limit}`)
}

export function getFilteredRestaurants(queryString) {
  return get(`/unsecure/restaurants?${queryString}`)
}
